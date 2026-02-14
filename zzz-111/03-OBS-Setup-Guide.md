# Professional YouTuber OBS Setup Guide

To achieve the "Matt Wolfe" look shown in your screenshot, follow these steps to configure OBS.

## 1. Scene Configuration
Create a new scene called **"Main Production"**.

### Layer 1: Screen Capture
- **Source:** Display Capture or Window Capture (select your "Life Development" web app window).
- **Position:** Full Screen.

### Layer 2: Webcam (Rounded/Circle Look)
- **Source:** Video Capture Device.
- **How to get the circle look:**
    1. Right-click your Webcam source -> **Filters**.
    2. Click "+" -> **Image Mask/Blend**.
    3. Type: **Alpha Mask (Alpha Channel)**.
    4. Path: [I will generate a circle mask image for you].
- **Position:** Bottom right corner (like in the screenshot).

## 2. Audio Setup
- **Filters on Mic:**
    - **Noise Suppression**: Use RNNoise.
    - **Compressor**: To keep your voice level even.
    - **Limiter**: To prevent peaking.

## 3. High-End Recording Settings
*Settings -> Output -> Recording*
- **Recording Format:** `mkv` (prevents loss if OBS crashes) or `mp4`.
- **Encoder:** `NVIDIA NVENC H.264` (if you have an NVIDIA GPU) or `x264`.
- **Rate Control:** `CQP` (at 20-22) or `CBR` (at 10,000+ Kbps).
- **Audio Bitrate:** `320`.

## 4. Visual Flourish (Optional)
- Add a **LUT (Look Up Table)** to your camera for professional color grading (Emerald/Cool tones to match your app).
