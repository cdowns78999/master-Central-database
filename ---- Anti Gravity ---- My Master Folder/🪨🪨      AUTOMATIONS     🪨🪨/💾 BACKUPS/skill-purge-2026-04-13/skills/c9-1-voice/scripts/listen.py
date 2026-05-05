# /// script
# requires-python = ">=3.12"
# dependencies = [
#     "sounddevice",
#     "numpy",
#     "faster-whisper",
#     "scipy",
# ]
# ///
"""Optimized voice input — fast mic open, background Whisper loading."""

import sys
import os
import tempfile
import threading

# --- Only import sounddevice upfront (fast path to mic) ---
import sounddevice as sd

SAMPLE_RATE = 16000
CHANNELS = 1
SILENCE_THRESHOLD = 50
SILENCE_DURATION = 1.5  # seconds of silence before stopping
MAX_DURATION = 30  # max recording seconds

# --- Shared state for background loader ---
_bg = {"np": None, "wavfile": None, "model": None, "error": None}


def _whisper_model_cached():
    """Check if the Whisper 'base' model is already downloaded."""
    try:
        from huggingface_hub import try_to_load_from_cache
        result = try_to_load_from_cache("Systran/faster-whisper-base", "model.bin")
        return result is not None and isinstance(result, str)
    except Exception:
        # huggingface_hub not available or other issue — assume not cached
        return False


def _background_load():
    """Load numpy, scipy, faster_whisper, and the Whisper model in background."""
    try:
        import numpy as np
        import scipy.io.wavfile as wavfile
        from faster_whisper import WhisperModel

        _bg["np"] = np
        _bg["wavfile"] = wavfile
        _bg["model"] = WhisperModel("base", device="cpu", compute_type="int8")
    except Exception as e:
        _bg["error"] = e


def record_audio():
    """Record from mic with silence detection. Returns raw frames list."""
    frames = []
    silent_frames = 0
    has_speech = False
    silence_limit = int(SILENCE_DURATION * SAMPLE_RATE / 1024)

    # We need numpy just for the volume check in callback — lazy import it here
    # (sounddevice gives us raw bytes we can check without numpy too, but
    #  we import it since the bg thread will have it ready fast anyway)
    import numpy as np

    def callback(indata, frame_count, time_info, status):
        nonlocal silent_frames, has_speech
        frames.append(indata.copy())
        volume = np.abs(indata).mean()
        if volume > SILENCE_THRESHOLD:
            has_speech = True
            silent_frames = 0
        else:
            if has_speech:
                silent_frames += 1

    # Check mic is available before opening
    try:
        dev_info = sd.query_devices(kind='input')
        if dev_info is None:
            print("No input device found.", file=sys.stderr)
            sys.exit(1)
    except Exception as e:
        print(f"Mic check failed: {e}", file=sys.stderr)
        sys.exit(1)

    # Open mic stream
    stream = sd.InputStream(
        samplerate=SAMPLE_RATE,
        channels=CHANNELS,
        dtype='int16',
        blocksize=1024,
        callback=callback
    )

    with stream:
        # Mic is confirmed open — NOW print listening
        print("🟣 \U0001f3a4  Listening... (speak now, silence stops recording)", file=sys.stderr)

        max_blocks = int(MAX_DURATION * SAMPLE_RATE / 1024)
        block = 0
        while block < max_blocks:
            sd.sleep(int(1024 / SAMPLE_RATE * 1000))
            block += 1
            if has_speech and silent_frames >= silence_limit:
                break

    if not has_speech or len(frames) == 0:
        print("No speech detected.", file=sys.stderr)
        sys.exit(1)

    return frames


def transcribe(frames):
    """Wait for background loader, then transcribe."""
    np = _bg["np"]
    wavfile = _bg["wavfile"]
    model = _bg["model"]

    if np is None or wavfile is None or model is None:
        print("Whisper failed to load — can't transcribe.", file=sys.stderr)
        if _bg["error"]:
            print(f"  Error: {_bg['error']}", file=sys.stderr)
        sys.exit(1)

    audio_data = np.concatenate(frames, axis=0)

    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        wavfile.write(f.name, SAMPLE_RATE, audio_data)
        tmp_path = f.name

    try:
        segments, _ = model.transcribe(tmp_path, language="en")
        text = " ".join(seg.text.strip() for seg in segments).strip()
        return text
    finally:
        os.unlink(tmp_path)


def main():
    # --- First-run gate: download model before mic if not cached ---
    if not _whisper_model_cached():
        print("Downloading Whisper model (~150MB, one-time)...", file=sys.stderr)
        _background_load()  # blocking on first run
        if _bg["error"]:
            print(f"Model download failed: {_bg['error']}", file=sys.stderr)
            sys.exit(1)
        print("Model ready.", file=sys.stderr)
        loader_thread = None
    else:
        # --- Start background loader while we open mic ---
        loader_thread = threading.Thread(target=_background_load, daemon=True)
        loader_thread.start()

    # --- Record ---
    frames = record_audio()
    print("\U0001f4dd  Transcribing... 🔵", file=sys.stderr)

    # --- Wait for background loader to finish ---
    if loader_thread is not None:
        loader_thread.join(timeout=30)
        if loader_thread.is_alive():
            print("Whisper model took too long to load.", file=sys.stderr)
            sys.exit(1)

    # --- Transcribe ---
    text = transcribe(frames)
    if not text:
        print("Didn't catch that — try again.", file=sys.stderr)
        sys.exit(1)

    print(text)


if __name__ == "__main__":
    main()
