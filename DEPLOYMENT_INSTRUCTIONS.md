# Deployment Instructions for Blog Password

## ⚠️ IMPORTANT SECURITY NOTE

**DO NOT commit your `.env` file or share your password in public repositories.** The `.env` file is properly gitignored and contains your actual password. This documentation file uses placeholder text for security.

---

Your blog admin password has been set locally in the `.env` file. To use this password in production, you need to configure it in your deployment platform.

## Local Development Setup ✅

Your blog admin password is already set in your local `.env` file as:
```
NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_secure_password_here
```

This file is properly gitignored and will **not** be committed to the repository for security reasons.

## Production Deployment (Netlify)

To use the same password in your production deployment on Netlify:

### Steps:

1. **Log in to Netlify** at https://app.netlify.com

2. **Navigate to your site** (awnonbhowmik.github.io)

3. **Go to Site Settings**:
   - Click on "Site configuration" or "Site settings" in the left sidebar
   - Select "Environment variables"

4. **Add the Environment Variable**:
   - Click "Add a variable" or "Add environment variable"
   - **Key**: `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD`
   - **Value**: `your_secure_password_here` (use the same password from your local `.env` file)
   - Click "Create variable" or "Save"

5. **Redeploy your site**:
   - Go to "Deploys" tab
   - Click "Trigger deploy" → "Clear cache and deploy site"
   - Wait for the deployment to complete

### Verification:

After deployment:
1. Visit your blog at https://awnonbhowmik.github.io/blog
2. Look for the "Admin Login" link
3. Enter your configured admin password
4. You should be able to access admin features

## Alternative Deployment Platforms

### Vercel:
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add: `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD` = `your_secure_password_here`
4. Redeploy

### GitHub Pages with Actions:
1. Go to repository Settings → Secrets and variables → Actions
2. Add repository secret: `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD` = `your_secure_password_here`
3. Update your GitHub Actions workflow to use this secret
4. Push changes to trigger deployment

## Security Notes

⚠️ **Important**: The `NEXT_PUBLIC_` prefix means this variable is exposed in the client-side bundle. This is suitable for:
- Personal blogs with low-risk content
- Hiding admin UI from casual visitors
- Using as an "access code" rather than enterprise-level security

For production sites requiring stronger security, consider:
- Server-side authentication with API routes
- OAuth integration (GitHub, Google, etc.)
- Headless CMS with built-in auth (Contentful, Sanity, etc.)

The current setup provides convenient access control for a personal blog while keeping the password out of your git repository.
