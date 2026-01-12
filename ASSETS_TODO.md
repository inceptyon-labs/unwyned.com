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

**Status**: ✅ COMPLETE

- [x] Convert SVG to PNG format (126 KB)
- [x] Optimized file size
- [ ] Test on social media preview tools (optional)

#### 2. Favicon Set
**Files**: `assets/images/favicon.svg` + individual sizes

**Status**: ✅ COMPLETE

Generated using ImageMagick:
- [x] favicon.ico (3.6 KB at root)
- [x] android-chrome-192x192.png (6.5 KB)
- [x] android-chrome-512x512.png (37 KB)
- [x] mstile-150x150.png (5.2 KB)
- [x] favicon-16x16.png (931 B)
- [x] favicon-32x32.png (1.3 KB)
- [x] apple-touch-icon.png (6.3 KB)
- [x] Update manifest.json with icon references
- [ ] Test favicon on multiple browsers (optional)

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

✅ **ALL IMAGE ASSETS COMPLETE**

Before going public:
- [x] og-image.png is created and at `assets/images/og-image.png` (126 KB)
- [x] favicon.ico exists at root
- [x] All favicon sizes exist (16x16, 32x32, 180x180, 192x192, 512x512)
- [x] Images are optimized (~180 KB total for all new assets)
- [ ] Test social sharing on Facebook/Twitter (use [Share Debugger](https://developers.facebook.com/tools/debug/sharing/)) - optional
- [ ] Test favicon appearance across browsers - optional
- [x] manifest.json references correct icon paths
