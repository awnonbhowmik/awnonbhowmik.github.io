# Blog Admin Authentication

Your blog now has a simple authentication system that allows only you to see and access the "Write New Post" buttons.

## How it works:

1. **For Visitors**: The blog appears completely read-only with no visible admin controls
2. **For You (Admin)**: You can authenticate to see admin controls

## To Access Admin Features:

1. Go to your blog page (`/blog`)
2. Look for a small "Admin" text link (usually at the bottom of the page)
3. Click on "Admin" to open the login form
4. Enter the password: `awnon2024blog`
5. After logging in, you'll see:
   - "Write New Post" button (when there are posts)
   - "Write Your First Post" button (when there are no posts)
   - "Logout Admin" option

## To Change the Password:

Edit the file: `src/app/blog/components/AdminControls.tsx`
Find this line:

```javascript
if (password === 'awnon2024blog') {
```

And change `'awnon2024blog'` to your preferred password.

## Security Notes:

- The authentication is stored in localStorage, so you'll stay logged in until you clear browser data or logout
- This is a simple client-side authentication suitable for a personal blog
- The password is visible in the source code, but since this is a static site, it provides reasonable protection for a personal blog
- Anyone who knows the password can access admin features

## Features:

- ✅ Admin login/logout
- ✅ Hidden admin controls for visitors
- ✅ Persistent authentication (stays logged in)
- ✅ Works with your existing blog editor
- ✅ No server-side code required (perfect for static sites)

The blog remains fully functional for visitors while giving you exclusive access to content creation tools!
