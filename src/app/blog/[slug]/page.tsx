import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { SITE_URL } from '@/lib/site';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import Link from 'next/link';
import 'katex/dist/katex.css';
import BackToTopButton from '../components/BackToTopButton';

// Custom components for MDX
const components = {
    h1: (props: React.HTMLProps<HTMLHeadingElement>) => <h1 className="wrap-break-word text-3xl sm:text-4xl font-bold mb-6 text-white" {...props} />,
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => <h2 className="wrap-break-word text-2xl sm:text-3xl font-bold mb-4 mt-8 text-white" {...props} />,
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => <h3 className="wrap-break-word text-xl sm:text-2xl font-bold mb-3 mt-6 text-white" {...props} />,
    h4: (props: React.HTMLProps<HTMLHeadingElement>) => <h4 className="text-xl font-bold mb-2 mt-4 text-white" {...props} />,
    p: (props: React.HTMLProps<HTMLParagraphElement>) => <p className="mb-4 wrap-break-word text-gray-300 leading-relaxed text-left md:text-justify" {...props} />,
    ul: (props: React.HTMLProps<HTMLUListElement>) => <ul className="mb-4 ml-5 sm:ml-6 list-disc text-gray-300 leading-relaxed" {...props} />,
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol className="mb-4 ml-5 sm:ml-6 list-decimal text-gray-300 leading-relaxed" {...props} />,
    li: (props: React.HTMLProps<HTMLLIElement>) => <li className="mb-1 wrap-break-word" {...props} />,
    blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-accent pl-3 sm:pl-4 my-4 wrap-break-word italic text-gray-400" {...props} />
    ),
    code: (props: React.HTMLProps<HTMLElement>) => (
        <code className="wrap-break-word bg-gray-800 px-2 py-1 rounded text-sm font-mono text-accent" {...props} />
    ),
    pre: (props: React.HTMLProps<HTMLPreElement>) => (
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-700" {...props} />
    ),
    a: (props: React.HTMLProps<HTMLAnchorElement>) => (
        <a
            className="wrap-break-word text-accent hover:text-accent-dark underline transition-colors"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        />
    ),
    img: (props: React.HTMLProps<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img {...props} className="max-w-full h-auto rounded-lg my-4 mx-auto" alt={props.alt ?? ''} />
    ),
    table: (props: React.HTMLProps<HTMLTableElement>) => (
        <div className="max-w-full overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-600" {...props} />
        </div>
    ),
    th: (props: React.HTMLProps<HTMLTableCellElement>) => (
        <th className="border border-gray-600 px-3 sm:px-4 py-2 bg-gray-800 text-white font-semibold" {...props} />
    ),
    td: (props: React.HTMLProps<HTMLTableCellElement>) => (
        <td className="border border-gray-600 px-3 sm:px-4 py-2 text-gray-300" {...props} />
    ),
};

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug); if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested blog post could not be found.',
        };
    }

    return {
        title: `${post.frontmatter.title} | Awnon Bhowmik`,
        description: post.frontmatter.excerpt || `Read about ${post.frontmatter.title}`,
        keywords: post.frontmatter.tags?.join(', '),
        alternates: {
            canonical: `/blog/${resolvedParams.slug}`,
        },
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.excerpt || `Read about ${post.frontmatter.title}`,
            url: `/blog/${resolvedParams.slug}`,
            type: 'article',
            publishedTime: post.frontmatter.date,
            tags: post.frontmatter.tags,
        },
    };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
        notFound();
    }

    const { frontmatter, content, readingTime } = post;

    return (
        <div className="min-h-screen bg-[#1a1a1a] text-white">
            <div className="container mx-auto px-4 py-8 sm:py-12 max-w-4xl">
                {/* Navigation */}
                <div className="flex flex-wrap items-center gap-3 mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex min-h-11 items-center text-accent hover:text-white border border-accent/60 hover:border-accent px-3 py-1.5 rounded-full transition-colors group bg-transparent text-sm"
                        >
                            <svg
                                className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Back to Home
                        </Link>
                        <Link
                            href="/blog"
                            className="inline-flex min-h-11 items-center text-accent hover:text-white border border-accent/60 hover:border-accent px-3 py-1.5 rounded-full transition-colors text-sm"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </div>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="mb-4">
                        <span className="inline-block bg-accent text-white text-sm px-3 py-1 rounded-full uppercase tracking-wide">
                            {frontmatter.category?.replace('-', ' ')}
                        </span>
                    </div>

                    <h1 className="wrap-break-word text-3xl sm:text-5xl font-bold mb-6 leading-tight">
                        {frontmatter.title}
                    </h1>

                    {frontmatter.excerpt && (
                        <p className="text-lg sm:text-xl text-gray-400 mb-6 leading-relaxed">
                            {frontmatter.excerpt}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-gray-500 text-sm">
                        <time dateTime={frontmatter.date}>
                            {new Date(frontmatter.date).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </time>

                        <span>•</span>

                        <span>{readingTime}</span>

                        {frontmatter.tags && frontmatter.tags.length > 0 && (
                            <>
                                <span>•</span>
                                <div className="flex flex-wrap gap-2">
                                    {frontmatter.tags.map((tag: string) => (
                                        <span
                                            key={tag}
                                            className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </header>

                {/* Article Content */}
                <article className="min-w-0 prose prose-invert prose-lg max-w-none">
                    <div className="mdx-content">
                        <MDXRemote
                            source={content}
                            components={components}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkMath, remarkGfm],
                                    rehypePlugins: [rehypeKatex],
                                },
                            }}
                        />
                    </div>
                </article>

                {/* Article Footer */}
                <footer className="mt-16 pt-8 border-t border-gray-800">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                        <div>
                            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
                            <p className="text-gray-400 leading-relaxed">
                                Awnon Bhowmik is a doctoral researcher in cybersecurity, a software engineer, and
                                a mathematics tutor at Varsity Tutors. His research spans
                                privacy-preserving machine learning, applied cryptography, and mathematical modeling.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold">Share this post</h4>
                            <div className="flex gap-2">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(`${SITE_URL}/blog/${resolvedParams.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center bg-accent hover:bg-accent-dark text-white px-3 py-2 rounded text-sm transition-colors"
                                >
                                    Twitter
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`${SITE_URL}/blog/${resolvedParams.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex min-h-11 items-center border border-accent text-accent hover:bg-accent hover:text-white px-3 py-2 rounded text-sm transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-800/80 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <Link
                            href="/blog"
                            className="inline-flex items-center text-gray-400 hover:text-accent transition-colors"
                        >
                            ← Back to Blog Index
                        </Link>
                        <BackToTopButton />
                    </div>
                </footer>
            </div>
        </div>
    );
}
