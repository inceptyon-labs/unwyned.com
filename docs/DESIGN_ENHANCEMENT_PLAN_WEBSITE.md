# Unwyned Website - Design Enhancement Implementation Plan

**Version:** 1.0
**Created:** 2026-01-02
**Status:** Ready for Implementation

---

## Executive Summary

This document outlines enhancements to elevate the Unwyned/The Racket marketing website from solid to exceptional. The focus is on premium polish, stronger visual impact, and tighter alignment with the app's Industrial Noir aesthetic.

**Estimated Total Effort:** 15-25 hours
**Recommended Timeline:** 1-2 weeks

---

## Current State Assessment

### Strengths
- ✓ Consistent Industrial Safety color palette
- ✓ Proper typography (Oswald, Roboto, Barlow)
- ✓ Glitch reveal animation working
- ✓ Responsive layout
- ✓ Good SEO foundation

### Opportunities
- Hero section lacks visual drama
- Cards are functional but generic
- No ambient glow effects (app has these)
- Missing industrial textures
- Feature icons are basic SVG (not matching app icons)
- No app screenshots or mockups
- Footer could be more impactful

---

## Phase 1: Visual Foundation Enhancements

### 1.1 CSS Variable Additions

**File:** `css/main.css`

```css
:root {
  /* Existing variables... */

  /* === NEW: Surface Depth Variants === */
  --color-true-black: #090909;
  --color-elevated-black: #1A1C1A;
  --color-raised-black: #222522;

  /* === NEW: Glow Colors === */
  --glow-orange: rgba(255, 95, 21, 0.15);
  --glow-orange-strong: rgba(255, 95, 21, 0.25);
  --glow-brass: rgba(188, 138, 79, 0.20);
  --glow-green: rgba(0, 230, 118, 0.15);

  /* === NEW: Industrial Gradients === */
  --gradient-metal: linear-gradient(
    135deg,
    var(--color-gunmetal) 0%,
    #2D302C 40%,
    var(--color-matte-black) 100%
  );

  --gradient-spotlight: radial-gradient(
    ellipse at center,
    var(--glow-orange) 0%,
    transparent 70%
  );
}
```

### 1.2 Industrial Texture Classes

**File:** `css/main.css` (additions)

```css
/* === Industrial Textures === */

/* Film grain overlay */
.grain-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.04;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
  pointer-events: none;
  z-index: 1;
}

/* Brushed metal effect */
.brushed-metal {
  background: var(--gradient-metal);
  background-image:
    var(--gradient-metal),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 1px,
      rgba(255, 255, 255, 0.02) 1px,
      rgba(255, 255, 255, 0.02) 2px
    );
}

/* Hazard stripe accent (for alerts/CTAs) */
.hazard-accent::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: repeating-linear-gradient(
    45deg,
    var(--color-safety-orange),
    var(--color-safety-orange) 10px,
    var(--color-matte-black) 10px,
    var(--color-matte-black) 20px
  );
}

/* Vignette effect */
.vignette::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at center,
    transparent 0%,
    transparent 50%,
    rgba(0, 0, 0, 0.4) 100%
  );
  pointer-events: none;
}

/* LED indicator styles */
.led {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--color-signal-green);
  box-shadow:
    0 0 8px var(--color-signal-green),
    0 0 16px rgba(0, 230, 118, 0.4);
}

.led--warning {
  background-color: var(--color-safety-orange);
  box-shadow:
    0 0 8px var(--color-safety-orange),
    0 0 16px rgba(255, 95, 21, 0.4);
}

.led--off {
  background-color: var(--color-gunmetal);
  box-shadow: none;
}
```

---

## Phase 2: Hero Section Redesign

### 2.1 Enhanced Hero Structure

**File:** `index.html` (hero section)

```html
<section class="hero grain-overlay vignette">
  <!-- Spotlight effect behind content -->
  <div class="hero-spotlight"></div>

  <!-- Animated background elements -->
  <div class="hero-bg-elements">
    <div class="hero-grid"></div>
    <div class="hero-scanline"></div>
  </div>

  <div class="hero-content">
    <!-- Status bar (command center feel) -->
    <div class="hero-status">
      <span class="led"></span>
      <span class="status-text">OPERATION ACTIVE</span>
    </div>

    <div class="hero-tagline">Welcome to the operation</div>
    <h1 class="hero-title glitch-text" data-text="Wine Recommendations Without the Snobbery">
      Wine Recommendations<br>Without the Snobbery
    </h1>
    <p class="hero-description">
      Point your camera at any wine menu and get instant, personalized recommendations.
      No sommelier required. No 100-point scales. No making you feel stupid.
    </p>

    <div class="btn-group" style="justify-content: center;">
      <a href="#download" class="btn btn-primary btn-large btn-glow">Get the App</a>
      <a href="algorithm.html" class="btn btn-outline btn-large">How It Works</a>
    </div>

    <!-- App mockup preview -->
    <div class="hero-mockup">
      <img src="assets/images/app-mockup.png" alt="Unwyned App" class="mockup-phone">
    </div>
  </div>
</section>
```

### 2.2 Hero CSS Enhancements

**File:** `css/components.css` (additions)

```css
/* === Enhanced Hero Section === */

.hero {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 50% 0%, rgba(255, 95, 21, 0.08) 0%, transparent 50%),
    linear-gradient(180deg, var(--color-matte-black) 0%, var(--color-wet-asphalt) 100%);
}

/* Spotlight behind main content */
.hero-spotlight {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    rgba(255, 95, 21, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
  z-index: 0;
}

/* Animated grid pattern */
.hero-grid {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image:
    linear-gradient(rgba(255, 95, 21, 0.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 95, 21, 0.03) 1px, transparent 1px);
  background-size: 50px 50px;
  animation: gridPulse 4s ease-in-out infinite;
  opacity: 0.5;
}

@keyframes gridPulse {
  0%, 100% { opacity: 0.3; }
  50% { opacity: 0.5; }
}

/* Horizontal scanline effect */
.hero-scanline {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--color-safety-orange) 50%,
    transparent 100%
  );
  opacity: 0.3;
  animation: scanlineMove 4s linear infinite;
}

@keyframes scanlineMove {
  0% { top: 0; }
  100% { top: 100%; }
}

/* Status indicator bar */
.hero-status {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-xs) var(--spacing-md);
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--color-gunmetal);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-lg);
}

.status-text {
  font-family: var(--font-data);
  font-size: 0.75rem;
  letter-spacing: 0.15em;
  color: var(--color-machined-steel);
}

/* Glitch text effect on hover */
.glitch-text {
  position: relative;
}

.glitch-text:hover::before,
.glitch-text:hover::after {
  content: attr(data-text);
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.glitch-text:hover::before {
  left: 2px;
  text-shadow: -2px 0 var(--color-lockout-red);
  clip-path: polygon(0 0, 100% 0, 100% 45%, 0 45%);
  animation: glitch-anim-1 0.4s infinite linear alternate-reverse;
}

.glitch-text:hover::after {
  left: -2px;
  text-shadow: 2px 0 var(--color-bruised-plum);
  clip-path: polygon(0 55%, 100% 55%, 100% 100%, 0 100%);
  animation: glitch-anim-2 0.4s infinite linear alternate-reverse;
}

@keyframes glitch-anim-1 {
  0% { clip-path: polygon(0 20%, 100% 20%, 100% 21%, 0 21%); }
  20% { clip-path: polygon(0 33%, 100% 33%, 100% 35%, 0 35%); }
  40% { clip-path: polygon(0 45%, 100% 45%, 100% 47%, 0 47%); }
  60% { clip-path: polygon(0 60%, 100% 60%, 100% 63%, 0 63%); }
  80% { clip-path: polygon(0 75%, 100% 75%, 100% 78%, 0 78%); }
  100% { clip-path: polygon(0 85%, 100% 85%, 100% 88%, 0 88%); }
}

/* Glowing button effect */
.btn-glow {
  position: relative;
  overflow: visible;
}

.btn-glow::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  background: var(--color-safety-orange);
  opacity: 0;
  filter: blur(20px);
  transition: opacity var(--transition-base);
  z-index: -1;
}

.btn-glow:hover::before {
  opacity: 0.3;
}

/* App mockup styling */
.hero-mockup {
  margin-top: var(--spacing-3xl);
  perspective: 1000px;
}

.mockup-phone {
  max-width: 280px;
  height: auto;
  border-radius: 24px;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    0 0 40px var(--glow-orange);
  transform: rotateY(-5deg) rotateX(5deg);
  transition: transform var(--transition-base);
}

.mockup-phone:hover {
  transform: rotateY(0deg) rotateX(0deg) translateY(-10px);
}
```

---

## Phase 3: Card & Component Enhancements

### 3.1 Enhanced Card Styles

**File:** `css/components.css` (modifications)

```css
/* === Enhanced Cards === */

.card {
  background: var(--gradient-metal);
  border: 1px solid var(--color-gunmetal);
  border-radius: var(--radius-md);
  padding: var(--spacing-xl);
  position: relative;
  overflow: hidden;
  transition: all var(--transition-base);
}

/* Beveled edge effect */
.card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(255, 255, 255, 0.1) 50%,
    transparent 100%
  );
}

/* Card glow on hover */
.card:hover {
  border-color: var(--color-safety-orange);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    0 0 20px var(--glow-orange);
}

/* Riveted card variant */
.card-riveted {
  position: relative;
}

.card-riveted::before {
  content: '';
  position: absolute;
  top: 8px;
  left: 8px;
  width: 6px;
  height: 6px;
  background: radial-gradient(
    circle at 30% 30%,
    var(--color-machined-steel) 0%,
    var(--color-gunmetal) 100%
  );
  border-radius: 50%;
  box-shadow:
    calc(100% - 22px) 0 0 var(--color-gunmetal),
    0 calc(100% - 22px) 0 var(--color-gunmetal),
    calc(100% - 22px) calc(100% - 22px) 0 var(--color-gunmetal);
}
```

### 3.2 Feature Icons Redesign

**Recommendation:** Replace inline SVG icons with new industrial-style PNG icons that match the app. For now, enhance the existing icons:

```css
/* === Enhanced Feature Icons === */

.feature-icon {
  width: 80px;
  height: 80px;
  margin: 0 auto var(--spacing-lg);
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-metal);
  border-radius: var(--radius-md);
  color: var(--color-safety-orange);
  font-size: 2.5rem;
  position: relative;
  overflow: hidden;

  /* Metallic edge highlight */
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.1),
    inset -1px -1px 0 rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.4);
}

/* Ambient glow on hover */
.feature-item:hover .feature-icon {
  box-shadow:
    inset 1px 1px 0 rgba(255, 255, 255, 0.1),
    inset -1px -1px 0 rgba(0, 0, 0, 0.3),
    0 4px 12px rgba(0, 0, 0, 0.4),
    0 0 20px var(--glow-orange);
}

/* Icon inner shine */
.feature-icon::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    135deg,
    transparent 40%,
    rgba(255, 255, 255, 0.05) 50%,
    transparent 60%
  );
  transform: rotate(45deg);
  transition: transform 0.6s ease;
}

.feature-item:hover .feature-icon::after {
  transform: rotate(45deg) translateX(100%);
}
```

---

## Phase 4: Download Section Enhancement

### 4.1 App Store Buttons with Glow

**File:** `index.html` (download section)

```html
<section id="download" class="section download-section">
  <div class="container text-center">
    <!-- Spotlight effect -->
    <div class="download-spotlight"></div>

    <h2 style="margin-bottom: var(--spacing-md);">Available Now</h2>
    <p class="download-subtitle">
      Whether you're at a steakhouse, a wine bar, or lost in the grocery store wine aisle—<br>
      Unwyned helps you find something good without the anxiety.
    </p>

    <div class="app-buttons">
      <a href="https://apps.apple.com/app/unwyned" class="app-button" target="_blank" rel="noopener">
        <img src="assets/images/app-store-badge.svg" alt="Download on the App Store">
      </a>
      <a href="https://play.google.com/store/apps/details?id=com.unwyned.unwyned" class="app-button" target="_blank" rel="noopener">
        <img src="assets/images/google-play-badge.svg" alt="Get it on Google Play">
      </a>
    </div>

    <p class="download-tagline">
      Relax. We'll find your next glass.
    </p>
  </div>
</section>
```

### 4.2 Download Section CSS

```css
/* === Download Section === */

.download-section {
  position: relative;
  overflow: hidden;
}

.download-spotlight {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 800px;
  height: 400px;
  background: radial-gradient(
    ellipse,
    rgba(255, 95, 21, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.download-subtitle {
  font-size: 1.25rem;
  color: var(--color-machined-steel);
  margin-bottom: var(--spacing-2xl);
  max-width: 700px;
  margin-left: auto;
  margin-right: auto;
}

.app-buttons {
  display: flex;
  gap: var(--spacing-lg);
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: var(--spacing-xl);
}

.app-button {
  transition: all var(--transition-base);
  border-radius: 8px;
  overflow: hidden;
}

.app-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4), 0 0 20px var(--glow-orange);
}

.app-button img {
  height: 54px;
  width: auto;
  display: block;
}

.download-tagline {
  color: var(--color-rusted-ibeam);
  font-family: var(--font-data);
  letter-spacing: 0.1em;
  font-size: 1.1rem;
}
```

---

## Phase 5: Footer Enhancement

### 5.1 Industrial Footer Design

```css
/* === Enhanced Footer === */

.footer {
  background:
    linear-gradient(180deg, var(--color-wet-asphalt) 0%, var(--color-true-black) 100%);
  border-top: 2px solid var(--color-gunmetal);
  position: relative;
}

/* Hazard stripe top border */
.footer::before {
  content: '';
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 4px;
  background: repeating-linear-gradient(
    90deg,
    var(--color-safety-orange) 0px,
    var(--color-safety-orange) 20px,
    transparent 20px,
    transparent 40px
  );
  opacity: 0.5;
}

.footer-section h4 {
  position: relative;
  padding-left: var(--spacing-md);
}

.footer-section h4::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 4px;
  height: 100%;
  background: var(--color-safety-orange);
  border-radius: 2px;
}

.footer-bottom {
  position: relative;
  background: rgba(0, 0, 0, 0.3);
  margin: 0 calc(-1 * var(--spacing-lg));
  padding: var(--spacing-lg);
}

/* Status indicators in footer */
.footer-status {
  display: flex;
  justify-content: center;
  gap: var(--spacing-xl);
  margin-bottom: var(--spacing-lg);
}

.footer-status-item {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  font-family: var(--font-data);
  font-size: 0.75rem;
  color: var(--color-machined-steel);
  letter-spacing: 0.1em;
}
```

---

## Phase 6: Performance & Polish

### 6.1 Scroll-Triggered Animations

**File:** `js/scroll-animations.js` (new)

```javascript
// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      fadeInObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply to elements
document.querySelectorAll('.card, .feature-item, .footer-section').forEach(el => {
  el.classList.add('animate-on-scroll');
  fadeInObserver.observe(el);
});
```

```css
/* Scroll animation styles */
.animate-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.animate-on-scroll.animate-in {
  opacity: 1;
  transform: translateY(0);
}

/* Staggered animation for grids */
.grid .animate-on-scroll:nth-child(1) { transition-delay: 0ms; }
.grid .animate-on-scroll:nth-child(2) { transition-delay: 100ms; }
.grid .animate-on-scroll:nth-child(3) { transition-delay: 200ms; }
```

### 6.2 Reduced Motion Support

```css
@media (prefers-reduced-motion: reduce) {
  .hero-scanline,
  .hero-grid,
  .glitch-text:hover::before,
  .glitch-text:hover::after {
    animation: none;
  }

  .animate-on-scroll {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
```

---

## Phase 7: New Assets Needed

### 7.1 Images to Create/Update

| Asset | Description | Priority |
|-------|-------------|----------|
| `app-mockup.png` | iPhone mockup showing app UI | HIGH |
| `app-store-badge.svg` | Official Apple badge | HIGH |
| `google-play-badge.svg` | Official Google badge | HIGH |
| `og-image-v2.png` | Updated Open Graph image | MEDIUM |
| `feature-scan.png` | Icon for scan feature | MEDIUM |
| `feature-rank.png` | Icon for ranking feature | MEDIUM |
| `feature-intel.png` | Icon for intel feature | MEDIUM |

### 7.2 Optional Enhancements

| Asset | Description | Priority |
|-------|-------------|----------|
| `hero-bg-texture.png` | Subtle industrial texture | LOW |
| `badge-showcase.png` | Montage of app badges | LOW |
| `workflow-animation.gif` | Animated scan → results flow | LOW |

---

## Implementation Checklist

### Week 1
- [ ] Add new CSS variables (1.1)
- [ ] Add texture classes (1.2)
- [ ] Redesign hero section (2.1, 2.2)
- [ ] Create app mockup image
- [ ] Get official app store badges

### Week 2
- [ ] Enhance cards (3.1)
- [ ] Update feature icons (3.2)
- [ ] Enhance download section (4.x)
- [ ] Enhance footer (5.x)
- [ ] Add scroll animations (6.1)
- [ ] Test reduced motion (6.2)
- [ ] Update Open Graph image

---

## Files to Create/Modify

### Modified Files
```
css/main.css
css/components.css
index.html
```

### New Files
```
js/scroll-animations.js
assets/images/app-mockup.png
assets/images/app-store-badge.svg
assets/images/google-play-badge.svg
```

---

## Success Metrics

1. **Visual Impact:** Hero immediately conveys premium industrial aesthetic
2. **Consistency:** Website matches app's Industrial Noir feel exactly
3. **Performance:** Lighthouse score > 90 on all metrics
4. **Conversion:** Download buttons prominent and compelling
5. **Mobile:** Excellent experience on all screen sizes
