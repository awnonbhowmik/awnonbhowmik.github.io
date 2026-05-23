'use client';

import { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import 'katex/dist/katex.css';
import { sanitizeTitle, sanitizeCategory, sanitizeTags, sanitizeExcerpt } from '@/lib/sanitize';

// Dynamic import to avoid SSR issues
const MDEditor = dynamic(
    () => import('@uiw/react-md-editor'),
    { ssr: false }
);

// ── Auth gate ─────────────────────────────────────────────────

function AuthGate({ children }: { children: React.ReactNode }) {
    const [isAdmin, setIsAdmin] = useState<boolean | null>(
        () => typeof window === 'undefined' ? null : localStorage.getItem('blog_admin_auth') === 'awnon_authenticated'
    );
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        const adminPassword = process.env.NEXT_PUBLIC_BLOG_ADMIN_PASSWORD;
        if (!adminPassword) {
            setError('Admin authentication is not configured.');
            return;
        }
        if (password === adminPassword) {
            localStorage.setItem('blog_admin_auth', 'awnon_authenticated');
            setIsAdmin(true);
            setPassword('');
        } else {
            setError('Invalid password.');
            setPassword('');
        }
    };

    // Still checking localStorage
    if (isAdmin === null) return null;

    if (process.env.NODE_ENV === 'production') {
        return (
            <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-4">
                <div className="w-full max-w-lg bg-gray-800 rounded-lg p-8 shadow-xl">
                    <h1 className="text-xl font-bold mb-2">Editor Disabled in Production</h1>
                    <p className="text-gray-400 text-sm mb-6">
                        For security, the client-side editor is only available in development environments.
                    </p>
                    <Link href="/blog" className="text-sm text-accent hover:text-white transition-colors">
                        ← Back to Blog
                    </Link>
                </div>
            </div>
        );
    }

    if (!isAdmin) {
        return (
            <div className="min-h-screen bg-[#1a1a1a] text-white flex items-center justify-center px-4">
                <div className="w-full max-w-sm bg-gray-800 rounded-lg p-8 shadow-xl">
                    <h1 className="text-xl font-bold mb-1">Admin Login</h1>
                    <p className="text-gray-400 text-sm mb-6">Enter your password to access the editor.</p>
                    <form onSubmit={handleLogin} className="space-y-4">
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => { setPassword(e.target.value); setError(''); }}
                            placeholder="Password"
                            autoFocus
                            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                        {error && <p className="text-red-400 text-sm">{error}</p>}
                        <button
                            type="submit"
                            className="w-full bg-accent hover:bg-accent-dark text-white py-2.5 rounded-lg font-semibold transition-colors"
                        >
                            Login
                        </button>
                    </form>
                    <div className="mt-4">
                        <Link href="/blog" className="text-sm text-gray-500 hover:text-accent transition-colors">
                            ← Back to Blog
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}

// ── Editor ────────────────────────────────────────────────────

function Editor() {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('research');
    const [tags, setTags] = useState('');
    const [excerpt, setExcerpt] = useState('');
    const [content, setContent] = useState(`# Your Blog Post Title

Write your content here! You can use:

## Markdown Features
- **Bold text**
- *Italic text*
- \`Inline code\`
- [Links](https://example.com)

## Code Blocks
\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`

## Mathematical Equations
Inline math: $E = mc^2$

Block math:
$$\\int_{-\\infty}^{\\infty} e^{-x^2} dx = \\sqrt{\\pi}$$

## Lists
1. First item
2. Second item
3. Third item

- Bullet point 1
- Bullet point 2
- Bullet point 3

Happy writing! 🚀
`);

    const categories = [
        'research',
        'tutorial',
        'conference',
        'paper-review',
        'career-advice',
        'general'
    ];

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .trim();
    };

    const generateMDXContent = () => {
        const currentDate = new Date().toISOString().split('T')[0];

        const sanitizedTitle = sanitizeTitle(title);
        const sanitizedCategory = sanitizeCategory(category);
        const sanitizedTags = sanitizeTags(tags);
        const sanitizedExcerpt = sanitizeExcerpt(excerpt);

        return `---
title: "${sanitizedTitle}"
date: "${currentDate}"
category: "${sanitizedCategory}"
tags: [${sanitizedTags.map(tag => `"${tag}"`).join(', ')}]
excerpt: "${sanitizedExcerpt}"
---

${content}`;
    };

    const downloadMDX = () => {
        const mdxContent = generateMDXContent();
        const slug = generateSlug(title) || 'new-post';
        const blob = new Blob([mdxContent], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${slug}.mdx`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const copyToClipboard = () => {
        const mdxContent = generateMDXContent();
        navigator.clipboard.writeText(mdxContent);
        alert('MDX content copied to clipboard!');
    };

    const handleLogout = () => {
        localStorage.removeItem('blog_admin_auth');
        window.location.reload();
    };

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <div className="container mx-auto px-4 py-8 max-w-6xl">
                {/* Navigation */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center text-accent hover:text-white border border-accent px-3 py-1 rounded transition-colors group bg-transparent"
                        >
                            <svg
                                className="w-4 h-4 mr-1 transform group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Home
                        </Link>
                        <span className="text-gray-600">•</span>
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-accent hover:text-white border border-accent px-3 py-1 rounded transition-colors bg-transparent"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="text-xs text-gray-500 hover:text-gray-300 transition-colors px-2 py-1"
                    >
                        Logout
                    </button>
                </div>

                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-4">Blog Post Editor</h1>
                    <p className="text-gray-400">
                        Create and edit your blog posts with live preview, LaTeX support, and syntax highlighting.
                    </p>
                </div>

                {/* Metadata Form */}
                <div className="bg-gray-800 p-6 rounded-lg mb-6">
                    <h2 className="text-xl font-semibold mb-4">Post Metadata</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        {/* Title */}
                        <div>
                            <label htmlFor="title" className="block text-sm font-medium mb-2">
                                Post Title *
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Enter your post title..."
                                className="w-full p-3 bg-gray-700 border border-accent rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                                required
                            />
                        </div>

                        {/* Category */}
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium mb-2">
                                Category
                            </label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                className="w-full p-3 bg-gray-700 border border-accent rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                            >
                                {categories.map(cat => (
                                    <option key={cat} value={cat}>
                                        {cat.charAt(0).toUpperCase() + cat.slice(1).replace('-', ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Tags */}
                        <div>
                            <label htmlFor="tags" className="block text-sm font-medium mb-2">
                                Tags (comma-separated)
                            </label>
                            <input
                                id="tags"
                                type="text"
                                value={tags}
                                onChange={(e) => setTags(e.target.value)}
                                placeholder="research, machine learning, tutorial"
                                className="w-full p-3 bg-gray-700 border border-accent rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                            />
                        </div>

                        {/* Slug Preview */}
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                URL Slug (auto-generated)
                            </label>
                            <div className="w-full p-3 bg-gray-900 border border-gray-600 rounded-lg text-gray-400">
                                /blog/{generateSlug(title) || 'new-post'}
                            </div>
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div className="mt-4">
                        <label htmlFor="excerpt" className="block text-sm font-medium mb-2">
                            Excerpt (Brief description)
                        </label>
                        <textarea
                            id="excerpt"
                            value={excerpt}
                            onChange={(e) => setExcerpt(e.target.value)}
                            placeholder="A brief description of your post..."
                            rows={3}
                            className="w-full p-3 bg-gray-700 border border-accent rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-accent"
                        />
                    </div>
                </div>

                {/* MDX Editor */}
                <div className="bg-gray-800 rounded-lg overflow-hidden">
                    <div className="p-4 border-b border-gray-700">
                        <h2 className="text-xl font-semibold">Content Editor</h2>
                        <p className="text-gray-400 text-sm mt-1">
                            Use Markdown syntax. Math equations with $ for inline or $$ for blocks. Code blocks with triple backticks.
                        </p>
                    </div>

                    <div className="p-4">
                        <MDEditor
                            value={content}
                            onChange={(val) => setContent(val || '')}
                            preview="edit"
                            hideToolbar={false}
                            height={600}
                            data-color-mode="dark"
                        />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-wrap gap-4">
                    <button
                        onClick={downloadMDX}
                        disabled={!title.trim()}
                        className="border border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed bg-transparent disabled:border-gray-600 disabled:text-gray-600"
                    >
                        📥 Download MDX File
                    </button>

                    <button
                        onClick={copyToClipboard}
                        disabled={!title.trim()}
                        className="border border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors disabled:cursor-not-allowed bg-transparent disabled:border-gray-600 disabled:text-gray-600"
                    >
                        📋 Copy to Clipboard
                    </button>

                    <Link
                        href="/blog"
                        className="border border-accent text-accent hover:bg-accent hover:text-white px-6 py-3 rounded-lg font-semibold transition-colors bg-transparent"
                    >
                        ← Back to Blog
                    </Link>
                </div>

                {/* Instructions */}
                <div className="mt-8 border border-accent rounded-lg p-6 bg-transparent">
                    <h3 className="text-lg font-semibold mb-3 text-accent">How to Publish Your Post</h3>
                    <ol className="list-decimal list-inside space-y-2 text-gray-300">
                        <li>Fill in the post metadata (title, category, tags, excerpt)</li>
                        <li>Write your content using Markdown syntax in the editor</li>
                        <li>Click &quot;Download MDX File&quot; to save the post to your computer</li>
                        <li>Place the downloaded file in <code className="bg-gray-700 px-2 py-1 rounded">src/content/blog/</code></li>
                        <li>Commit and push to GitHub to publish on your live site</li>
                    </ol>
                </div>
            </div>
        </div>
    );
}

// ── Page export ───────────────────────────────────────────────

export default function BlogEditor() {
    return (
        <AuthGate>
            <Editor />
        </AuthGate>
    );
}
