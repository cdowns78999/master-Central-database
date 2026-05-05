// Exports renderTryIt(container, exercise) — static "sandbox" with prompt, prefilled textarea, Run-sample reveal, optional hint.

export function renderTryIt(container, exercise) {
  if (!container || !exercise) return;
  container.innerHTML = '';
  container.classList.add('tryit');

  const wrap = document.createElement('div');
  wrap.className = 'tryit__wrap';

  if (exercise.prompt) {
    const prompt = document.createElement('p');
    prompt.className = 'tryit__prompt';
    prompt.textContent = exercise.prompt;
    wrap.appendChild(prompt);
  }

  const inputLabel = document.createElement('label');
  inputLabel.className = 'tryit__label';
  inputLabel.textContent = 'Your prompt';
  const inputId = `tryit-input-${Math.random().toString(36).slice(2, 8)}`;
  inputLabel.htmlFor = inputId;
  wrap.appendChild(inputLabel);

  const textarea = document.createElement('textarea');
  textarea.id = inputId;
  textarea.className = 'tryit__input';
  textarea.rows = 6;
  textarea.spellcheck = false;
  textarea.value = exercise.sample_input || '';
  wrap.appendChild(textarea);

  const actions = document.createElement('div');
  actions.className = 'tryit__actions';

  const runBtn = document.createElement('button');
  runBtn.type = 'button';
  runBtn.className = 'tryit__run';
  runBtn.textContent = 'Run sample';
  actions.appendChild(runBtn);

  let hintLink = null;
  if (exercise.hint) {
    hintLink = document.createElement('a');
    hintLink.href = '#';
    hintLink.className = 'tryit__hint-link';
    hintLink.textContent = 'Show hint';
    actions.appendChild(hintLink);
  }

  wrap.appendChild(actions);

  const hintBox = document.createElement('div');
  hintBox.className = 'tryit__hint';
  hintBox.hidden = true;
  if (exercise.hint) hintBox.textContent = exercise.hint;
  wrap.appendChild(hintBox);

  const outputWrap = document.createElement('div');
  outputWrap.className = 'tryit__output-wrap';
  outputWrap.hidden = true;

  const outputLabel = document.createElement('div');
  outputLabel.className = 'tryit__output-label';
  outputLabel.textContent = 'Sample Claude response';
  outputWrap.appendChild(outputLabel);

  const output = document.createElement('pre');
  output.className = 'tryit__output';
  output.textContent = exercise.sample_output || '';
  outputWrap.appendChild(output);

  const note = document.createElement('p');
  note.className = 'tryit__note';
  note.textContent = 'Demo response — not a live model call. Tweak your prompt to see the difference, then re-run.';
  outputWrap.appendChild(note);

  wrap.appendChild(outputWrap);

  runBtn.addEventListener('click', () => {
    outputWrap.hidden = false;
    runBtn.textContent = 'Re-run sample';
    output.classList.remove('tryit__output--flash');
    void output.offsetWidth;
    output.classList.add('tryit__output--flash');
  });

  if (hintLink) {
    hintLink.addEventListener('click', (e) => {
      e.preventDefault();
      hintBox.hidden = !hintBox.hidden;
      hintLink.textContent = hintBox.hidden ? 'Show hint' : 'Hide hint';
    });
  }

  container.appendChild(wrap);
}
