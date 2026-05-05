// Exports renderQuiz(container, questions, onComplete) — radio-card multiple-choice quiz with submit + per-question feedback.

export function renderQuiz(container, questions, onComplete) {
  if (!container) return;
  container.innerHTML = '';
  container.classList.add('quiz');

  const state = questions.map(() => ({ selected: null, locked: false }));

  const form = document.createElement('form');
  form.className = 'quiz-form';
  form.addEventListener('submit', (e) => e.preventDefault());

  questions.forEach((question, qIdx) => {
    const qWrap = document.createElement('fieldset');
    qWrap.className = 'quiz-q';
    qWrap.dataset.qIdx = String(qIdx);

    const legend = document.createElement('legend');
    legend.className = 'quiz-q__legend';
    legend.textContent = `${qIdx + 1}. ${question.q}`;
    qWrap.appendChild(legend);

    const optsWrap = document.createElement('div');
    optsWrap.className = 'quiz-q__options';

    question.options.forEach((opt, oIdx) => {
      const id = `quiz-${qIdx}-${oIdx}`;
      const label = document.createElement('label');
      label.className = 'quiz-opt';
      label.htmlFor = id;

      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = `quiz-q-${qIdx}`;
      radio.id = id;
      radio.value = String(oIdx);
      radio.className = 'quiz-opt__radio';
      radio.addEventListener('change', () => {
        if (state[qIdx].locked) return;
        state[qIdx].selected = oIdx;
      });

      const text = document.createElement('span');
      text.className = 'quiz-opt__text';
      text.textContent = opt.text;

      const mark = document.createElement('span');
      mark.className = 'quiz-opt__mark';
      mark.setAttribute('aria-hidden', 'true');

      label.appendChild(radio);
      label.appendChild(text);
      label.appendChild(mark);
      optsWrap.appendChild(label);
    });

    qWrap.appendChild(optsWrap);

    const feedback = document.createElement('p');
    feedback.className = 'quiz-q__feedback';
    feedback.setAttribute('role', 'status');
    qWrap.appendChild(feedback);

    form.appendChild(qWrap);
  });

  const actions = document.createElement('div');
  actions.className = 'quiz-actions';

  const submitBtn = document.createElement('button');
  submitBtn.type = 'submit';
  submitBtn.className = 'quiz-submit';
  submitBtn.textContent = 'Submit';

  const scoreOut = document.createElement('div');
  scoreOut.className = 'quiz-score';
  scoreOut.setAttribute('role', 'status');

  actions.appendChild(submitBtn);
  actions.appendChild(scoreOut);
  form.appendChild(actions);

  submitBtn.addEventListener('click', () => {
    const allAnswered = state.every((s) => s.selected !== null);
    if (!allAnswered) {
      scoreOut.textContent = 'Pick an answer for every question first.';
      scoreOut.dataset.kind = 'warn';
      return;
    }

    let score = 0;
    questions.forEach((question, qIdx) => {
      const sel = state[qIdx].selected;
      const isCorrect = !!question.options[sel].correct;
      if (isCorrect) score += 1;
      state[qIdx].locked = true;

      const qEl = form.querySelector(`fieldset.quiz-q[data-q-idx="${qIdx}"]`);
      if (!qEl) return;

      const labels = qEl.querySelectorAll('.quiz-opt');
      labels.forEach((label, oIdx) => {
        const radio = label.querySelector('input');
        radio.disabled = true;
        const opt = question.options[oIdx];
        const mark = label.querySelector('.quiz-opt__mark');
        if (opt.correct) {
          label.classList.add('quiz-opt--correct');
          mark.textContent = '✓';
        } else if (oIdx === sel) {
          label.classList.add('quiz-opt--wrong');
          mark.textContent = '✗';
        }
      });

      const feedback = qEl.querySelector('.quiz-q__feedback');
      if (feedback) {
        feedback.textContent = isCorrect ? 'Correct.' : 'Not quite — the right answer is highlighted.';
        feedback.dataset.kind = isCorrect ? 'ok' : 'bad';
      }
    });

    submitBtn.disabled = true;
    scoreOut.textContent = `Score: ${score} / ${questions.length}`;
    scoreOut.dataset.kind = 'done';

    if (typeof onComplete === 'function') {
      try { onComplete(score); } catch (e) { console.error('quiz onComplete error', e); }
    }
  });

  container.appendChild(form);
}
