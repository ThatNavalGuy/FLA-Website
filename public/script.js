// Fill in the logo from images.js
const logo = document.querySelector('img[data-img]');
const url = (window.IMAGES || {}).fla;
if (logo && url) {
  logo.src = url;
  document.querySelector('link[rel="icon"]').href = url;
} else if (logo) {
  logo.hidden = true;
}
