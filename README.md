# Awnon Bhowmik — Academic Portfolio v3.0

Personal academic portfolio and blog for Awnon Bhowmik — doctoral researcher in cybersecurity, software engineer, and mathematics educator.

**Live site:** [awnon.netlify.app](https://awnon.netlify.app)

---

## Sections

- **Hero** — Animated typing introduction with social links and CV download
- **About** — Professional background and research identity
- **Research** — Doctoral research focus and active research areas
- **Publications** — Peer-reviewed journal articles grouped by domain
- **Projects** — Selected research prototypes and engineering work
- **Resume** — Education and professional experience
- **Skills** — Technical specializations by category
- **Current Work** — Active research, engineering, and writing focus
- **Community & Scholarly Outreach** — Quora, Mathematics Stack Exchange contributions
- **Contact** — EmailJS-powered contact form
- **Blog** — MDX-based technical blog with KaTeX math rendering

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16+ (static export) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 4 |
| Content | MDX + remark-math + rehype-katex |
| Icons | react-icons v5 |
| Contact | EmailJS |
| Deployment | Netlify |

---

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type checking
npx tsc --noEmit

# Lint
npm run lint
```

> The dev and build scripts use `--webpack` to avoid a Turbopack incompatibility with `@next/mdx` plugin objects.

---

## Project Structure

```
src/
  app/
    blog/
      [slug]/page.tsx       # Individual blog post renderer (MDX + KaTeX)
      editor/page.tsx       # Admin blog editor
      page.tsx              # Blog index
      components/           # AdminControls
    components/             # Portfolio sections
      Hero.tsx
      About.tsx
      Research.tsx
      Publications.tsx
      Projects.tsx
      Resume.tsx
      Skills.tsx
      CurrentWork.tsx
      Achievements.tsx
      Contact.tsx
      NavBar.tsx
      Footer.tsx
    data/
      publications.ts       # Publication data (typed)
      projects.ts           # Project data (typed)
    globals.css
    layout.tsx
    page.tsx
  content/
    blog/                   # MDX blog posts
  lib/
    blog.ts                 # Blog utilities with path traversal protection
    sanitize.ts             # Input sanitization
public/
  image_modified_high_contrast.webp
  research.webp
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
# Blog admin access (client-side — suitable for personal use only)
NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_secure_password_here

# EmailJS — contact form
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

> **Note:** The `NEXT_PUBLIC_` prefix makes the admin password visible in browser dev tools. This is intentional for a static personal site — it hides admin UI from casual visitors but is not suitable for protecting sensitive data.

### Netlify Deployment

Set environment variables under **Site settings → Environment variables**, then redeploy.

---

## Security Features

- **Input sanitization** — blog titles, tags, and contact form fields are sanitized against XSS
- **Path traversal protection** — blog slug validation (alphanumeric, hyphens, underscores only)
- **Rate limiting** — contact form limited to 3 submissions per 60 seconds
- **Input length limits** — name (100 chars), email (254 chars), message (5000 chars)
- **Double-submission prevention** — submit button disabled during request

---

## CV

CV is hosted on GitHub Releases and downloaded directly from:

```
https://github.com/awnonbhowmik/Awnon-CV/releases/download/latest/main.pdf
```

To update the CV, create a new release tagged `latest` in the [Awnon-CV](https://github.com/awnonbhowmik/Awnon-CV) repository with `main.pdf` as the asset. The download link requires no code changes.

---

## Links

- [Portfolio](https://awnon.netlify.app)
- [Blog](https://awnon.netlify.app/blog)
- [Google Scholar](https://scholar.google.com/citations?user=nEdZAFkAAAAJ&hl=en)
- [GitHub](https://github.com/awnonbhowmik)
- [LinkedIn](https://linkedin.com/in/awnon-bhowmik)
- [ResearchGate](https://www.researchgate.net/profile/Awnon-Bhowmik)
