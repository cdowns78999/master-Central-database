/* =========================================================
   P8 — GO Button (stubbed extension + email)
   Bundles everything from window.__VRFL into a JSON preview,
   logs to console, opens modal, scrolls to P9.
   ========================================================= */

(function () {
  'use strict';

  function init() {
    var goBtn      = document.getElementById('p8-go');
    var prevLink   = document.getElementById('p8-preview-link');
    var modal      = document.getElementById('p8-modal');
    var modalClose = document.getElementById('p8-modal-close');
    var modalDone  = document.getElementById('p8-modal-done');
    var bundlePre  = document.getElementById('p8-bundle');
    var emailTo    = document.getElementById('p8-email-to');
    var emailSubj  = document.getElementById('p8-email-subject');
    var emailBody  = document.getElementById('p8-email-body');

    if (!goBtn || !modal) return;

    goBtn.addEventListener('click', function () { fire(true); });
    prevLink.addEventListener('click', function () { fire(false); });

    modalClose.addEventListener('click', closeModal);
    modalDone.addEventListener('click', closeModal);

    modal.addEventListener('click', function (e) {
      if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !modal.hidden) closeModal();
    });

    function fire(scrollAfter) {
      var bundle = buildBundle();

      // Pretty JSON for the modal
      var pretty = JSON.stringify(bundle, null, 2);
      bundlePre.innerHTML = syntaxHighlight(pretty);

      // Email stub
      var email = bundle.email;
      emailTo.textContent = email.to || '(no email captured in P2)';
      emailSubj.textContent = email.subject;
      emailBody.textContent = email.body;

      // Console log
      console.log(
        '%c[VR-FINAL-LABEL]%c sending bundle:',
        'color:#ff7f54;font-weight:700',
        'color:#fff',
        bundle
      );

      // Mark state
      if (window.__VRFL && window.__VRFL.state) {
        window.__VRFL.state.submitted = true;
        window.__VRFL.state.scrollAfterClose = !!scrollAfter;
      }

      openModal();
    }

    function openModal() {
      modal.hidden = false;
      document.body.style.overflow = 'hidden';
    }

    function closeModal() {
      modal.hidden = true;
      document.body.style.overflow = '';
      var shouldScroll = window.__VRFL && window.__VRFL.state && window.__VRFL.state.scrollAfterClose;
      if (shouldScroll) {
        var p9 = document.getElementById('p9');
        if (p9 && typeof p9.scrollIntoView === 'function') {
          p9.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        window.__VRFL.state.scrollAfterClose = false;
      }
    }

    // ---- Bundle builder ----
    function buildBundle() {
      var vrfl = window.__VRFL || { fields: {}, files: {} };
      var fields = vrfl.fields || {};
      var files  = vrfl.files  || {};

      // Stringify files as metadata (no bytes)
      var fileMeta = {};
      Object.keys(files).forEach(function (page) {
        fileMeta[page] = {};
        Object.keys(files[page] || {}).forEach(function (key) {
          var f = files[page][key];
          if (f && typeof f === 'object') {
            fileMeta[page][key] = {
              name: f.name || null,
              size: f.size || 0,
              type: f.type || ''
            };
          } else {
            fileMeta[page][key] = null;
          }
        });
      });

      // Pull email + names for the email template
      var p2 = fields.p2 || {};
      var p3 = fields.p3 || {};
      var p4 = fields.p4 || {};
      var p5 = fields.p5 || {};

      var stageName = p2.stageName || p2['stage-name'] || 'artist';
      var email     = p2.email || '';
      var songTitle = p3.songTitle || p3['song-title'] || p4.songTitle || p4['song-title']
                    || p3.title || p4.title || p5.title || 'your song';

      var subject = "you're in — VR Final Label received your submission";
      var body    = "Hey " + stageName + ", we got your cover of " + songTitle +
                    ". Our team reviews within 48h. — VR Final Label";

      return {
        meta: {
          app: 'VR-Final-Label',
          builtAt: new Date().toISOString(),
          submittedBy: stageName,
          submittedEmail: email
        },
        fields: fields,
        files: fileMeta,
        email: {
          to: email,
          subject: subject,
          body: body
        },
        targets: {
          chromeExtension: { wired: false, note: 'stub — payload ready for ext.send(bundle)' },
          email:           { wired: false, note: 'stub — would POST to /api/email-stub' }
        }
      };
    }

    // ---- JSON syntax highlighter ----
    function syntaxHighlight(json) {
      json = json
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;');
      return json.replace(
        /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
        function (match) {
          var cls = 'jn'; // number default
          if (/^"/.test(match)) {
            cls = /:$/.test(match) ? 'jk' : 'js';
          } else if (/true|false/.test(match)) {
            cls = 'jb';
          } else if (/null/.test(match)) {
            cls = 'jl';
          }
          return '<span class="' + cls + '">' + match + '</span>';
        }
      );
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
