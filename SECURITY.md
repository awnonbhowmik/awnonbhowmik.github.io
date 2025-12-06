# Security Policy

## Overview

This document outlines the security measures implemented in this project and provides guidelines for maintaining security best practices.

## Security Measures Implemented

### 1. Dependency Security

All dependencies are regularly updated to patch known vulnerabilities:

- **Next.js**: Updated to v15.5.7 to fix critical RCE vulnerability (GHSA-9qr9-h5gf-34mp)
- **js-yaml**: Updated to v3.14.2+ to fix prototype pollution vulnerabilities
- **mdast-util-to-hast**: Updated to v13.2.1+ to fix unsanitized class attribute vulnerability

**Action Items:**
- Run `npm audit` regularly to check for vulnerabilities
- Update dependencies promptly when security patches are released
- Review dependency changes before updating to ensure compatibility

### 2. Authentication & Authorization

#### Blog Admin Controls

The blog admin functionality uses environment-based authentication:

- **No hardcoded passwords**: Admin password is stored in environment variables
- **Client-side protection**: Uses localStorage for session management
- **Environment variable**: `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD`

**⚠️ Important Security Limitations:**

Since this is a **static site** (Next.js with static export), the admin authentication has inherent limitations:

1. **Client-side only**: The `NEXT_PUBLIC_` prefix means the password is bundled into the client-side JavaScript and is visible to anyone who inspects the code
2. **No server-side validation**: There's no backend to securely verify credentials
3. **Suitable for low-security scenarios**: This is appropriate for a personal blog where the main goal is to hide admin controls from casual visitors

**For better security**, consider:
- Using a headless CMS with proper authentication (Contentful, Sanity, etc.)
- Adding a server-side API route if not using static export
- Using OAuth/GitHub authentication for admin access
- Deploying with a backend that can handle secure authentication

**Current approach is acceptable if:**
- This is a personal blog with low-risk content
- You want to prevent casual visitors from seeing admin controls
- You understand that a determined user could find the password in the source code
- You're okay with the password being public (like a simple "access code")

**Best practices:**
- Set a strong, unique password in your environment variables
- Never commit `.env` files to version control
- Use different passwords for development and production
- Consider this as an "access code" rather than true security

**Setup:**
```bash
# Create .env file from example
cp .env.example .env

# Set a strong password
NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_very_strong_password_here
```

### 3. Input Sanitization

Comprehensive input sanitization is implemented in `src/lib/sanitize.ts`:

#### Functions Available:

1. **`escapeHtml(str)`**: Escapes HTML special characters to prevent XSS
2. **`sanitizeTitle(title)`**: Sanitizes blog post titles
3. **`sanitizeCategory(category)`**: Validates category names
4. **`sanitizeTags(tags)`**: Sanitizes and validates tags
5. **`sanitizeExcerpt(excerpt)`**: Sanitizes blog post excerpts
6. **`isValidEmail(email)`**: Validates email format
7. **`sanitizeEmail(email)`**: Sanitizes email input

#### Where Applied:

- **Blog Editor**: All metadata fields (title, category, tags, excerpt)
- **Contact Form**: Email validation and sanitization
- **Blog Posts**: User-generated content is properly escaped

### 4. Path Traversal Protection

The blog post reader (`src/lib/blog.ts`) includes path traversal protection:

- Validates slug contains only safe characters (alphanumeric, hyphens, underscores)
- Verifies resolved file path stays within the blog directory
- Prevents access to files outside the content directory

**Example Attack Prevented:**
```
/blog/../../../etc/passwd  ❌ Blocked
/blog/my-post              ✅ Allowed
```

### 5. XSS (Cross-Site Scripting) Prevention

Multiple layers of XSS protection:

1. **Input Sanitization**: All user inputs are sanitized before use
2. **HTML Escaping**: Special characters are escaped in user-generated content
3. **Content Security**: MDX content is rendered through trusted components
4. **Character Whitelisting**: Tags and categories only allow safe characters

### 6. Environment Variables

Sensitive configuration uses environment variables:

**Required Variables:**
```bash
# Blog Admin
NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_secure_password

# EmailJS (Contact Form)
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**Security Notes:**
- All `.env` files are excluded from git via `.gitignore`
- Use `.env.example` as a template (contains no sensitive data)
- Use different values for development and production

## Security Best Practices

### For Developers

1. **Never commit secrets**: Always use environment variables for sensitive data
2. **Validate input**: Always sanitize and validate user input
3. **Update dependencies**: Run `npm audit` regularly and fix vulnerabilities
4. **Review PRs carefully**: Check for security issues in code reviews
5. **Use HTTPS**: Always use HTTPS in production

### For Users

1. **Strong passwords**: Use strong, unique passwords for admin access
2. **Keep updated**: Pull latest security updates regularly
3. **Monitor logs**: Watch for suspicious activity
4. **Secure environment**: Protect your `.env` file with proper file permissions

### For Deployment

1. **Environment isolation**: Use different credentials for dev/staging/prod
2. **Access control**: Limit access to environment variables
3. **HTTPS only**: Always use HTTPS in production
4. **Regular updates**: Keep all dependencies up to date

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please:

1. **Do not** open a public issue
2. Email the maintainer privately with details
3. Allow time for the issue to be fixed before public disclosure
4. Include steps to reproduce the vulnerability

## Security Checklist for New Features

Before adding new features:

- [ ] All user inputs are validated and sanitized
- [ ] No sensitive data is hardcoded
- [ ] Environment variables are used for configuration
- [ ] File operations check for path traversal
- [ ] Authentication is properly implemented
- [ ] Dependencies are up to date with no known vulnerabilities
- [ ] Security tests are written and pass
- [ ] CodeQL scan passes with no alerts

## Automated Security Scanning

This project uses:

- **npm audit**: Checks for vulnerable dependencies
- **CodeQL**: Static analysis security testing
- **ESLint**: Code quality and security linting

**To run security checks:**
```bash
# Check for vulnerable dependencies
npm audit

# Run linter
npm run lint

# Type check
npx tsc --noEmit
```

## Security Updates Log

| Date | Version | Description |
|------|---------|-------------|
| 2025-12-06 | Initial | Comprehensive security audit and fixes |
| 2025-12-06 | 1.0 | - Updated Next.js to 15.5.7<br>- Fixed js-yaml vulnerabilities<br>- Fixed mdast-util-to-hast vulnerability<br>- Removed hardcoded password<br>- Added input sanitization<br>- Added path traversal protection |

## Additional Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)
- [npm Security Best Practices](https://docs.npmjs.com/security-best-practices)
- [GitHub Security Best Practices](https://docs.github.com/en/code-security)

## License

This security policy is part of the project and follows the same license.

---

**Last Updated**: December 6, 2025
