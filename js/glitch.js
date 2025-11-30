/**
 * The Glitch - Unwyned Front to Racket Reality
 * Reveals the true nature of the app through VHS-style corruption
 */

class GlitchReveal {
  constructor() {
    this.frontScreen = document.getElementById('unwyned-front');
    this.racketScreen = document.getElementById('racket-reality');
    this.triggerDelay = 2000; // 2 seconds
    this.hasGlitched = false;

    // Check if user has already seen the glitch
    this.skipGlitch = sessionStorage.getItem('glitchSeen') === 'true';

    this.init();
  }

  init() {
    if (this.skipGlitch) {
      // Skip directly to The Racket
      this.showRacket();
    } else {
      // Show Unwyned front, then glitch after delay
      this.showFront();
      setTimeout(() => this.triggerGlitch(), this.triggerDelay);
    }
  }

  showFront() {
    if (this.frontScreen) {
      this.frontScreen.style.display = 'flex';
    }
    if (this.racketScreen) {
      this.racketScreen.style.display = 'none';
    }
  }

  showRacket() {
    if (this.frontScreen) {
      this.frontScreen.style.display = 'none';
    }
    if (this.racketScreen) {
      this.racketScreen.style.display = 'block';
    }
  }

  triggerGlitch() {
    if (this.hasGlitched || !this.frontScreen) return;

    this.hasGlitched = true;

    // Add glitch class to front screen
    this.frontScreen.classList.add('glitching');

    // Trigger haptic feedback if supported
    if (navigator.vibrate) {
      navigator.vibrate([100, 50, 100]);
    }

    // Play glitch sound if available
    const glitchSound = document.getElementById('glitch-sound');
    if (glitchSound) {
      glitchSound.play().catch(() => {
        // Autoplay might be blocked, ignore
      });
    }

    // Sequence of glitch effects
    setTimeout(() => {
      this.frontScreen.classList.add('glitch-intense');
    }, 300);

    setTimeout(() => {
      this.frontScreen.classList.add('burn-out');
    }, 800);

    // Reveal The Racket
    setTimeout(() => {
      this.showRacket();
      this.racketScreen.classList.add('reveal');

      // Remember that user has seen the glitch
      sessionStorage.setItem('glitchSeen', 'true');
    }, 1200);
  }
}

// Manual trigger for testing or button click
function forceGlitch() {
  const glitch = new GlitchReveal();
  glitch.skipGlitch = false;
  glitch.triggerGlitch();
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new GlitchReveal();
  });
} else {
  new GlitchReveal();
}
