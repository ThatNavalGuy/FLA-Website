// Fill in logos from images.js (hides any image with no data)
document.querySelectorAll('img[data-img]').forEach((img) => {
  const url = (window.IMAGES || {})[img.dataset.img];
  if (url) img.src = url; else img.hidden = true;
});
const icon = document.querySelector('link[rel="icon"]');
if (icon && window.IMAGES && window.IMAGES.fla) icon.href = window.IMAGES.fla;

// Mobile sidebar open/close
const side = document.getElementById('side');
const scrim = document.getElementById('scrim');
const setMenu = (open) => {
  side.classList.toggle('open', open);
  scrim.classList.toggle('show', open);
};
document.getElementById('burger').addEventListener('click', () => setMenu(!side.classList.contains('open')));
scrim.addEventListener('click', () => setMenu(false));
side.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setMenu(false)));

// Fade cards in as they scroll into view
const cards = document.querySelectorAll('.card, .feature, .pitch');
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        reveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  cards.forEach((c, i) => {
    c.classList.add('reveal');
    c.style.transitionDelay = (i % 3) * 80 + 'ms';
    reveal.observe(c);
  });
}

// Highlight the sidebar link for the section you're viewing
const links = [...document.querySelectorAll('.side nav a[href^="#"]')];
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
links.forEach((a) => {
  const s = document.querySelector(a.getAttribute('href'));
  if (s) spy.observe(s);
});
