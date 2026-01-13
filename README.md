# Unified ReadMe for awnonbhowmik.github.io

## Description
This repository contains the source code for my personal site built with [Next.js](https://nextjs.org), bootstrapped using `create-next-app`.

---

## 🔑 Blog Admin Authentication  
**Your blog now has a secure authentication system that allows only you to see and access the 'Write New Post' buttons.**

### How it works:  
1. **For Visitors**: The blog appears completely read-only with no visible admin controls.  
2. **For You (Admin)**: You can authenticate to see admin controls

#### Security Setup (REQUIRED):
1. Set up `.env` with the environment variable `NEXT_PUBLIC_BLOG_ADMIN_PASSWORD`. Never commit `.env` files to the repository.

---

## 🛠️ Deployment Instructions for Blog Password
### Local Development Setup:
Ensure that you create a `.env` file and set the password as:
```bash

NEXT_PUBLIC_BLOG_ADMIN_PASSWORD=your_secure_password_here
```
Follow the same process on your production environment (Netlify/Vercel secrets settings).

---
## Technical Security Policy
- NodeJS/npm