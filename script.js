const menuBtn = document.getElementById('menuBtn');
const nav = document.getElementById('nav');

if (menuBtn && nav) {
  menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

const registerLink = document.getElementById('registerLink');
if (registerLink) {
  registerLink.addEventListener('click', (event) => {
    if (registerLink.getAttribute('href') === '#') {
      event.preventDefault();
      alert('Agrega aquí el enlace de tu formulario de registro.');
    }
  });
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav a[href^="#"]')];

window.addEventListener('scroll', () => {
  const y = window.scrollY + 160;
  let active = 'inicio';
  sections.forEach((section) => {
    if (section.offsetTop <= y) active = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${active}`);
  });
}, { passive: true });
