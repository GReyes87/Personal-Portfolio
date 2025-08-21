// Theme toggle with persistence
(function(){
  const root = document.documentElement;
  const saved = localStorage.getItem('theme');
  if(saved === 'light'){ root.classList.add('light'); }
})();

document.getElementById('themeToggle').addEventListener('click', () => {
  const root = document.documentElement;
  const isLight = root.classList.toggle('light');
  localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

// Mobile nav
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.getElementById('nav-menu');
navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  navMenu.classList.toggle('open');
});

// Project filters
const chips = document.querySelectorAll('.chip');
const projects = document.querySelectorAll('.project');
chips.forEach(ch => ch.addEventListener('click', () => {
  chips.forEach(c => c.classList.remove('is-active'));
  ch.classList.add('is-active');
  const filter = ch.dataset.filter;
  projects.forEach(p => {
    const tags = p.getAttribute('data-tags') || '';
    const show = filter === 'all' || tags.includes(filter);
    p.style.display = show ? '' : 'none';
  });
}));

// Scroll reveal (IntersectionObserver)
const revealTargets = document.querySelectorAll('.card, .hero, .timeline, .section h2');
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!prefersReduced && 'IntersectionObserver' in window){
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.animate([{opacity:0, transform:'translateY(8px)'},{opacity:1, transform:'translateY(0)'}], {duration:450, easing:'ease-out'});
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});
  revealTargets.forEach(el => io.observe(el));
}

// Year
document.getElementById('year').textContent = new Date().getFullYear();
