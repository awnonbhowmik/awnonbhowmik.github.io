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
npm run lint
```

---

## Environment Variables

Copy `.env.example` to `.env`:

```bash
NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=    # blog admin access (client-side only)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

Set the same variables under **Site settings → Environment variables** on Netlify.

---

## CV

Auto-downloaded from GitHub Releases — no code changes needed to update:

```
https://github.com/awnonbhowmik/Awnon-CV/releases/download/latest/Awnon-Bhowmik-General-CV.pdf
```

---

## Structure

```
src/
  app/
    components/     # portfolio sections
    data/           # typed publications and projects data
    blog/           # blog pages and admin editor
  content/blog/     # MDX posts (KaTeX math supported)
  lib/              # blog utilities, input sanitization
public/             # static assets
```

---

## License

© 2026 Awnon Bhowmik. All Rights Reserved.

Unauthorized copying, modification, distribution, or use of this code or content is strictly prohibited.
