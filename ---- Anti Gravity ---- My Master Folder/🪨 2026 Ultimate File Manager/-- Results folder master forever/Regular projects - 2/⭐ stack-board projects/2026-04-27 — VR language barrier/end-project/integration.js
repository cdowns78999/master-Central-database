// integration.js — agent A6 — cross-job glue: imports translate() from JOB 1 (2026-04-25 vrchat translator) engine.js

(function () {
  const JOB1_ENGINE_PATH = "../../2026-04-25 — vrchat translator/end-project/engine.js";
  let enginePromise = null;
  let engineReady = false;
  let engineRef = null;

  function loadEngine() {
    if (enginePromise) return enginePromise;
    enginePromise = import(JOB1_ENGINE_PATH)
      .then((mod) => {
        engineRef = mod;
        engineReady = true;
        return mod;
      })
      .catch((err) => {
        console.warn("[A6 integration] JOB 1 engine.js unavailable:", err && err.message);
        engineReady = false;
        engineRef = null;
        return null;
      });
    return enginePromise;
  }

  async function translateForVoiceTile(text, from, to) {
    const safeText = text == null ? "" : String(text);
    try {
      const mod = await loadEngine();
      if (!mod) return safeText + " [engine unavailable]";

      const fn =
        (typeof mod.translate === "function" && mod.translate) ||
        (mod.default && typeof mod.default.translate === "function" && mod.default.translate) ||
        (typeof mod.default === "function" && mod.default);

      if (!fn) return safeText + " [engine unavailable]";

      const result = await Promise.resolve(fn(safeText, from, to));
      if (result == null || result === "") return safeText + " [engine unavailable]";
      return result;
    } catch (err) {
      console.warn("[A6 integration] translate call failed:", err && err.message);
      return safeText + " [engine unavailable]";
    }
  }

  if (typeof window !== "undefined") {
    window.translateForVoiceTile = translateForVoiceTile;
    window.__A6_integration = {
      isReady: () => engineReady,
      engine: () => engineRef,
      reload: () => {
        enginePromise = null;
        return loadEngine();
      },
    };
  }

  // warm the import early so the first voice-tile call is snappy
  loadEngine();
})();
