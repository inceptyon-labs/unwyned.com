# Deployment Guide - Unwyned Website

## Quick Start

The Unwyned landing page is ready to deploy to Cloudflare Pages. This is a **static site** with no build process required.

## Pre-Deployment Checklist

### Required Updates

Before deploying, update these placeholders in the HTML files:

1. **Privacy Policy** (`privacy.html`):
   - Line 233: Replace `[Your Address]` with actual company address
   - Or remove the mail contact line if not needed

2. **Terms & Conditions** (`terms.html`):
   - Line 192: Replace `[Your State]` with your state (e.g., "Delaware")
   - Line 234: Replace `[Your Address]` with actual company address

3. **App Store Links** (`index.html`):
   - Lines 187-190: Update with actual App Store URLs when available
   - Current placeholders:
     ```html
     https://apps.apple.com/app/unwyned
     https://play.google.com/store/apps/details?id=com.unwyned.unwyned
     ```

### Optional Enhancements

Add these files to `/assets/images/` before deploying:

- **App screenshots** (6 images for carousel)
- **Favicon set**:
  - `favicon.ico` (16x16, 32x32)
  - `apple-touch-icon.png` (180x180)
  - `android-chrome-512x512.png` (512x512)
- **Open Graph image** (`og-image.png`, 1200x630) for social sharing
- **Logo files** (SVG or PNG for The Racket logo)

## Deployment Options

### Option 1: Cloudflare Pages (Git Integration) - Recommended

1. **Create Git Repository**
   ```bash
   cd ~/Development/Unwyned-Website
   git init
   git add .
   git commit -m "Initial commit - Unwyned landing page"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Navigate to **Pages** → **Create a project**
   - Click **Connect to Git**
   - Select your repository
   - **Configuration**:
     - **Project name**: `unwyned` (or your choice)
     - **Production branch**: `main`
     - **Framework preset**: None
     - **Build command**: *(leave empty)*
     - **Build output directory**: `/`
   - Click **Save and Deploy**

3. **Automatic Deployments**
   - Every push to `main` triggers a new deployment
   - Preview deployments created for pull requests
   - Rollback available in dashboard

### Option 2: Direct Upload (Wrangler CLI)

1. **Install Wrangler**
   ```bash
   npm install -g wrangler
   # or
   brew install cloudflare/cloudflare/wrangler
   ```

2. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

3. **Deploy**
   ```bash
   cd ~/Development/Unwyned-Website
   wrangler pages deploy . --project-name=unwyned
   ```

4. **Manual Updates**
   - Run the deploy command again to update
   - No automatic deployments with this method

## Custom Domain Setup

### If Domain is on Cloudflare

1. In Cloudflare Pages project:
   - Go to **Custom domains** tab
   - Click **Set up a custom domain**
   - Enter `unwyned.com`
   - Cloudflare automatically creates DNS records

2. Add www subdomain:
   - Click **Set up a custom domain** again
   - Enter `www.unwyned.com`
   - Cloudflare handles redirect (configured in `_redirects`)

### If Domain is Elsewhere

1. Get Cloudflare Pages deployment URL (e.g., `unwyned.pages.dev`)
2. Create CNAME record at your DNS provider:
   ```
   unwyned.com → unwyned.pages.dev
   ```
3. In Cloudflare Pages:
   - Add `unwyned.com` as custom domain
   - Verify ownership via TXT record

## Environment Setup (If Needed Later)

Cloudflare Pages supports environment variables for dynamic features:

```bash
wrangler pages secret put API_KEY
```

Or in dashboard: **Settings** → **Environment variables**

## Post-Deployment Verification

### Check These URLs

- ✅ `https://unwyned.com/` - Homepage with glitch reveal
- ✅ `https://unwyned.com/algorithm.html` - Algorithm docs
- ✅ `https://unwyned.com/privacy.html` - Privacy policy
- ✅ `https://unwyned.com/terms.html` - Terms & conditions
- ✅ `https://www.unwyned.com/` - Redirects to non-www
- ✅ `http://unwyned.com/` - Redirects to HTTPS

### Test Glitch Animation

1. Visit homepage
2. Wait 2 seconds - should see glitch transition from "unwyned" to "The Racket"
3. Refresh page - should skip directly to "The Racket" (uses sessionStorage)
4. Open in incognito - glitch plays again

### Test Mobile Menu

1. Resize browser to mobile width (<768px)
2. Click hamburger menu (three lines)
3. Menu should slide down
4. Click a link - menu should close

### Test Security Headers

```bash
curl -I https://unwyned.com/
```

Should see:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Content-Security-Policy: ...`
- `Strict-Transport-Security: ...` (added by Cloudflare)

## Performance Optimization

Cloudflare Pages automatically handles:
- **Brotli/Gzip compression** for HTML/CSS/JS
- **HTTP/2 and HTTP/3** support
- **Global CDN** edge caching
- **DDoS protection** included

### Manual Optimizations (Optional)

1. **Minify CSS/JS** (if you want to manually optimize):
   ```bash
   # Install terser and csso-cli
   npm install -g terser csso-cli

   # Minify
   terser js/glitch.js -o js/glitch.min.js
   terser js/nav.js -o js/nav.min.js
   csso css/main.css -o css/main.min.css
   csso css/components.css -o css/components.min.css
   csso css/glitch.css -o css/glitch.min.css

   # Update HTML to reference .min files
   ```

2. **Image Optimization**:
   - Use WebP format for photos
   - Use SVG for logos/icons
   - Compress with tools like ImageOptim, Squoosh, or tinypng

## Monitoring & Analytics

### Cloudflare Web Analytics (Privacy-Friendly)

1. In Cloudflare dashboard:
   - Go to **Web Analytics**
   - Add site: `unwyned.com`
   - Copy tracking code snippet

2. Add to `<head>` of all HTML pages:
   ```html
   <script defer src='https://static.cloudflareinsights.com/beacon.min.js'
           data-cf-beacon='{"token": "YOUR_TOKEN"}'></script>
   ```

### Google Analytics (Optional)

Only if you need detailed analytics. Add to `<head>`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

Update CSP in `_headers` to allow GA:
```
script-src 'self' 'unsafe-inline' https://www.googletagmanager.com;
```

## Troubleshooting

### Glitch animation not working

- Check browser console for errors
- Verify `glitch.js` is loading
- Check if `prefers-reduced-motion` is enabled in OS

### Mobile menu not opening

- Verify `nav.js` is loading
- Check browser console for JS errors
- Test in different browsers

### Custom domain not working

- DNS propagation can take 24-48 hours
- Use [DNS Checker](https://dnschecker.org) to verify records
- Check Cloudflare DNS settings

### Fonts not loading

- Verify Google Fonts CDN is accessible
- Check CSP `font-src` directive in `_headers`
- Ensure network allows CORS requests

## Rollback

If something breaks after deployment:

### Cloudflare Pages Dashboard

1. Go to **Deployments** tab
2. Find previous working deployment
3. Click **...** → **Rollback to this deployment**

### Git-based Deployment

```bash
git revert HEAD
git push origin main
```

## Support

- **Cloudflare Docs**: https://developers.cloudflare.com/pages/
- **Cloudflare Community**: https://community.cloudflare.com/
- **Project Issues**: Create an issue in your Git repo

## Next Steps

After successful deployment:

1. ✅ Test all pages on real devices (iOS, Android)
2. ✅ Submit URLs to Google Search Console
3. ✅ Set up monitoring/alerts
4. ✅ Create social media preview cards (Open Graph)
5. ✅ Add app store badges once apps are live

---

**Ready to deploy!** Follow Option 1 (Git integration) for the best experience.
