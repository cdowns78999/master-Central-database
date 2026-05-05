// Exports renderLesson(container, mdText) — parses YAML frontmatter + markdown sections, wires Quiz + Try-it components.

import { renderQuiz } from './quiz.js';
import { renderTryIt } from './tryit.js';

const KNOWN_SECTIONS = [
  'What it is',
  'Why it matters',
  'Music-business angle',
  'Try-it',
  'Quiz',
  'Sources',
];

export function renderLesson(container, mdText) {
  if (!container) return null;
  container.innerHTML = '';
  container.classList.add('lesson');

  const { frontmatter, body } = splitFrontmatter(mdText || '');
  const sections = splitSections(body);

  if (frontmatter && (frontmatter.title || frontmatter.id)) {
    const header = document.createElement('header');
    header.className = 'lesson__header';
    if (frontmatter.title) {
      const h1 = document.createElement('h1');
      h1.className = 'lesson__title';
      h1.textContent = frontmatter.title;
      header.appendChild(h1);
    }
    const metaBits = [];
    if (frontmatter.id) metaBits.push(`Lesson ${frontmatter.id}`);
    if (frontmatter.duration) metaBits.push(frontmatter.duration);
    if (frontmatter.level) metaBits.push(frontmatter.level);
    if (metaBits.length) {
      const meta = document.createElement('p');
      meta.className = 'lesson__meta';
      meta.textContent = metaBits.join(' · ');
      header.appendChild(meta);
    }
    container.appendChild(header);
  }

  KNOWN_SECTIONS.forEach((name) => {
    const block = sections[name.toLowerCase()];
    if (!block) return;

    const sectionEl = document.createElement('section');
    sectionEl.className = `lesson__section lesson__section--${slug(name)}`;

    const h2 = document.createElement('h2');
    h2.className = 'lesson__section-title';
    h2.textContent = name;
    sectionEl.appendChild(h2);

    if (name === 'Quiz') {
      const questions = parseQuiz(block);
      const quizMount = document.createElement('div');
      quizMount.className = 'lesson__quiz';
      sectionEl.appendChild(quizMount);
      if (questions.length) {
        renderQuiz(quizMount, questions, () => {
          sectionEl.dataset.completed = 'true';
        });
      } else {
        quizMount.appendChild(renderMarkdown(block));
      }
    } else if (name === 'Try-it') {
      const exercise = parseTryIt(block);
      const tryMount = document.createElement('div');
      tryMount.className = 'lesson__tryit';
      sectionEl.appendChild(tryMount);
      if (exercise) {
        renderTryIt(tryMount, exercise);
      } else {
        tryMount.appendChild(renderMarkdown(block));
      }
    } else {
      sectionEl.appendChild(renderMarkdown(block));
    }

    container.appendChild(sectionEl);
  });

  return { frontmatter, sections };
}

// ------------ frontmatter ------------

function splitFrontmatter(text) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(text);
  if (!match) return { frontmatter: {}, body: text };
  const fmRaw = match[1];
  const body = text.slice(match[0].length);
  return { frontmatter: parseYaml(fmRaw), body };
}

function parseYaml(src) {
  const out = {};
  const lines = src.split(/\r?\n/);
  let currentKey = null;
  for (const line of lines) {
    if (!line.trim()) continue;
    const listMatch = /^\s*-\s*(.+)$/.exec(line);
    if (listMatch && currentKey) {
      if (!Array.isArray(out[currentKey])) out[currentKey] = [];
      out[currentKey].push(stripQuotes(listMatch[1].trim()));
      continue;
    }
    const kvMatch = /^([A-Za-z0-9_\-]+)\s*:\s*(.*)$/.exec(line);
    if (!kvMatch) continue;
    const key = kvMatch[1];
    const rawVal = kvMatch[2].trim();
    if (rawVal === '') {
      out[key] = [];
      currentKey = key;
    } else {
      out[key] = stripQuotes(rawVal);
      currentKey = key;
    }
  }
  return out;
}

function stripQuotes(s) {
  if (!s) return s;
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// ------------ section splitter ------------

function splitSections(body) {
  const sections = {};
  const lines = body.split(/\r?\n/);
  let currentName = null;
  let buf = [];
  const flush = () => {
    if (currentName !== null) {
      sections[currentName.toLowerCase()] = buf.join('\n').trim();
    }
  };
  for (const line of lines) {
    const m = /^##\s+(.+?)\s*$/.exec(line);
    if (m) {
      flush();
      currentName = m[1].trim();
      buf = [];
    } else {
      if (currentName !== null) buf.push(line);
    }
  }
  flush();
  return sections;
}

// ------------ quiz parser ------------
// Format:
// 1. Question text?
//    - [ ] Wrong option
//    - [x] Correct option
//    - [ ] Another wrong

function parseQuiz(text) {
  const questions = [];
  const lines = text.split(/\r?\n/);
  let current = null;
  for (const raw of lines) {
    const line = raw.replace(/\s+$/, '');
    const qMatch = /^\s*(?:\d+\.|[-*])\s+(.+)$/.exec(line);
    const optMatch = /^\s*[-*]\s*\[([ xX])\]\s*(.+)$/.exec(line);
    if (optMatch) {
      if (!current) continue;
      current.options.push({
        text: optMatch[2].trim(),
        correct: optMatch[1].toLowerCase() === 'x',
      });
    } else if (qMatch && /\d+\./.test(line)) {
      if (current && current.options.length) questions.push(current);
      current = { q: qMatch[1].trim(), options: [] };
    } else if (line.trim() === '' && current && current.options.length) {
      questions.push(current);
      current = null;
    }
  }
  if (current && current.options.length) questions.push(current);
  return questions;
}

// ------------ try-it parser ------------
// Format (key/value blocks):
// **Prompt:** Write a Claude prompt that summarizes a song description.
// **Sample input:**
// ```
// Summarize this in two lines: ...
// ```
// **Sample output:**
// ```
// ...
// ```
// **Hint:** Try giving Claude a length constraint.

function parseTryIt(text) {
  const out = { prompt: '', sample_input: '', sample_output: '', hint: '' };
  const keys = {
    prompt: 'prompt',
    'sample input': 'sample_input',
    'sample output': 'sample_output',
    hint: 'hint',
  };
  const re = /\*\*([^*]+?):\*\*\s*([\s\S]*?)(?=\n\*\*[^*]+?:\*\*|\s*$)/g;
  let m;
  let found = false;
  while ((m = re.exec(text)) !== null) {
    const key = m[1].trim().toLowerCase();
    const slot = keys[key];
    if (!slot) continue;
    found = true;
    let val = m[2].trim();
    const codeMatch = /^```(?:\w+)?\r?\n([\s\S]*?)\r?\n```\s*$/.exec(val);
    if (codeMatch) val = codeMatch[1];
    out[slot] = val;
  }
  return found ? out : null;
}

// ------------ markdown renderer (limited) ------------

function renderMarkdown(text) {
  const frag = document.createDocumentFragment();
  const blocks = splitBlocks(text);
  blocks.forEach((block) => {
    const node = renderBlock(block);
    if (node) frag.appendChild(node);
  });
  return frag;
}

function splitBlocks(text) {
  const blocks = [];
  const lines = text.split(/\r?\n/);
  let buf = [];
  let inList = false;
  let listType = null;
  let listBuf = [];

  const flushPara = () => {
    if (buf.length) {
      blocks.push({ type: 'p', text: buf.join('\n').trim() });
      buf = [];
    }
  };
  const flushList = () => {
    if (listBuf.length) {
      blocks.push({ type: listType, items: listBuf.slice() });
      listBuf = [];
    }
    inList = false;
    listType = null;
  };

  for (const raw of lines) {
    const line = raw;
    if (!line.trim()) {
      flushPara();
      flushList();
      continue;
    }
    const ulMatch = /^\s*[-*]\s+(.+)$/.exec(line);
    const olMatch = /^\s*\d+\.\s+(.+)$/.exec(line);
    const hMatch = /^(#{1,6})\s+(.+)$/.exec(line);
    if (hMatch) {
      flushPara();
      flushList();
      blocks.push({ type: 'h', level: hMatch[1].length, text: hMatch[2].trim() });
      continue;
    }
    if (ulMatch) {
      flushPara();
      if (!inList || listType !== 'ul') {
        flushList();
        inList = true;
        listType = 'ul';
      }
      listBuf.push(ulMatch[1].trim());
      continue;
    }
    if (olMatch) {
      flushPara();
      if (!inList || listType !== 'ol') {
        flushList();
        inList = true;
        listType = 'ol';
      }
      listBuf.push(olMatch[1].trim());
      continue;
    }
    flushList();
    buf.push(line);
  }
  flushPara();
  flushList();
  return blocks;
}

function renderBlock(block) {
  if (block.type === 'h') {
    const tag = `h${Math.min(6, Math.max(1, block.level))}`;
    const el = document.createElement(tag);
    el.innerHTML = renderInline(block.text);
    return el;
  }
  if (block.type === 'p') {
    const el = document.createElement('p');
    el.innerHTML = renderInline(block.text);
    return el;
  }
  if (block.type === 'ul' || block.type === 'ol') {
    const el = document.createElement(block.type);
    block.items.forEach((item) => {
      const li = document.createElement('li');
      li.innerHTML = renderInline(item);
      el.appendChild(li);
    });
    return el;
  }
  return null;
}

function escapeHtml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function renderInline(text) {
  // 1) protect code spans first
  const codeStash = [];
  let s = text.replace(/`([^`]+)`/g, (_, code) => {
    codeStash.push(`<code>${escapeHtml(code)}</code>`);
    return ` C${codeStash.length - 1} `;
  });

  // 2) escape everything else
  s = escapeHtml(s);

  // 3) links [text](url)
  s = s.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, label, url) => {
    const safeUrl = /^(https?:|mailto:|#|\/|\.\/|\.\.\/)/i.test(url) ? url : '#';
    return `<a href="${safeUrl}" target="_blank" rel="noopener noreferrer">${label}</a>`;
  });

  // 4) bold then italic (bold first to avoid * collisions)
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');

  // 5) line breaks
  s = s.replace(/\n/g, '<br>');

  // 6) restore code spans
  s = s.replace(/ C(\d+) /g, (_, idx) => codeStash[Number(idx)] || '');

  return s;
}

function slug(s) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
