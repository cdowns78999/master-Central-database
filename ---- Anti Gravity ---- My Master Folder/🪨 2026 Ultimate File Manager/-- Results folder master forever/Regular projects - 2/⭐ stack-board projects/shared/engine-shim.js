/* ============================================================
   ⭐ stack-board projects — engine-shim.js
   Re-exports JOB 1's translator engine to any sibling job
   without forcing them to type cross-folder relative paths.

   USAGE (from any sibling job's HTML/JS):
     import { translate } from "../../shared/engine-shim.js";
     const out = await translate("hello", { from: "en", to: "ja" });

   Resolves the JOB 1 engine path by inspecting where THIS shim
   lives (relative to the importer) and walking back to the
   parent stack-board bucket, then into the translator end-project.
   ============================================================ */

const JOB1_FOLDER = "2026-04-25 — vrchat translator";
const JOB1_ENGINE_RELATIVE = `../${JOB1_FOLDER}/end-project/engine.js`;

let _enginePromise = null;

function resolveEngineURL() {
  // import.meta.url points at THIS file: .../⭐ stack-board projects/shared/engine-shim.js
  // The translator engine lives at: .../⭐ stack-board projects/<JOB1_FOLDER>/end-project/engine.js
  try {
    return new URL(JOB1_ENGINE_RELATIVE, import.meta.url).href;
  } catch (_e) {
    // graceful fallback: try a path inferred from the document location
    try {
      const here = document.location.pathname;
      // Strip back to the parent ⭐ stack-board projects folder
      const marker = "/⭐ stack-board projects/";
      const idx = here.indexOf(marker);
      if (idx !== -1) {
        const root = here.slice(0, idx + marker.length);
        return root + encodeURI(`${JOB1_FOLDER}/end-project/engine.js`);
      }
    } catch (_e2) { /* noop */ }
    return null;
  }
}

async function loadEngine() {
  if (_enginePromise) return _enginePromise;
  const url = resolveEngineURL();
  if (!url) {
    _enginePromise = Promise.reject(new Error("engine-shim: cannot resolve JOB 1 engine path"));
    return _enginePromise;
  }
  _enginePromise = import(/* @vite-ignore */ url).catch((err) => {
    console.warn("[engine-shim] dynamic import failed, falling back to stub:", err);
    return {
      translate: async (text) => ({
        ok: false,
        text,
        note: "engine-shim fallback: JOB 1 engine.js not reachable",
      }),
    };
  });
  return _enginePromise;
}

/**
 * Translate text via JOB 1's engine.
 * @param {string} text
 * @param {{from?: string, to?: string} | undefined} opts
 */
export async function translate(text, opts = {}) {
  const mod = await loadEngine();
  if (mod && typeof mod.translate === "function") {
    return mod.translate(text, opts);
  }
  // last-resort: identity passthrough so dependents don't crash
  return { ok: false, text, note: "engine-shim: translate() not exported by engine" };
}

/** Direct accessor for advanced callers who want the full module. */
export async function getEngine() {
  return loadEngine();
}

export default { translate, getEngine };
