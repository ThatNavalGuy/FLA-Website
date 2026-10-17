// Fade cards in as they scroll into view
const cards = document.querySelectorAll('.card');
if ('IntersectionObserver' in window) {
  const reveal = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        e.target.classList.add('show');
        reveal.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });
  cards.forEach((c, i) => {
    c.classList.add('reveal');
    c.style.transitionDelay = (i % 3) * 80 + 'ms';
    reveal.observe(c);
  });
}

// Highlight the nav link for the section you're viewing
const links = document.querySelectorAll('nav ul a');
const sections = [...links].map((a) => document.querySelector(a.getAttribute('href')));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      links.forEach((a) => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach((s) => s && spy.observe(s));
