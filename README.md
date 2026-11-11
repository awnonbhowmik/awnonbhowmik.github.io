# Awnon Bhowmik — Portfolio v3.0

Personal Portfolio and Technical Blog of Awnon Bhowmik — Doctoral Researcher in Cybersecurity, Software Engineer, Data Analyst, and Mathematics Educator.

**Live:** [awnon.netlify.app](https://awnon.netlify.app)

---

## Stack

Next.js 16 · TypeScript 6 · Tailwind CSS 4 · MDX + KaTeX · EmailJS · Netlify

---

## Getting Started

```bash
npm install
npm run dev    # Turbopack (Next.js 16 default)
npm run build  # Turbopack production build
npm run check  # Lint, type-check, test, and build
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
EMAILJS_SERVICE_ID=
EMAILJS_TEMPLATE_ID=
EMAILJS_PUBLIC_KEY=
EMAILJS_PRIVATE_KEY= # Optional; required if private-key authorization is enabled
```

Set the same variables under **Site settings → Environment variables** on Netlify.
The contact form submits to a rate-limited Netlify Function, so these values are
never included in the browser bundle. Existing `NEXT_PUBLIC_EMAILJS_*` variables
remain supported temporarily as a deployment-migration fallback.

---

## Structure

```
src/
  app/
    components/     # portfolio sections
    data/           # typed publications and projects data
    blog/           # blog index and post pages
  content/blog/     # MDX posts (KaTeX math supported)
  lib/              # blog utilities, input sanitization
public/             # static assets
```

---

## License

© 2026 Awnon Bhowmik. All Rights Reserved.

Unauthorized copying, modification, distribution, or use of this code or content is strictly prohibited.
