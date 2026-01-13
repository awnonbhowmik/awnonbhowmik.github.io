# awnonbhowmik.github.io

Personal portfolio and blog website built with [Next.js](https://nextjs.org).

## 🚀 Features

- **Personal Portfolio**: About, skills, achievements, and research sections
- **Blog System**: MDX-based blog with admin controls
- **Admin Authentication**: Secure blog post creation and management
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Contact Form**: Email integration via EmailJS

## 🔐 Blog Admin Setup

Your blog has a secure authentication system for content management.

### Local Development

1. **Create environment file**:

   ```bash
   cp .env.example .env
   ```

2. **Set your admin password** in `.env`:

   ```bash
   NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_very_secure_password_here
   ```

3. **Access admin features**:
   - Visit `/blog`
   - Click the "Admin Login" link
   - Enter your password
   - Create/edit blog posts

### Production Deployment

Set the environment variable on your hosting platform:

**Netlify:**

- Site settings → Environment variables
- Add: `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD` = your password
- Redeploy your site

**Vercel:**

- Project settings → Environment Variables
- Add: `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD` = your password
- Redeploy

**GitHub Pages with Actions:**

- Repository Settings → Secrets and variables → Actions
- Add repository secret: `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD`
- Update your GitHub Actions workflow to use this secret

### Important Security Notes

⚠️ **Client-Side Limitations**: Since this is a static site, the `NEXT_PUBLIC_` prefix means the password is visible in the browser's developer tools. This is suitable for:

- Personal blogs with low-risk content
- Hiding admin UI from casual visitors
- Using as an "access code" rather than enterprise-level security

**Not suitable for:**

- Protecting sensitive data
- Production applications with strict security requirements

**Best practices:**

- Use a strong, unique password
- Never commit `.env` files (already in `.gitignore`)
- Use different passwords for development and production
- Consider this as "access control" rather than true security

For stronger security, consider:

- Headless CMS with OAuth (Contentful, Sanity, etc.)
- Server-side authentication with API routes
- GitHub authentication for admin access

## 🔒 Security Features

### Authentication & Authorization

- Environment-based password storage (no hardcoded credentials)
- localStorage for session persistence
- Admin controls hidden from visitors

### Input Protection

- HTML escaping to prevent XSS attacks
- Blog title, category, and tag sanitization
- Email validation and sanitization
- Contact form protection

### Path Security

- Protection against directory traversal attacks
- Blog slug validation (alphanumeric, hyphens, underscores only)
- File path resolution verification

### DDoS & Abuse Prevention

- **Rate limiting**: Contact form limited to 3 submissions per 60 seconds
- **Input length restrictions**:
  - Name: 100 characters max
  - Email: 254 characters max
  - Message: 5000 characters max
- **Request timeouts**: 5-second timeout per form submission
- **Double submission prevention**: Button disabled during submission
- **Minimum input validation**: Name minimum 2 characters, message minimum 10 characters
- **Client-side submission tracking**: Using localStorage to track and enforce rate limits

### Dependency Security

- All npm packages regularly updated and audited
- Next.js 15.5.9+ (all critical vulnerabilities patched)
- Zero known vulnerabilities verified via `npm audit`

## 📋 Environment Variables

Create a `.env` file with:

```bash
# Blog Admin (REQUIRED)
NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_secure_password_here

# EmailJS Contact Form (Optional, if using contact form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

Use `.env.example` as a template. **Never commit `.env` files to git.**

## 🛠️ Development

### Tech Stack

- **Framework**: Next.js 15.5+
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX
- **Linting**: ESLint

### Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Run type checking
npx tsc --noEmit

# Run linter
npm run lint

# Check for security vulnerabilities
npm audit
```

## 📁 Project Structure

```
src/
  app/                    # Next.js app directory
    blog/                 # Blog pages and admin controls
    components/           # Portfolio sections
  content/
    blog/                 # MDX blog posts
  lib/
    blog.ts              # Blog utilities with path protection
    sanitize.ts          # Input sanitization functions
public/                  # Static assets
```

## 🔍 Security Scanning

This project is protected by multiple security measures:

```bash
# Check for vulnerable dependencies
npm audit

# Run linter (includes security rules)
npm run lint

# Type checking
npx tsc --noEmit
```

### Security Checklist for New Features

- [ ] All user inputs are validated and sanitized
- [ ] No sensitive data is hardcoded
- [ ] Environment variables used for configuration
- [ ] File operations check for path traversal
- [ ] Dependencies are up to date with no known vulnerabilities

## 🚨 Security Vulnerabilities

If you discover a security vulnerability:

1. **Do not** open a public issue
2. Email maintainer privately with details
3. Allow time for fixes before public disclosure
4. Include steps to reproduce the vulnerability

## 📝 License

MIT License - See LICENSE file for details

## 🔗 Links

- [Blog](https://awnonbhowmik.github.io/blog)
- [Portfolio](https://awnonbhowmik.github.io)
- [Contact](https://awnonbhowmik.github.io#contact)
