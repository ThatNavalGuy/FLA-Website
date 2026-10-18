// Fill in logos from images.js (hides any image with no data)
document.querySelectorAll('img[data-img]').forEach((img) => {
  const url = (window.IMAGES || {})[img.dataset.img];
  if (url) img.src = url; else img.hidden = true;
});
const icon = document.querySelector('link[rel="icon"]');
if (icon && window.IMAGES && window.IMAGES.fla) icon.href = window.IMAGES.fla;

// Slide things in from the left as they appear on screen
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduce) {
  const targets = document.querySelectorAll(
    '.hero > *, section > h2, section > .lead, section > p, .card, .cta > *, footer > *'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      el.classList.add('in');
      io.unobserve(el);
      // Remove animation classes afterwards so hover effects work normally
      const wait = parseFloat(el.style.transitionDelay) || 0;
      setTimeout(() => {
        el.classList.remove('reveal', 'in');
        el.style.transitionDelay = '';
      }, 800 + wait);
    });
  }, { threshold: 0.12 });

  const seen = new Map();
  targets.forEach((el) => {
    const n = seen.get(el.parentElement) || 0;
    seen.set(el.parentElement, n + 1);
    el.style.transitionDelay = Math.min(n * 90, 360) + 'ms';
    el.classList.add('reveal');
    io.observe(el);
  });
}
