/* ============================================================
   utils.js — Miscellaneous utilities
   ============================================================ */

(function () {

  // ── Auto-update copyright year ───────────────────────────
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ── Prefers-reduced-motion guard ─────────────────────────
  // Exposes a global flag other scripts can check if needed
  window.prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

})();
