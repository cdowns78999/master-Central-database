/**
 * ChurnEngine — Claude API Real-Time Article Generator
 * Streams WordPress HTML from Claude based on pasted content banners.
 * No debounce. No ES modules. No build step. Immediate fire on churn().
 * Attaches to window.ChurnEngine.
 */
(function () {
  'use strict';

  const API_URL = 'https://api.anthropic.com/v1/messages';
  const MODEL = 'claude-sonnet-4-20250514';
  const API_VERSION = '2023-06-01';
  const LS_KEY = 'wpal_api_key';
  const MAX_TOKENS = 8192;

  const SYSTEM_PROMPT = [
    'You are a professional article writer for music industry press releases and blog posts.',
    'Write in a confident, editorial tone — like a music journalist who genuinely respects the artist.',
    'Use WordPress-compatible HTML only (no doctype, no head/body wrappers).',
    'Tags allowed: p, h2, h3, h4, strong, em, a, img, ul, ol, li, blockquote, hr, table, tr, th, td.',
    'Structure: Hook → Context → Depth → Proof → Close.',
    'Lead with the strongest points: cosigns, stats, story hooks.',
    'Include all information provided — leave nothing out.',
    'If given links, embed them naturally. If given image URLs, use img tags.',
    'Write 1200-2000 words. Every sentence earns its place.'
  ].join(' ');

  const ALLOWED_TAGS = [
    'p', 'h2', 'h3', 'h4', 'strong', 'em', 'a', 'img',
    'ul', 'ol', 'li', 'blockquote', 'hr', 'table', 'tr',
    'th', 'td', 'code', 'pre'
  ];

  // ── Internal State ──
  let _editorEl = null;
  let _apiKeyInput = null;
  let _churning = false;
  let _abortController = null;

  // Callbacks
  let _onStart = function () {};
  let _onChunk = function () {};
  let _onComplete = function () {};
  let _onError = function () {};

  // ── Helpers ──

  function getApiKey() {
    if (_apiKeyInput && _apiKeyInput.value.trim()) return _apiKeyInput.value.trim();
    try { return (localStorage.getItem(LS_KEY) || '').trim(); } catch (e) { return ''; }
  }

  function saveApiKey(key) {
    var clean = (key || '').trim();
    try {
      if (clean) localStorage.setItem(LS_KEY, clean);
      else localStorage.removeItem(LS_KEY);
    } catch (e) {}
    if (_apiKeyInput) _apiKeyInput.value = clean;
  }

  function buildContext(banners) {
    if (!banners || !banners.length) return '';
    return banners.map(function (b, i) {
      var text = '';
      if (typeof b === 'string') text = b;
      else if (b && typeof b === 'object') {
        var parts = [];
        if (b.title) parts.push('Title: ' + b.title);
        if (b.url) parts.push('URL: ' + b.url);
        if (b.imageUrl) parts.push('Image: ' + b.imageUrl);
        if (b.content) parts.push(b.content);
        if (b.raw) parts.push(b.raw);
        text = parts.length ? parts.join('\n') : JSON.stringify(b);
      }
      return '--- Paste ' + (i + 1) + ' ---\n' + text.trim();
    }).join('\n\n');
  }

  // ── Streaming API Call ──

  async function streamClaude(context, apiKey) {
    _abortController = new AbortController();

    var body = {
      model: MODEL,
      max_tokens: MAX_TOKENS,
      system: SYSTEM_PROMPT,
      stream: true,
      messages: [{
        role: 'user',
        content: 'Using ONLY the pasted content below, write a complete WordPress article in HTML.\n\nAllowed HTML tags: ' + ALLOWED_TAGS.join(', ') + '\n\nPasted content:\n\n' + context
      }]
    };

    var response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': API_VERSION,
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify(body),
      signal: _abortController.signal
    });

    if (!response.ok) {
      var errText = '';
      try { errText = await response.text(); } catch (_) {}
      if (response.status === 401) throw new Error('Invalid API key (401). Check your key in the header bar.');
      if (response.status === 429) throw new Error('Rate limited (429). Wait a moment and try again.');
      if (response.status === 400) throw new Error('Bad request (400): ' + errText);
      throw new Error('API error ' + response.status + ': ' + errText);
    }

    // ── SSE Stream Parsing ──
    var reader = response.body.getReader();
    var decoder = new TextDecoder('utf-8');
    var accumulated = '';
    var buffer = '';

    while (true) {
      var result = await reader.read();
      if (result.done) break;

      buffer += decoder.decode(result.value, { stream: true });

      // Split on newlines — keep the last (possibly incomplete) line in buffer
      var lines = buffer.split('\n');
      buffer = lines.pop() || '';

      for (var k = 0; k < lines.length; k++) {
        var line = lines[k];
        if (!line.startsWith('data: ')) continue;
        var dataStr = line.slice(6).trim();
        if (!dataStr || dataStr === '[DONE]') continue;

        var event;
        try { event = JSON.parse(dataStr); } catch (_) { continue; }

        if (event.type === 'content_block_delta' &&
            event.delta && event.delta.type === 'text_delta') {
          accumulated += event.delta.text;
          _onChunk(accumulated);
          if (_editorEl) _editorEl.value = accumulated;
        }

        if (event.type === 'error') {
          var errMsg = (event.error && event.error.message) || JSON.stringify(event);
          throw new Error('Stream error: ' + errMsg);
        }
      }
    }

    // Process any remaining buffer
    if (buffer.startsWith('data: ')) {
      var lastData = buffer.slice(6).trim();
      if (lastData && lastData !== '[DONE]') {
        try {
          var lastEvent = JSON.parse(lastData);
          if (lastEvent.type === 'content_block_delta' &&
              lastEvent.delta && lastEvent.delta.type === 'text_delta') {
            accumulated += lastEvent.delta.text;
            _onChunk(accumulated);
            if (_editorEl) _editorEl.value = accumulated;
          }
        } catch (_) {}
      }
    }

    return accumulated;
  }

  // ── Public API ──

  window.ChurnEngine = {

    init: function (editorElement, apiKeyInput) {
      _editorEl = editorElement || null;
      _apiKeyInput = apiKeyInput || null;

      if (_apiKeyInput) {
        // Sync key on any keystroke (not just blur)
        _apiKeyInput.addEventListener('input', function () {
          saveApiKey(_apiKeyInput.value);
        });
        // Pre-fill from storage if empty
        if (!_apiKeyInput.value) {
          var saved = getApiKey();
          if (saved) _apiKeyInput.value = saved;
        }
      }
      console.log('[ChurnEngine] Initialized. Key present:', !!getApiKey());
    },

    /**
     * Trigger a churn. NO DEBOUNCE — fires immediately.
     * Aborts any in-flight churn first.
     */
    churn: async function (banners) {
      // Abort any in-flight churn
      if (_churning && _abortController) {
        _abortController.abort();
        _churning = false;
      }

      if (!banners || !banners.length) {
        var noDataErr = new Error('No content to churn. Paste something first.');
        _onError(noDataErr);
        throw noDataErr;
      }

      var apiKey = getApiKey();
      if (!apiKey) {
        var keyErr = new Error('No API key. Enter your Anthropic API key in the header bar.');
        _onError(keyErr);
        throw keyErr;
      }
      if (!apiKey.startsWith('sk-')) {
        var badKeyErr = new Error('API key should start with "sk-". Check your key.');
        _onError(badKeyErr);
        throw badKeyErr;
      }

      var context = buildContext(banners);
      if (!context) {
        var emptyErr = new Error('Banners produced empty context.');
        _onError(emptyErr);
        throw emptyErr;
      }

      // Fire immediately
      _churning = true;
      _onStart();

      try {
        var html = await streamClaude(context, apiKey);
        _churning = false;
        _abortController = null;
        _onComplete(html);
        return html;
      } catch (err) {
        _churning = false;
        _abortController = null;
        if (err.name === 'AbortError') {
          var abortErr = new Error('Churn aborted (new churn started).');
          _onError(abortErr);
          throw abortErr;
        }
        _onError(err);
        throw err;
      }
    },

    isChurning: function () { return _churning; },

    abort: function () {
      if (_abortController) {
        _abortController.abort();
        _churning = false;
      }
    },

    hasApiKey: function () { return !!getApiKey(); },

    setApiKey: saveApiKey,

    getApiKeyMasked: function () {
      var key = getApiKey();
      if (!key) return '(none)';
      if (key.length <= 12) return '****';
      return key.slice(0, 7) + '...' + key.slice(-4);
    },

    // Callback setters
    onChurnStart: function (fn) { if (typeof fn === 'function') _onStart = fn; },
    onChurnChunk: function (fn) { if (typeof fn === 'function') _onChunk = fn; },
    onChurnComplete: function (fn) { if (typeof fn === 'function') _onComplete = fn; },
    onChurnError: function (fn) { if (typeof fn === 'function') _onError = fn; },

    ALLOWED_TAGS: ALLOWED_TAGS,
    MODEL: MODEL
  };
})();
