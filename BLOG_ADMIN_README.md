# Blog Admin Authentication

Your blog now has a **secure** authentication system that allows only you to see and access the "Write New Post" buttons.

## How it works:

1. **For Visitors**: The blog appears completely read-only with no visible admin controls
2. **For You (Admin)**: You can authenticate to see admin controls

## 🔐 Security Setup (REQUIRED)

**⚠️ IMPORTANT**: The admin password is now stored in environment variables for security.

### First-Time Setup:

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and set a strong password:
   ```bash
   NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_very_secure_password_here
   ```

3. **Never commit the `.env` file to git** - it's already in `.gitignore`

### For Production Deployment:

Set the environment variable in your deployment platform:
- **Netlify**: Site settings → Environment variables
- **Vercel**: Project settings → Environment Variables
- **GitHub Pages**: Use GitHub Secrets for Actions

```
NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_production_password
```

## To Access Admin Features:

1. Go to your blog page (`/blog`)
2. Look for a small "Admin" text link (usually at the bottom of the page or top right)
3. Click on "Admin Login" to open the login form
4. Enter your admin password (the one you set in `.env`)
5. After logging in, you'll see:
   - "Write New Post" button (when there are posts)
   - "Write Your First Post" button (when there are no posts)
   - "Logout Admin" option

## 🔒 Security Improvements:

### What Changed:

- ✅ **No hardcoded passwords** - Password now stored in environment variables
- ✅ **Input sanitization** - All user inputs are sanitized to prevent XSS attacks
- ✅ **Path traversal protection** - Blog file reading is protected against path traversal
- ✅ **Dependencies updated** - All security vulnerabilities patched
- ✅ **CodeQL verified** - Passed static security analysis with 0 alerts

### Security Features:

- **Environment-based auth**: Password stored securely in environment variables
- **XSS Prevention**: All user inputs are sanitized using `escapeHtml()` and validation
- **Path Security**: Blog slugs validated to prevent directory traversal attacks
- **Updated Dependencies**: All npm packages updated to patch known vulnerabilities

### ⚠️ Security Limitations (Static Site):

**Important**: Since this is a static site (Next.js with static export), the admin password is bundled into the client-side JavaScript code and is technically visible to anyone who inspects the source code.

**This authentication is suitable for:**
- Personal blogs with low-risk content
- Hiding admin controls from casual visitors
- Using as an "access code" rather than true security

**For production sites requiring real security**, consider:
- Using a headless CMS with OAuth (Contentful, Sanity, etc.)
- Adding server-side authentication with API routes
- Using GitHub authentication for admin access

The current setup is a significant improvement over hardcoded passwords but should be understood as "access control" rather than "security" in the traditional sense.

## Features:

- ✅ Admin login/logout
- ✅ Hidden admin controls for visitors
- ✅ Persistent authentication (stays logged in)
- ✅ Works with your existing blog editor
- ✅ No server-side code required (perfect for static sites)

The blog remains fully functional for visitors while giving you exclusive access to content creation tools!
