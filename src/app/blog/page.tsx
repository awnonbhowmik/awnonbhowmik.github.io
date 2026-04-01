import { getBlogPosts, type BlogPost } from '@/lib/blog';
import Link from 'next/link';
import AdminControls from './components/AdminControls';
import Footer from '@/app/components/Footer';

export default async function BlogPage() {
    const posts = await getBlogPosts();

    const categories = Array.from(new Set(posts.map((post: BlogPost) => post.frontmatter?.category).filter(Boolean)));
    const allTags = posts.flatMap((post: BlogPost) => post.frontmatter?.tags || []);
    const tags = Array.from(new Set(allTags)); const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
        <div className="min-h-screen bg-[#1a1a1a] text-white py-16">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Navigation - Top */}
                <div className="flex justify-between items-center mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center text-accent hover:text-white border border-accent px-3 py-1 rounded transition-colors group bg-transparent"
                    >
                        <svg
                            className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Home
                    </Link>
                    <AdminControls minimal={true} />
                </div>

                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-4">Academic Blog</h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Insights from research, tutorials, and thoughts on the latest developments in academia
                    </p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-bold text-accent">{posts.length}</h3>
                        <p className="text-gray-400">Total Posts</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-bold text-accent">{categories.length}</h3>
                        <p className="text-gray-400">Categories</p>
                    </div>
                    <div className="bg-gray-800 p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-bold text-accent">{tags.length}</h3>
                        <p className="text-gray-400">Tags</p>
                    </div>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.length > 0 ? (
                        posts.map((post) => (
                            <article
                                key={post.slug}
                                className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                            >
                                <div className="p-6">
                                    {/* Category Badge */}
                                    <div className="mb-3">
                                        <span className="inline-block px-3 py-1 text-xs font-semibold border border-accent text-accent rounded-full bg-transparent">
                                            {post.frontmatter?.category?.replace('-', ' ') || 'Uncategorized'}
                                        </span>
                                    </div>

                                    {/* Title */}
                                    <h2 className="text-xl font-bold mb-3 hover:text-accent transition-colors">
                                        <Link href={`/blog/${post.slug}`}>
                                            {post.frontmatter?.title || 'Untitled'}
                                        </Link>
                                    </h2>

                                    {/* Excerpt */}
                                    <p className="text-gray-400 mb-4 line-clamp-3">
                                        {post.frontmatter?.excerpt || 'No excerpt available'}
                                    </p>

                                    {/* Tags */}
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

                                    {/* Meta Info */}
                                    <div className="flex justify-between items-center text-sm text-gray-500">
                                        <span>{formatDate(post.frontmatter?.date || '')}</span>
                                        <span>{post.readingTime}</span>
                                    </div>                                    {/* Read More Button */}
                                    <div className="mt-4">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="inline-block border border-accent text-accent hover:bg-[#149ddd] hover:text-white px-4 py-2 rounded transition-colors bg-transparent"
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
                                <p className="text-gray-400 mb-6">
                                    Check back soon for new content and insights from my research journey.
                                </p>
                                <AdminControls showWhenEmpty={true} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Categories and Tags Overview */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-gray-800 p-6 rounded-lg">
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

                    <div className="bg-gray-800 p-6 rounded-lg">
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
