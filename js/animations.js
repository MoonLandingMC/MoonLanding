/* ============================================================
   animations.js — Scroll-reveal IntersectionObserver + header
   ============================================================ */

(function () {

  // ── Scroll-reveal ────────────────────────────────────────
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          // Once revealed, stop observing to save resources
          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold:  0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  // Observe all .reveal elements
  document.querySelectorAll('.reveal').forEach((el) => {
    revealObserver.observe(el);
  });


  // ── Header scroll shadow ─────────────────────────────────
  const header = document.querySelector('.site-header');

  const headerObserver = new IntersectionObserver(
    ([entry]) => {
      header.classList.toggle('scrolled', !entry.isIntersecting);
    },
    { threshold: 0 }
  );

  // Observe a sentinel at the very top of the page
  const sentinel = document.createElement('div');
  sentinel.style.cssText = 'position:absolute;top:0;height:1px;width:1px;pointer-events:none;';
  document.body.prepend(sentinel);
  headerObserver.observe(sentinel);


  // ── Smooth nav scroll (account for fixed header) ─────────
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const offset = document.querySelector('.site-header').offsetHeight + 16;
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
