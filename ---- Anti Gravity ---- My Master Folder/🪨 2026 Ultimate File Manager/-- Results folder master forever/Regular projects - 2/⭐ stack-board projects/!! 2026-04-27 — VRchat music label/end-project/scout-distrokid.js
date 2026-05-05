// scout-distrokid.js — simulated scout→DistroKid handoff (agent A8)
// DEMO ONLY: real integration swaps the setTimeout chain for actual DistroKid API calls.

import { PIPELINE_STAGES } from './pipeline.js';

const STAGE_INTERVAL_MS = 500; // 6 stages * 500ms = 3s total

function getRelease(releaseId) {
  if (!window.RELEASES) return null;
  return window.RELEASES.find(r => r.id === releaseId) || null;
}

function updateStepperDom(releaseId, newStageIndex) {
  const card = document.querySelector(`[data-release-id="${releaseId}"]`);
  if (!card) return;
  const steps = card.querySelectorAll('.a8-step');
  const bars  = card.querySelectorAll('.a8-bar');

  steps.forEach((step, idx) => {
    const dot   = step.querySelector('.a8-dot');
    const label = step.querySelector('.a8-label');
    let state;
    if (idx < newStageIndex)      state = 'completed';
    else if (idx === newStageIndex) state = 'current';
    else                           state = 'pending';

    dot.classList.remove('completed', 'current', 'pending');
    label.classList.remove('completed', 'current', 'pending');
    dot.classList.add(state);
    label.classList.add(state);
    dot.textContent = state === 'completed' ? '✓' : (idx + 1);
  });

  bars.forEach((bar, idx) => {
    bar.classList.toggle('completed', idx < newStageIndex);
  });
}

export function submitToDistroKid(releaseId) {
  return new Promise((resolve, reject) => {
    const release = getRelease(releaseId);
    if (!release) {
      reject(new Error(`[A8] release not found: ${releaseId}`));
      return;
    }

    let currentStage = 0;
    release.stageIndex = currentStage;
    updateStepperDom(releaseId, currentStage);

    const tick = () => {
      currentStage += 1;
      if (currentStage > PIPELINE_STAGES.length - 1) {
        // Mark all complete (push current past last index for full-green render)
        release.stageIndex = PIPELINE_STAGES.length;
        updateStepperDom(releaseId, PIPELINE_STAGES.length);
        resolve({
          releaseId,
          status: 'submitted',
          finalStage: PIPELINE_STAGES[PIPELINE_STAGES.length - 1],
          timestamp: new Date().toISOString()
        });
        return;
      }
      release.stageIndex = currentStage;
      updateStepperDom(releaseId, currentStage);
      setTimeout(tick, STAGE_INTERVAL_MS);
    };

    setTimeout(tick, STAGE_INTERVAL_MS);
  });
}
