// js/script.js

// Toggle mobile menu
const hamburger = document.getElementById('hamburger');
const nav = document.getElementById('nav');
hamburger.addEventListener('click', () => {
  nav.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Load projects dynamically
fetch('data/projects.json')
  .then(res => res.json())
  .then(data => {
    const container = document.getElementById('projects');
    data.forEach((p, i) => {
      const a = document.createElement('a');
      a.href = `project.html?idx=${i}`;
      a.className = 'project-card';
      a.innerHTML = `
        <img src="${p.thumbnail}" alt="${p.title} loading="lazy"">
        <h2>${p.title}</h2>
      `;
      container.appendChild(a);
    });
    initReveal();
  });

// Intersection Observer for reveal animations
function initReveal() {
  const cards = document.querySelectorAll('.project-card');
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  cards.forEach(c => obs.observe(c));
}

// Smooth scrolling for in-page links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
  });
});