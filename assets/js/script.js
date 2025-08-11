'use strict';

/**
 * header
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

window.addEventListener("scroll", function () {
  if (header && backTopBtn) {
    if (window.scrollY >= 100) {
      header.classList.add("active");
      backTopBtn.classList.add("active");
    } else {
      header.classList.remove("active");
      backTopBtn.classList.remove("active");
    }
  }
});

// Limiter animations vidéos
const opts = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!opts) {
  const videos = document.querySelectorAll('video');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{
      if (e.isIntersecting) e.target.play(); else e.target.pause();
    });
  }, {rootMargin: '200px'});
  videos.forEach(v=>io.observe(v));
}

document.addEventListener('DOMContentLoaded', function () {
  const floatingHamburger = document.getElementById('floatingHamburger');
  const navbar = document.querySelector('[data-navbar]');
  const menuIcon = floatingHamburger.querySelector('.menu-icon');
  const closeIcon = floatingHamburger.querySelector('.close-icon');
  const navLinks = navbar.querySelectorAll('.navbar-link');

  function toggleMenu() {
    navbar.classList.toggle('active');
    floatingHamburger.classList.toggle('active');
    if (navbar.classList.contains('active')) {
      menuIcon.style.display = 'none';
      closeIcon.style.display = 'block';
    } else {
      menuIcon.style.display = 'block';
      closeIcon.style.display = 'none';
    }
  }

  floatingHamburger.addEventListener('click', function (e) {
    e.preventDefault();
    toggleMenu();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', function () {
      if (navbar.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
});





const hamburger = document.getElementById('floatingHamburger');
const nav = document.getElementById('main-navigation');
const menuIcon = hamburger.querySelector('.menu-icon');
const closeIcon = hamburger.querySelector('.close-icon');
const navLinks = nav.querySelectorAll('a[data-nav-link]');

function openMenu() {
  nav.removeAttribute('aria-hidden');
  nav.removeAttribute('tabindex');
  hamburger.setAttribute('aria-expanded', 'true');
  menuIcon.hidden = true;
  closeIcon.hidden = false;
  // Focus sur le premier lien du menu
  if (navLinks.length) navLinks[0].focus();
}

function closeMenu() {
  nav.setAttribute('aria-hidden', 'true');
  nav.setAttribute('tabindex', '-1');
  hamburger.setAttribute('aria-expanded', 'false');
  menuIcon.hidden = false;
  closeIcon.hidden = true;
  hamburger.focus();
}

hamburger.addEventListener('click', () => {
  const expanded = hamburger.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    closeMenu();
  } else {
    openMenu();
  }
});

// Accessibilité clavier (Entrée/Espace)
hamburger.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    hamburger.click();
  }
});

// Fermer le menu avec Echap
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && hamburger.getAttribute('aria-expanded') === 'true') {
    closeMenu();
  }
});

// Gestion du focus cyclique dans le menu mobile
function trapFocus(e) {
  if (nav.getAttribute('aria-hidden') === 'true') return;

  const focusable = [hamburger, ...navLinks];
  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (e.key === 'Tab') {
    if (e.shiftKey) {
      // Shift+Tab sur le bouton hamburger => focus sur le dernier lien
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab sur le dernier lien => focus sur le bouton hamburger
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }
}

nav.addEventListener('keydown', trapFocus);
hamburger.addEventListener('keydown', trapFocus);