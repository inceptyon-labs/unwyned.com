/* ============================================
   Scroll-Triggered Animations
   ============================================ */

(function() {
  'use strict';

  // Feature detection for IntersectionObserver
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all elements immediately for older browsers
    document.querySelectorAll('.card, .feature-item, .footer-section').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Check for reduced motion preference with reactive listener
  var motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

  function showAllElements() {
    document.querySelectorAll('.card, .feature-item, .footer-section').forEach(function(el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('animate-in');
    });
  }

  // Handle reduced motion preference changes
  function handleReducedMotion(e) {
    if (e.matches) {
      showAllElements();
      if (fadeInObserver) {
        fadeInObserver.disconnect();
      }
    }
  }

  // Listen for preference changes during session
  motionQuery.addEventListener('change', handleReducedMotion);

  // Initial check for reduced motion
  if (motionQuery.matches) {
    showAllElements();
    return;
  }

  // Intersection Observer configuration
  var observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  // Create the fade-in observer
  var fadeInObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        fadeInObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Initialize animations when DOM is ready
  function initScrollAnimations() {
    // Elements to animate on scroll
    var animatedElements = document.querySelectorAll('.card, .feature-item, .footer-section');

    animatedElements.forEach(function(el) {
      el.classList.add('animate-on-scroll');

      // Add staggered delay for grid items
      if (el.parentElement && el.parentElement.classList.contains('grid')) {
        var siblings = Array.from(el.parentElement.children);
        var siblingIndex = siblings.indexOf(el);
        el.style.transitionDelay = siblingIndex * 100 + 'ms';
      }

      fadeInObserver.observe(el);
    });
  }

  // Run when DOM is loaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
