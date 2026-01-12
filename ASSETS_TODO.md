# Assets TODO - Final Production Preparation

This document tracks image assets that should be finalized before production deployment.

## Status

### ✅ Completed
- [x] SECURITY.md - Vulnerability reporting guidelines added
- [x] og-image.svg - Open Graph placeholder created (1200x630)
- [x] favicon.svg - Favicon placeholder created (64x64)
- [x] License file (LICENSE.md)

### ⏳ Needs Final Production Assets

These placeholder SVG assets should be converted to optimized image formats for production:

#### 1. Open Graph Image
**File**: `assets/images/og-image.svg` → `og-image.png`

**Current**: SVG placeholder with Unwyned branding
**Action**: Convert to PNG (1200x630) and optimize

**Why**: Better compatibility with social media platforms (Facebook, Twitter, LinkedIn)

- [ ] Convert SVG to PNG format
- [ ] Optimize file size (target: <100KB)
- [ ] Test on social media preview tools

#### 2. Favicon Set
**Files**: `assets/images/favicon.svg` + individual sizes

**Current**: SVG placeholder + existing favicon PNG files (16x16, 32x32, 180x180)

**Missing**:
- `favicon.ico` - Standard favicon for older browsers
- `android-chrome-192x192.png` - Android home screen icon
- `android-chrome-512x512.png` - Android splash screen
- `mstile-150x150.png` - Windows tile icon

**Action**: Generate complete favicon set from SVG

**Tools**:
- [Favicon Generator](https://realfavicongenerator.net/) - Generates all required sizes
- [Favicons.js](https://github.com/evilebottnawi/favicons) - Automated favicon generation
- [ImageMagick](https://imagemagick.org/) - Manual conversion via CLI

**Steps**:
```bash
# Option 1: Use Real Favicon Generator (GUI)
# Upload assets/images/logo-racket.png or favicon.svg
# Download complete favicon package
# Replace all files in assets/images/

# Option 2: Use favicons CLI
npm install -g favicons
favicons assets/images/favicon.svg --output assets/images/
```

- [ ] Generate favicon.ico
- [ ] Generate android-chrome-192x192.png
- [ ] Generate android-chrome-512x512.png
- [ ] Generate mstile-150x150.png
- [ ] Update manifest.json with icon references
- [ ] Test favicon on multiple browsers

#### 3. App Screenshots (Optional but Recommended)
**Location**: `assets/images/screenshots/`

**For App Store listings**:
- iOS: 1284x2778 (6.7" screen) or 1170x2532 (6.1" screen)
- Android: 1440x3120 or 1080x1920

These are used for the app store listings, not the website.

- [ ] Create app screenshots
- [ ] Store in `/assets/images/screenshots/` subdirectory

---

## How to Complete

### Quick Option: Favicon Generator Website
1. Visit [realfavicongenerator.net](https://realfavicongenerator.net/)
2. Upload `assets/images/logo-racket.png` (or favicon.svg)
3. Select "Flat square logo" or similar option
4. Generate the favicon package
5. Download and extract to `assets/images/`
6. Update `manifest.json` if needed

### DIY Option: ImageMagick + Manual Conversion
```bash
# Convert SVG to PNG (requires ImageMagick with librsvg)
convert -density 600 -resize 1200x630 assets/images/og-image.svg assets/images/og-image.png
convert -density 600 -resize 512x512 assets/images/favicon.svg assets/images/android-chrome-512x512.png
convert -density 600 -resize 192x192 assets/images/favicon.svg assets/images/android-chrome-192x192.png

# Create ICO file from PNG
convert assets/images/favicon-32x32.png -define icon:auto-resize=32,16 favicon.ico
```

---

## Notes

- SVG placeholders are production-ready and will work in modern browsers
- PNG conversion ensures better compatibility with older browsers and social platforms
- favicon.ico is primarily for backwards compatibility (modern browsers prefer PNG)
- All images should be optimized for web (consider WebP format for future)
- Keep file sizes minimal for faster page loads

---

## Deployment Checklist

Before going public:
- [ ] og-image.png is created and at `assets/images/og-image.png`
- [ ] favicon.ico exists at root or `assets/images/`
- [ ] All favicon sizes exist (16x16, 32x32, 180x180, 192x192, 512x512)
- [ ] Images are optimized and <500KB total
- [ ] Test social sharing on Facebook/Twitter (use [Share Debugger](https://developers.facebook.com/tools/debug/sharing/))
- [ ] Test favicon appearance across browsers
- [ ] manifest.json references correct icon paths
