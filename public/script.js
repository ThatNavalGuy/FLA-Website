// Fill in logos from images.js (hides any image with no data)
document.querySelectorAll('img[data-img]').forEach((img) => {
  const url = (window.IMAGES || {})[img.dataset.img];
  if (url) img.src = url; else img.hidden = true;
});
const icon = document.querySelector('link[rel="icon"]');
if (icon && window.IMAGES && window.IMAGES.fla) icon.href = window.IMAGES.fla;

// Rise in from the bottom as things appear on screen
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduce) {
  const targets = document.querySelectorAll(
    '.hero > *, section > h2, section > .lead, section > p, .card, .cta > *, footer > *'
  );
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      const el = e.target;
      io.unobserve(el);
      el.classList.add('in');
      // Clean up when finished so hover effects work normally
      el.addEventListener('animationend', () => {
        el.classList.remove('reveal', 'in');
        el.style.animationDelay = '';
      }, { once: true });
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  const seen = new Map();
  targets.forEach((el) => {
    const n = seen.get(el.parentElement) || 0;
    seen.set(el.parentElement, n + 1);
    el.style.animationDelay = Math.min(n * 80, 320) + 'ms';
    el.classList.add('reveal');
    io.observe(el);
  });
}

// Ownership message bubble
const msg = document.getElementById('msg');
const msgBtn = document.getElementById('msgBtn');
const msgPanel = document.getElementById('msgPanel');
const setMsg = (open) => {
  msg.classList.toggle('open', open);
  msgBtn.setAttribute('aria-expanded', open);
  msgPanel.setAttribute('aria-hidden', !open);
};
msgBtn.addEventListener('click', () => setMsg(!msg.classList.contains('open')));
document.getElementById('msgClose').addEventListener('click', () => setMsg(false));
document.addEventListener('click', (e) => { if (!msg.contains(e.target)) setMsg(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMsg(false); });
