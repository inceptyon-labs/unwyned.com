/**
 * Navigation menu interactions
 */

class Navigation {
  constructor() {
    this.toggle = document.querySelector('.navbar-toggle');
    this.menu = document.querySelector('.navbar-menu');
    this.menuLinks = document.querySelectorAll('.navbar-menu a');

    this.init();
  }

  init() {
    // Mobile menu toggle
    if (this.toggle && this.menu) {
      this.toggle.addEventListener('click', () => this.toggleMenu());
    }

    // Close menu when clicking a link
    this.menuLinks.forEach(link => {
      link.addEventListener('click', () => this.closeMenu());
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.navbar-container')) {
        this.closeMenu();
      }
    });

    // Handle scroll behavior
    this.handleScroll();
    window.addEventListener('scroll', () => this.handleScroll());

    // Set active link based on current page
    this.setActiveLink();
  }

  toggleMenu() {
    this.menu.classList.toggle('active');
    this.toggle.classList.toggle('active');
  }

  closeMenu() {
    this.menu.classList.remove('active');
    this.toggle.classList.remove('active');
  }

  handleScroll() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  setActiveLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    this.menuLinks.forEach(link => {
      const linkPage = link.getAttribute('href');
      if (linkPage === currentPage ||
          (currentPage === '' && linkPage === 'index.html')) {
        link.classList.add('active');
      }
    });
  }
}

// Initialize navigation when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new Navigation();
  });
} else {
  new Navigation();
}
