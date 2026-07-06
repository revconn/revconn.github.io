var preloader = document.getElementById('preloader');
var siteWrapper = document.getElementById('site-wrapper');
window.addEventListener('load', function () {
    if (preloader) {
        preloader.style.display = 'none';
        siteWrapper.style.display = 'block';
    }
});

(function () {
  'use strict';

  /* ---------- Mobile nav toggle ---------- */
  var trigger = document.getElementById('menu-trigger');
  var nav = document.getElementById('main-nav');

  if (trigger && nav) {
    trigger.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      trigger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('open');
        trigger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('[data-reveal]');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- Sticky header shadow on scroll ---------- */
  var header = document.getElementById('site-header');
  var lastScroll = 0;
  window.addEventListener('scroll', function () {
    var y = window.scrollY || window.pageYOffset;
    if (header) {
      header.style.boxShadow = y > 8 ? '0 6px 20px rgba(11,42,74,0.08)' : 'none';
    }

    /* Back to top button */
    var toTop = document.getElementById('to-top');
    if (toTop) {
      toTop.classList.toggle('visible', y > 600);
    }
    lastScroll = y;
  }, { passive: true });

  /* ---------- Back to top ---------- */
  var toTopBtn = document.getElementById('to-top');
  if (toTopBtn) {
    toTopBtn.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---------- Close mobile nav on resize to desktop ---------- */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 760 && nav && nav.classList.contains('open')) {
      nav.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }
  });
})();

document.getElementById('revform').addEventListener('submit', submitForm);
function submitForm(e) {
  e.preventDefault();
  const name    = document.getElementById('rf-name').value.trim();
  const email   = document.getElementById('rf-email').value.trim();
  const msg     = document.getElementById('rf-message').value.trim();
  if (!name || !email || !msg) { alert('Please fill in the required fields.'); return; }

  const btn = document.querySelector('.form-submit');
  btn.disabled = true;
  btn.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         stroke-width="2.5" stroke-linecap="round"
         style="animation: spin .7s linear infinite; flex-shrink:0">
      <path d="M12 2a10 10 0 0 1 10 10"/>
    </svg>
    Sending…
  `;

  const form     = document.getElementById('revform');
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
    mode: 'no-cors'
  })
  .then(() => {
    document.getElementById('revform').style.display = 'none';
    document.getElementById('revform-success').style.display = 'block';
    form.reset();
  })
  .catch(() => {
    btn.disabled = false;
    btn.innerHTML = 'Send Message ✦';
    alert('Something went wrong. Please try again.');
  });
}
