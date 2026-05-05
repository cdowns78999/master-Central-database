# Components

Standalone, vanilla-JS ES modules. Drop into the curriculum shell (`index.html` + `app.js` + `styles.css`) and import directly. No build step, no dependencies.

```
components/
  quiz.js
  tryit.js
  progress.js
  lesson-renderer.js
```

---

## quiz.js

**Exports**

- `renderQuiz(container, questions, onComplete)`

**Shape**

```js
questions = [
  {
    q: "What is the main role of system prompts in Claude?",
    options: [
      { text: "Set persona, tone, and constraints", correct: true },
      { text: "Replace the user's message",          correct: false },
      { text: "Generate audio",                       correct: false },
    ],
  },
  // ...
];
```

**Usage**

```js
import { renderQuiz } from './components/quiz.js';

renderQuiz(document.getElementById('quiz-mount'), questions, (score) => {
  console.log('finished, score:', score);
});
```

CSS hooks: `.quiz-q`, `.quiz-opt`, `.quiz-opt--correct`, `.quiz-opt--wrong`, `.quiz-q__feedback`, `.quiz-submit`, `.quiz-score`.

---

## tryit.js

**Exports**

- `renderTryIt(container, exercise)`

**Shape**

```js
exercise = {
  prompt:        "Ask Claude to summarize a song description in two lines.",
  sample_input:  "Summarize this song in two lines:\n...",
  sample_output: "A neon synth-pop ballad about late-night driving...",
  hint:          "Tell Claude the audience and the length up front.",
};
```

**Usage**

```js
import { renderTryIt } from './components/tryit.js';

renderTryIt(document.getElementById('tryit-mount'), exercise);
```

Static demo — no live model call. The "Run sample" button reveals `sample_output`.

CSS hooks: `.tryit__prompt`, `.tryit__input`, `.tryit__run`, `.tryit__hint-link`, `.tryit__hint`, `.tryit__output`, `.tryit__output--flash`.

---

## progress.js

**Exports**

- `getProgress() -> { completed: Set<string>, total: 12, pct: number }`
- `setComplete(lessonId)`
- `resetProgress()`
- `onChange(callback)` — returns an unsubscribe function. Callback fires immediately with current snapshot, then on every change (including cross-tab via `storage` event).

**Storage**

- localStorage key: `claude-music-curriculum-progress`
- Value: JSON array of completed lesson IDs.

**Usage**

```js
import { getProgress, setComplete, onChange } from './components/progress.js';

const off = onChange(({ completed, total, pct }) => {
  document.getElementById('pct').textContent = `${pct}%`;
  document.getElementById('done').textContent = `${completed.size} / ${total}`;
});

setComplete('lesson-03');
// later: off();
```

---

## lesson-renderer.js

**Exports**

- `renderLesson(container, mdText)`

Parses YAML frontmatter + markdown with these expected `## ` sections:

- What it is
- Why it matters
- Music-business angle
- Try-it
- Quiz
- Sources

The Try-it block is parsed into a `{prompt, sample_input, sample_output, hint}` object and handed to `renderTryIt`. The Quiz block is parsed into questions and handed to `renderQuiz`.

**Markdown supported**: headings, paragraphs, ordered + unordered lists, links `[text](url)`, `**bold**`, `*italic*`, inline `` `code` ``.

**Lesson markdown shape**

```md
---
id: 03
title: Prompting Claude for Lyric Hooks
duration: 12 min
level: beginner
---

## What it is
A short paragraph...

## Why it matters
- Bullet one
- Bullet two

## Music-business angle
Paragraph with a [link](https://example.com) and **emphasis**.

## Try-it
**Prompt:** Ask Claude to write three lyric hooks for a sunset-driving song.
**Sample input:**
\`\`\`
Write 3 lyric hooks for a sunset-driving synth-pop track. Each under 8 words.
\`\`\`
**Sample output:**
\`\`\`
1. Headlights chasing the orange line
2. ...
\`\`\`
**Hint:** Pin a length and a mood up front.

## Quiz
1. What does a system prompt usually set?
   - [x] Persona, tone, constraints
   - [ ] The model's training data
   - [ ] The user's API key

2. Which is best for a hook generator?
   - [ ] Vague prompt with no audience
   - [x] Specific audience + length + mood
   - [ ] Asking Claude to "be creative"

## Sources
- [Anthropic docs](https://docs.anthropic.com)
- [Music biz reference](https://example.com)
```

**Usage**

```js
import { renderLesson } from './components/lesson-renderer.js';

const md = await fetch('./lessons/03.md').then((r) => r.text());
renderLesson(document.getElementById('lesson-mount'), md);
```
