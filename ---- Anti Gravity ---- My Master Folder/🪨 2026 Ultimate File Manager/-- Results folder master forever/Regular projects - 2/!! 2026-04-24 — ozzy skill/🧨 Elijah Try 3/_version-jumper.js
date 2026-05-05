/* ─── _version-jumper.js ──────────────────────────────────────────
   Auto-builds the top-center version jump banner from the current
   filename. Recognizes step-N.html (= v1) and step-N-vM.html (M=2..4).
   v4 = terminal (pulse, no link). All others link to the next version.
   ────────────────────────────────────────────────────────────────── */

(function () {
  var path = (window.location.pathname || "").split("/").pop() || "";
  var match = path.match(/^step-(\d+)(?:-v(\d+))?\.html$/i);
  if (!match) return;

  var stepNum = parseInt(match[1], 10);
  var currentVersion = match[2] ? parseInt(match[2], 10) : 1;
  var maxVersion = 4;
  var isTerminal = currentVersion >= maxVersion;
  var nextVersion = currentVersion + 1;
  var nextHref = isTerminal ? "" : ("step-" + stepNum + "-v" + nextVersion + ".html");

  var label = "S" + stepNum + " · v" + currentVersion;
  var dotClass = "vj-dot vj-v" + currentVersion + (isTerminal ? " vj-terminal" : "");

  var bandHTML;
  if (isTerminal) {
    bandHTML =
      '<div class="vj-band" role="status" aria-label="Latest version">' +
        '<span>' + label + '</span>' +
        '<span class="vj-arrow">·</span>' +
        '<span class="vj-target">LATEST</span>' +
        '<span class="' + dotClass + '" title="You are on the latest version"></span>' +
      '</div>';
  } else {
    bandHTML =
      '<a class="vj-band" href="' + nextHref + '" title="Open v' + nextVersion + '" aria-label="Jump to version ' + nextVersion + '">' +
        '<span>' + label + '</span>' +
        '<span class="vj-arrow">→</span>' +
        '<span class="vj-target">v' + nextVersion + '</span>' +
        '<span class="' + dotClass + '"></span>' +
      '</a>';
  }

  var banner = document.createElement("div");
  banner.className = "vj-banner";
  banner.innerHTML = bandHTML;

  function inject() {
    if (!document.body) return;
    document.body.insertBefore(banner, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", inject);
  } else {
    inject();
  }
})();
