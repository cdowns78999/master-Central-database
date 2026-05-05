# OpenClaw 2026.5.4 Debugging & Setup Guide

## 1. Permission Error (EPERM)
**Issue:** `Error: EPERM: operation not permitted, symlink`
**Root Cause:** Windows security policy prevents non-administrator users from creating symbolic links. This happens when OpenClaw tries to link its built-in browser skills to the active plugin directory.
**Solution:** 
- Run PowerShell as **Administrator**.
- Or, enable **Developer Mode** in Windows Settings (System > For developers).

## 2. Configuration Schema Errors
**Issue:** `Error: Config validation failed: models: Unrecognized key: "default"`
**Research Findings:** 
- The configuration structure for OpenClaw 2026 uses a nested `agents.defaults.model.primary` path rather than a top-level `models.default`.
- Key configuration sections are:
  - `agents.defaults.model.primary`: Sets the main model.
  - `agents.defaults.models`: Defines available models and their aliases.

## 3. Skill Management
**Issue:** `Skill not found` or `needs setup`
**Research Findings:**
- Built-in skills (bundled) often require external dependencies (e.g., `1password`, `bluebubbles`).
- Essential workspace skills are `browser` and `filesystem`.
- `shell-execution` is likely provided by a specific plugin or built into the agent core rather than being a standalone ClawHub skill.

## 4. Setup Plan (Base for Execution)
1. **Elevate:** Ensure terminal is running with Admin rights.
2. **Symlink Fix:** Manually create the symlink for `browser-automation`.
3. **Model Setup:** Set `openrouter/auto` via `agents.defaults.model.primary`.
4. **Skill Prep:** Ensure `browser` and `filesystem` are ready in the workspace.
5. **Validation:** Run `openclaw models status --probe` to confirm auth and paths.
