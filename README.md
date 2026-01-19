<p align="center">
  <img src="assets/images/logo-fullword-orange.png" alt="Unwyned Logo" width="400">
</p>

<p align="center">
  <strong>Wine recommendations without the snobbery.</strong><br>
  Point your camera at any wine menu. Get personalized picks. No sommelier required.
</p>

<p align="center">
  <a href="https://unwyned.com">Website</a> •
  <a href="https://apps.apple.com/app/unwyned/id6755911748">Download for iOS</a> •
  <a href="https://play.google.com/store/apps/details?id=com.unwyned.unwyned">Download for Android</a>
</p>

---

# Unwyned Landing Page

> "Unwyned is the front. The Racket is the operation."

Landing page for the Unwyned mobile app - a wine discovery app with an Industrial Noir aesthetic and anti-snob attitude.

## Features

- **Glitch Reveal Animation**: Corporate "Unwyned" facade transitions to "The Racket" reality
- **Industrial Noir Design**: Asphalt & Brick color palette, tough-love copy, 1920s Prohibition aesthetic
- **Fully Responsive**: Mobile-first design with hamburger menu
- **Multi-Page**: Homepage, Algorithm Documentation, Privacy Policy, Terms & Conditions
- **Privacy-First**: No tracking, minimal analytics, security headers
- **Cloudflare Pages Ready**: Optimized for deployment with headers and redirects

## Tech Stack

- **Pure HTML/CSS/JS**: No build step required
- **Google Fonts**: Oswald (headers), Roboto (body), Barlow (data)
- **Vanilla JavaScript**: Glitch animation and navigation
- **Cloudflare Pages**: Static hosting with edge optimization

## Project Structure

```
Unwyned-Website/
├── index.html              # Homepage with glitch reveal
├── algorithm.html          # How It Works (The Intel - simplified)
├── architecture.html       # The Architecture of Taste (full technical spec)
├── privacy.html            # Privacy Policy
├── terms.html              # Terms & Conditions
├── css/
│   ├── main.css           # Design system (colors, typography, utilities)
│   ├── components.css     # UI components (buttons, cards, nav, footer)
│   └── glitch.css         # Glitch reveal animation styles
├── js/
│   ├── glitch.js          # Glitch reveal logic
│   └── nav.js             # Navigation menu interactions
├── assets/
│   └── images/            # Screenshots, icons, textures (to be added)
├── _headers               # Cloudflare Pages security headers
├── _redirects             # Cloudflare Pages redirect rules
└── README.md              # This file
```

## Color Palette

### Industrial Safety (Foundation)
- **Matte Black** (`#131618`) - Global background
- **Safety Orange** (`#FF5F15`) - Primary actions, CTAs
- **Machined Steel** (`#B0C4DE`) - Body text, icons
- **Lockout Red** (`#CF6679`) - Errors, warnings
- **Signal Green** (`#00E676`) - Success states

### Asphalt & Brick (Brand Accents)
- **Wet Asphalt** (`#0D0C0C`) - Alternative backgrounds
- **Rusted I-Beam** (`#784F1C`) - Secondary buttons, dividers
- **Dried Blood** (`#7A0B0B`) - Harsh warnings, low ratings
- **Newsprint Grey** (`#D0C8C8`) - Low-emphasis text
- **Bruised Plum** (`#531C72`) - Accent highlights, badges
- **Gunmetal** (`#3D403C`) - Panels, containers

## Brand Voice

The copy follows "The Racket" brand guidelines:
- **Tough love, not snark**: Direct, helpful, no BS
- **No profanity**: Impact verbs instead (Grind, Hustle, Smash)
- **1990s nostalgia + 1920s Prohibition slang**: "The Intel," "Stash," "Street Value"
- **Anti-snob**: Wine recommendations without the pretension

## Development

### Local Preview

Simply open `index.html` in a browser, or use a local server:

```bash
# Python
python -m http.server 8000

# Node.js (http-server)
npx http-server

# PHP
php -S localhost:8000
```

Then visit `http://localhost:8000`

### File Size Guidelines

- Keep CSS/JS files under 50KB each
- Optimize images (WebP for photos, SVG for icons)
- Minify before production (optional, Cloudflare handles this)

## Deployment to Cloudflare Pages

### Option 1: Git Integration (Recommended)

1. Push this repo to GitHub/GitLab
2. In Cloudflare dashboard:
   - Go to **Pages** → **Create a project**
   - Connect your Git repo
   - **Build settings**:
     - Framework preset: **None**
     - Build command: *(leave empty)*
     - Build output directory: `/`
   - Deploy!

Cloudflare will automatically deploy on every push to main.

### Option 2: Direct Upload

```bash
# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy . --project-name=unwyned
```

### Custom Domain

In Cloudflare Pages project settings:
1. **Custom domains** → **Set up a custom domain**
2. Add `unwyned.com` and `www.unwyned.com`
3. Cloudflare handles DNS automatically if domain is on Cloudflare

## Security

Security headers are configured in `_headers`:
- CSP (Content Security Policy)
- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Strict HTTPS enforcement
- Permissions-Policy restrictions

## Performance

- **No external dependencies** (except Google Fonts)
- **Minimal JavaScript**: ~5KB total
- **CSS optimization**: Shared design system, scoped components
- **Cloudflare edge caching**: Static assets cached for 1 year
- **HTML revalidation**: Pages always fresh

## Browser Support

- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions (iOS 14+)
- **Glitch animation** gracefully degrades with `prefers-reduced-motion`

## License

Proprietary - All rights reserved by Inceptyon Labs LLC

## Contact

- **Support**: support@unwyned.com
- **Legal**: legal@unwyned.com
- **General**: hello@inceptyon.com

---

**Built with grit. No neon. No snobbery.**
