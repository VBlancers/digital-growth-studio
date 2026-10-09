# Digital Growth Studio — Website

A modern, premium, single-page landing website for a digital marketing and web development agency. Built with vanilla HTML, CSS, and JavaScript — no build tools required.

## Quick Start

1. Open `index.html` in any browser — everything works out of the box.
2. For development, use any local server (e.g. VS Code Live Server, or `npx serve .`).

## Configuration Checklist

Before deploying, update these items:

### 1. Business Email
In **`script.js`**, update the `CONFIG` object at the top:

```js
const CONFIG = {
  contactEmail: 'your-real-email@yourdomain.com',
  directEmailSubject: 'Project Enquiry — Your Business Name',
  formMode: 'mailto',  // Change to 'api' when you have a backend
  apiEndpoint: '/api/contact',
};
```

Also update the `mailto:` links in **`index.html`**:
- Search for `hello@yourdomain.com` and replace all occurrences.

### 2. SEO Metadata
In `index.html` `<head>`, update:
- `<title>` tag
- `<meta name="description">`
- `<meta name="keywords">`
- `<link rel="canonical">`
- Open Graph `og:title`, `og:description`, `og:url`
- Favicon (replace the placeholder emoji SVG with a proper `.ico` or `.png`)

### 3. Domain & Hosting
- Replace `https://yourdomain.com/` with your actual domain.
- Deploy to any static hosting: Netlify, Vercel, GitHub Pages, Cloudflare Pages, etc.

### 4. Contact Form Backend (Optional but Recommended)
The form works via `mailto:` by default (opens the visitor's email app). For a smoother experience:

1. Set up a backend endpoint (e.g. Formspree, EmailJS, Netlify Forms, or your own API)
2. Update `CONFIG.formMode` to `'api'`
3. Update `CONFIG.apiEndpoint` to your endpoint URL

### 5. Privacy & Legal
- Update the **Privacy Policy** and **Terms of Service** links in the footer
- Add a cookie notice only if you add analytics or tracking cookies

## File Structure

```
digital-agency-website/
├── index.html      ← Main page (all sections)
├── styles.css      ← Custom CSS (gradients, animations, components)
├── script.js       ← JavaScript (nav, form, FAQ, portfolio, scroll)
└── README.md       ← This file
```

## Tech Stack

- **HTML5** — Semantic, accessible markup
- **CSS3** — Custom properties, gradients, grid, flexbox, animations
- **JavaScript** — Vanilla ES6+ (no dependencies)
- **Google Fonts** — Inter + Poppins (via CDN)
- **Font Awesome 6** — Icons (via CDN)

## Features

- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth scroll navigation
- ✅ Mobile hamburger menu
- ✅ Scroll reveal animations
- ✅ Interactive FAQ accordion
- ✅ Portfolio category filtering
- ✅ Contact form with validation
- ✅ Honeypot spam protection
- ✅ mailto: fallback for form submissions
- ✅ Back-to-top button
- ✅ SEO-optimized meta tags
- ✅ Accessible (ARIA labels, keyboard nav, contrast)
- ✅ No build step — just HTML/CSS/JS
- ✅ Fast loading — no heavy frameworks

## Deployment

This is a static site. Deploy to any platform:

```bash
# Netlify (drag and drop the folder, or use CLI)
npx netlify deploy --prod --dir .

# Vercel
npx vercel --prod

# GitHub Pages
# Push to a gh-pages branch or use the repo settings

# Any web server
# Just upload the 3 files to your public_html directory
```

## License

All rights reserved. This website template is created for private business use.
