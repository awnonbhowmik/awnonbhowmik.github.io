import type { Metadata } from 'next';
import { getBlogPosts, type BlogPost } from '@/lib/blog';
import Link from 'next/link';
import Footer from '@/app/components/Footer';
import { SITE_URL } from '@/lib/site';

const description =
    'Research notes, tutorials, and practical insights on privacy, cryptography, cybersecurity, and applied mathematics.';

export const metadata: Metadata = {
    title: 'Academic Blog | Awnon Bhowmik',
    description,
    authors: [{ name: 'Awnon Bhowmik', url: SITE_URL }],
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Academic Blog | Awnon Bhowmik',
        description,
        url: '/blog',
        siteName: 'Awnon Bhowmik',
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Academic Blog | Awnon Bhowmik',
        description,
    },
};

export default async function BlogPage() {
    const posts = await getBlogPosts();
    const sortedPosts = [...posts].sort((a, b) => {
        const dateA = new Date(a.frontmatter?.date || 0).getTime();
        const dateB = new Date(b.frontmatter?.date || 0).getTime();
        return dateB - dateA;
    });
    const featuredPost = sortedPosts[0];

    const categories = Array.from(
        new Set(sortedPosts.map((post: BlogPost) => post.frontmatter?.category).filter(Boolean))
    );
    const allTags = sortedPosts.flatMap((post: BlogPost) => post.frontmatter?.tags || []);
    const tags = Array.from(new Set(allTags));

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <>
            <div className="min-h-screen bg-[#1a1a1a] text-white py-12 sm:py-16">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="inline-flex min-h-11 items-center text-accent hover:text-white border border-accent/60 hover:border-accent px-3 py-1.5 rounded-full transition-colors group bg-transparent"
                        >
                            <svg
                                className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Home
                        </Link>
                    </div>

                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 border border-accent/30 bg-accent/10 text-accent px-3 py-1 rounded-full text-xs uppercase tracking-[0.22em] mb-5">
                            Research Notes
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">Academic Blog</h1>
                        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                            Insights from research, tutorials, and practical notes on privacy, cryptography,
                            and applied mathematics.
                        </p>
                    </div>

                    {featuredPost && (
                        <div className="mb-12 bg-linear-to-br from-gray-800 via-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-4 sm:p-8 shadow-xl">
                            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
                                <div className="max-w-2xl">
                                    <div className="inline-flex items-center gap-2 border border-accent/40 text-accent px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] mb-4">
                                        Latest Post
                                    </div>
                                    <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                                        <Link
                                            href={`/blog/${featuredPost.slug}`}
                                            className="hover:text-accent transition-colors"
                                        >
                                            {featuredPost.frontmatter?.title || 'Untitled'}
                                        </Link>
                                    </h2>
                                    <p className="text-gray-400 leading-relaxed mb-4">
                                        {featuredPost.frontmatter?.excerpt || 'No excerpt available'}
                                    </p>
                                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                                        <span>{formatDate(featuredPost.frontmatter?.date || '')}</span>
                                        <span>•</span>
                                        <span>{featuredPost.readingTime}</span>
                                        <span>•</span>
                                        <span>
                                            {featuredPost.frontmatter?.category?.replace('-', ' ') || 'Uncategorized'}
                                        </span>
                                    </div>
                                </div>
                                <Link
                                    href={`/blog/${featuredPost.slug}`}
                                    className="inline-flex min-h-11 items-center justify-center border border-accent text-accent hover:bg-accent hover:text-white px-5 py-3 rounded-lg transition-colors self-start lg:self-auto"
                                >
                                    Read Featured Post
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12">
                        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 text-center">
                            <h3 className="text-2xl font-bold text-accent">{sortedPosts.length}</h3>
                            <p className="text-gray-400">Total Posts</p>
                        </div>
                        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 text-center">
                            <h3 className="text-2xl font-bold text-accent">{categories.length}</h3>
                            <p className="text-gray-400">Categories</p>
                        </div>
                        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700 text-center">
                            <h3 className="text-2xl font-bold text-accent">{tags.length}</h3>
                            <p className="text-gray-400">Tags</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {sortedPosts.length > 0 ? (
                            sortedPosts.map((post) => (
                                <article
                                    key={post.slug}
                                    className="min-w-0 bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1"
                                >
                                    <div className="p-4 sm:p-6">
                                        <div className="mb-3">
                                            <span className="inline-block px-3 py-1 text-xs font-semibold border border-accent text-accent rounded-full bg-transparent">
                                                {post.frontmatter?.category?.replace('-', ' ') || 'Uncategorized'}
                                            </span>
                                        </div>

                                        <h2 className="wrap-break-word text-xl font-bold mb-3 hover:text-accent transition-colors leading-snug">
                                            <Link href={`/blog/${post.slug}`}>{post.frontmatter?.title || 'Untitled'}</Link>
                                        </h2>

                                        <p className="text-gray-400 mb-4 line-clamp-3">
                                            {post.frontmatter?.excerpt || 'No excerpt available'}
                                        </p>

                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {(post.frontmatter?.tags || []).slice(0, 3).map((tag: string) => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 text-xs border border-accent text-accent rounded bg-transparent"
                                                >
                                                    #{tag}
                                                </span>
                                            ))}
                                            {(post.frontmatter?.tags || []).length > 3 && (
                                                <span className="px-2 py-1 text-xs border border-accent text-accent rounded bg-transparent">
                                                    +{(post.frontmatter?.tags || []).length - 3} more
                                                </span>
                                            )}
                                        </div>

                                        <div className="flex flex-wrap justify-between items-center gap-2 text-sm text-gray-500">
                                            <span>{formatDate(post.frontmatter?.date || '')}</span>
                                            <span>{post.readingTime}</span>
                                        </div>

                                        <div className="mt-4">
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                className="inline-flex min-h-11 items-center border border-accent text-accent hover:bg-accent hover:text-white px-4 py-2 rounded-lg transition-colors bg-transparent"
                                            >
                                                Read More
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-12">
                                <div className="bg-gray-800 p-8 rounded-lg">
                                    <h3 className="text-xl font-semibold mb-4">No Blog Posts Yet</h3>
                                    <p className="text-gray-400">
                                        Check back soon for new content and insights from my research journey.
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="mt-12 sm:mt-16 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-8">
                        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold mb-4">Categories</h3>
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <span
                                        key={category as string}
                                        className="border border-accent text-accent px-3 py-1 rounded-full text-sm bg-transparent"
                                    >
                                        {(category as string)?.replace('-', ' ') || 'Uncategorized'}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="bg-gray-800 p-4 sm:p-6 rounded-xl border border-gray-700">
                            <h3 className="text-xl font-semibold mb-4">All Tags</h3>
                            <div className="flex flex-wrap gap-2">
                                {tags.slice(0, 20).map((tag) => (
                                    <span
                                        key={tag as string}
                                        className="border border-accent text-accent px-2 py-1 rounded text-sm bg-transparent"
                                    >
                                        #{tag as string}
                                    </span>
                                ))}
                                {tags.length > 20 && (
                                    <span className="border border-accent text-accent px-2 py-1 rounded text-sm bg-transparent">
                                        +{tags.length - 20} more
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
