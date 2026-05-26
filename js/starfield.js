/* ============================================================
   starfield.js — Canvas star field with shooting stars
   ============================================================ */

(function () {
  const canvas = document.getElementById('starfield');
  const ctx    = canvas.getContext('2d');

  // ── Config ──────────────────────────────────────────────
  const CONFIG = {
    starCount:         220,
    shootingStarFreq:  0.003,   // chance per frame a new one spawns
    maxShootingStars:  3,
  };

  // ── State ────────────────────────────────────────────────
  let W, H, stars, shootingStars;

  // ── Init canvas size ─────────────────────────────────────
  function resize () {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    buildStars();
  }

  // ── Build static star array ──────────────────────────────
  function buildStars () {
    stars = Array.from({ length: CONFIG.starCount }, () => ({
      x:        Math.random() * W,
      y:        Math.random() * H,
      r:        Math.random() * 1.4 + 0.2,
      opacity:  Math.random() * 0.7 + 0.2,
      speed:    Math.random() * 0.015 + 0.005,   // twinkle speed
      phase:    Math.random() * Math.PI * 2,      // twinkle phase offset
    }));
  }

  // ── Shooting star factory ────────────────────────────────
  function createShootingStar () {
    const angle = (Math.random() * 30 + 10) * (Math.PI / 180);  // 10–40° downward
    const speed = Math.random() * 8 + 5;
    return {
      x:     Math.random() * W * 0.8,
      y:     Math.random() * H * 0.3,
      vx:    Math.cos(angle) * speed,
      vy:    Math.sin(angle) * speed,
      len:   Math.random() * 120 + 60,
      alpha: 1,
      fade:  Math.random() * 0.012 + 0.008,
    };
  }

  shootingStars = [];

  // ── Draw a single static star ────────────────────────────
  function drawStar (star, t) {
    const twinkle = 0.5 + 0.5 * Math.sin(t * star.speed + star.phase);
    const alpha   = star.opacity * (0.5 + 0.5 * twinkle);
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
    ctx.fill();
  }

  // ── Draw a shooting star ─────────────────────────────────
  function drawShootingStar (s) {
    const grad = ctx.createLinearGradient(s.x, s.y, s.x - s.vx * 12, s.y - s.vy * 12);
    grad.addColorStop(0, `rgba(240, 220, 120, ${s.alpha})`);
    grad.addColorStop(1, 'rgba(240, 220, 120, 0)');

    ctx.beginPath();
    ctx.moveTo(s.x, s.y);
    ctx.lineTo(s.x - s.vx * (s.len / 10), s.y - s.vy * (s.len / 10));
    ctx.strokeStyle = grad;
    ctx.lineWidth   = 1.5;
    ctx.stroke();
  }

  // ── Main animation loop ──────────────────────────────────
  let lastTime = 0;

  function loop (timestamp) {
    const t = timestamp / 1000;  // seconds

    ctx.clearRect(0, 0, W, H);

    // Draw static stars with twinkle
    for (const star of stars) {
      drawStar(star, t);
    }

    // Possibly spawn a new shooting star
    if (
      shootingStars.length < CONFIG.maxShootingStars &&
      Math.random() < CONFIG.shootingStarFreq
    ) {
      shootingStars.push(createShootingStar());
    }

    // Update & draw shooting stars
    shootingStars = shootingStars.filter(s => s.alpha > 0);
    for (const s of shootingStars) {
      drawShootingStar(s);
      s.x     += s.vx;
      s.y     += s.vy;
      s.alpha -= s.fade;
    }

    requestAnimationFrame(loop);
  }

  // ── Bootstrap ────────────────────────────────────────────
  window.addEventListener('resize', resize);
  resize();
  requestAnimationFrame(loop);
})();
