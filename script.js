// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Fecha menu ao clicar em link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(13, 13, 13, 0.98)';
  } else {
    navbar.style.background = 'rgba(13, 13, 13, 0.92)';
  }
});

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.turma-card, .conquista-item, .galeria-item, .sobre-img, .sobre-texto').forEach(el => {
  el.classList.add('fade-in');
  observer.observe(el);
});

// ===== CSS ANIMATIONS via JS =====
const style = document.createElement('style');
style.textContent = `
  .fade-in {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);

// ===== FORM SUBMIT =====
const form = document.querySelector('.contato-form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const nome = form.querySelector('input[type="text"]').value;
  const telefone = form.querySelector('input[type="tel"]').value;
  const turma = form.querySelector('select').value;
  const mensagem = form.querySelector('textarea').value;

  const texto = `Olá! Meu nome é ${nome} e tenho interesse na turma: *${turma}*. ${mensagem ? 'Mensagem: ' + mensagem : ''}`;
  const url = `https://wa.me/55?text=${encodeURIComponent(texto)}`;
  window.open(url, '_blank');
});

// ===== STAT COUNTER ANIMATION =====
function animateCounter(el, target, prefix = '', suffix = '') {
  let current = 0;
  const increment = target / 60;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + Math.floor(current) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const numbers = entry.target.querySelectorAll('.stat-number');
      numbers.forEach(n => {
        const text = n.textContent;
        if (text.includes('+100')) animateCounter(n, 100, '+', '');
        else if (text.includes('2021')) animateCounter(n, 2021);
        else if (text.includes('4+')) { n.textContent = '4+'; }
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);
