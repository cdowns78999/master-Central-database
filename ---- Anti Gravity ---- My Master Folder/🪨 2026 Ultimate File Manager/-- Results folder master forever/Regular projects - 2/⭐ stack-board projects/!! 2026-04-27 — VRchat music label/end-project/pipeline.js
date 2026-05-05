// pipeline.js — VRchat music label release pipeline stepper (agent A8)

export const PIPELINE_STAGES = [
  'scout',
  'WAV upload',
  'metadata',
  'cover art',
  'DistroKid submit',
  'live on Spotify'
];

const STUB_RELEASES = [
  { id: 'rel-001', title: 'Neon Drift',     artist: 'Kaito Vex',     stageIndex: 5 },
  { id: 'rel-002', title: 'Glass Garden',   artist: 'Mira Lune',     stageIndex: 2 },
  { id: 'rel-003', title: 'Hollow Signal',  artist: 'Velour Static', stageIndex: 0 }
];

function stageState(idx, current) {
  if (idx < current)  return 'completed';
  if (idx === current) return 'current';
  return 'pending';
}

function injectStyles() {
  if (document.getElementById('pipeline-a8-styles')) return;
  const css = `
    .a8-pipeline-wrap { display: flex; flex-direction: column; gap: 18px; padding: 18px; font-family: ui-sans-serif, system-ui, sans-serif; color: #e5e7eb; }
    .a8-release-card { background: #0f172a; border: 1px solid #1e293b; border-radius: 12px; padding: 14px 16px; box-shadow: 0 2px 8px rgba(0,0,0,.25); }
    .a8-release-head { display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 12px; }
    .a8-release-title { font-size: 15px; font-weight: 600; color: #f8fafc; }
    .a8-release-artist { font-size: 12px; color: #94a3b8; }
    .a8-stepper { display: flex; align-items: center; gap: 0; }
    .a8-step { display: flex; flex-direction: column; align-items: center; flex: 1; min-width: 0; }
    .a8-dot { width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #0f172a; transition: all .25s ease; }
    .a8-dot.completed { background: #10b981; color: #052e1a; }
    .a8-dot.current   { background: #f59e0b; color: #3b1f00; animation: a8-pulse 1.2s ease-in-out infinite; }
    .a8-dot.pending   { background: #334155; color: #94a3b8; }
    .a8-label { margin-top: 6px; font-size: 10px; text-align: center; color: #94a3b8; line-height: 1.2; max-width: 70px; }
    .a8-label.completed { color: #10b981; }
    .a8-label.current   { color: #f59e0b; font-weight: 600; }
    .a8-bar { height: 2px; flex: 1; background: #334155; margin: 0 -2px; align-self: flex-start; margin-top: 10px; }
    .a8-bar.completed { background: #10b981; }
    @keyframes a8-pulse { 0%,100% { box-shadow: 0 0 0 0 rgba(245,158,11,.7); } 50% { box-shadow: 0 0 0 6px rgba(245,158,11,0); } }
  `;
  const style = document.createElement('style');
  style.id = 'pipeline-a8-styles';
  style.textContent = css;
  document.head.appendChild(style);
}

function renderStepper(release) {
  const stepperHtml = PIPELINE_STAGES.map((stage, idx) => {
    const state = stageState(idx, release.stageIndex);
    const mark = state === 'completed' ? '✓' : (idx + 1);
    const stepHtml = `
      <div class="a8-step" data-stage-idx="${idx}">
        <div class="a8-dot ${state}">${mark}</div>
        <div class="a8-label ${state}">${stage}</div>
      </div>
    `;
    if (idx === PIPELINE_STAGES.length - 1) return stepHtml;
    const barState = idx < release.stageIndex ? 'completed' : '';
    return stepHtml + `<div class="a8-bar ${barState}"></div>`;
  }).join('');

  return `
    <div class="a8-release-card" data-release-id="${release.id}">
      <div class="a8-release-head">
        <div>
          <div class="a8-release-title">${release.title}</div>
          <div class="a8-release-artist">${release.artist}</div>
        </div>
        <div class="a8-release-artist">id: ${release.id}</div>
      </div>
      <div class="a8-stepper">${stepperHtml}</div>
    </div>
  `;
}

export function renderPipeline(container) {
  if (!container) return;
  injectStyles();
  const releases = (window.RELEASES && window.RELEASES.length) ? window.RELEASES : STUB_RELEASES;
  if (!window.RELEASES) window.RELEASES = STUB_RELEASES;
  container.innerHTML = `<div class="a8-pipeline-wrap">${releases.map(renderStepper).join('')}</div>`;
}
