/* ============================================================
   form.js — Contact form submission (Netlify Forms)
   ============================================================ */

(function () {
  const form       = document.getElementById('contact-form');
  const submitBtn  = document.getElementById('submit-btn');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  // ── Encode form data for Netlify ─────────────────────────
  function encode (data) {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&');
  }

  // ── Submit handler ───────────────────────────────────────
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Button loading state
    const originalText   = submitBtn.textContent;
    submitBtn.textContent = 'Launching… 🚀';
    submitBtn.disabled    = true;

    // Gather form values
    const formData = {
      'form-name': form.getAttribute('name'),
      name:        form.querySelector('#name').value,
      email:       form.querySelector('#email').value,
      business:    form.querySelector('#business').value,
      package:     form.querySelector('#package').value,
      message:     form.querySelector('#message').value,
    };

    try {
      const response = await fetch('/', {
        method:  'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body:    encode(formData),
      });

      if (response.ok) {
        // Success state
        successMsg.textContent = '✓ Message received! I\'ll be in touch within 24 hours.';
        form.reset();
      } else {
        throw new Error('Network response was not ok');
      }

    } catch (err) {
      // Error state
      successMsg.textContent = '✗ Something went wrong — please email me directly.';
      successMsg.style.color = '#f87171';
      console.error('Form submission error:', err);
    } finally {
      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled    = false;
    }
  });

})();
