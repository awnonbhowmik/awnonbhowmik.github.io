import { notFound } from 'next/navigation';
import { getBlogPost, getBlogPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import Link from 'next/link';
import 'katex/dist/katex.css';

// Custom components for MDX
const components = {
    h1: (props: React.HTMLProps<HTMLHeadingElement>) => <h1 className="text-4xl font-bold mb-6 text-white" {...props} />,
    h2: (props: React.HTMLProps<HTMLHeadingElement>) => <h2 className="text-3xl font-bold mb-4 mt-8 text-white" {...props} />,
    h3: (props: React.HTMLProps<HTMLHeadingElement>) => <h3 className="text-2xl font-bold mb-3 mt-6 text-white" {...props} />,
    h4: (props: React.HTMLProps<HTMLHeadingElement>) => <h4 className="text-xl font-bold mb-2 mt-4 text-white" {...props} />,
    p: (props: React.HTMLProps<HTMLParagraphElement>) => <p className="mb-4 text-gray-300 leading-relaxed" {...props} />,
    ul: (props: React.HTMLProps<HTMLUListElement>) => <ul className="mb-4 ml-6 list-disc text-gray-300" {...props} />,
    ol: (props: React.OlHTMLAttributes<HTMLOListElement>) => <ol className="mb-4 ml-6 list-decimal text-gray-300" {...props} />,
    li: (props: React.HTMLProps<HTMLLIElement>) => <li className="mb-1" {...props} />,
    blockquote: (props: React.HTMLProps<HTMLQuoteElement>) => (
        <blockquote className="border-l-4 border-blue-500 pl-4 my-4 italic text-gray-400" {...props} />
    ),
    code: (props: React.HTMLProps<HTMLElement>) => (
        <code className="bg-gray-800 px-2 py-1 rounded text-sm font-mono text-blue-300" {...props} />
    ),
    pre: (props: React.HTMLProps<HTMLPreElement>) => (
        <pre className="bg-gray-800 p-4 rounded-lg overflow-x-auto mb-4 border border-gray-700" {...props} />
    ),
    a: (props: React.HTMLProps<HTMLAnchorElement>) => (
        <a
            className="text-blue-400 hover:text-blue-300 underline transition-colors"
            target={props.href?.startsWith('http') ? '_blank' : undefined}
            rel={props.href?.startsWith('http') ? 'noopener noreferrer' : undefined}
            {...props}
        />
    ),
    img: (props: React.HTMLProps<HTMLImageElement>) => (
        // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
        <img className="max-w-full h-auto rounded-lg my-4 mx-auto" {...props} />
    ),
    table: (props: React.HTMLProps<HTMLTableElement>) => (
        <div className="overflow-x-auto mb-4">
            <table className="min-w-full border-collapse border border-gray-600" {...props} />
        </div>
    ),
    th: (props: React.HTMLProps<HTMLTableCellElement>) => (
        <th className="border border-gray-600 px-4 py-2 bg-gray-800 text-white font-semibold" {...props} />
    ),
    td: (props: React.HTMLProps<HTMLTableCellElement>) => (
        <td className="border border-gray-600 px-4 py-2 text-gray-300" {...props} />
    ),
};

export async function generateStaticParams() {
    const posts = await getBlogPosts();
    return posts.map((post: { slug: string }) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
        openGraph: {
            title: post.frontmatter.title,
            description: post.frontmatter.excerpt || `Read about ${post.frontmatter.title}`,
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
            <div className="container mx-auto px-4 py-12 max-w-4xl">
                {/* Navigation */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center gap-4">
                        <Link
                            href="/"
                            className="inline-flex items-center text-gray-400 hover:text-blue-300 transition-colors group"
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
                            className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
                        >
                            ← Back to Blog
                        </Link>
                    </div>
                </div>

                {/* Article Header */}
                <header className="mb-12">
                    <div className="mb-4">
                        <span className="inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full uppercase tracking-wide">
                            {frontmatter.category?.replace('-', ' ')}
                        </span>
                    </div>

                    <h1 className="text-5xl font-bold mb-6 leading-tight">
                        {frontmatter.title}
                    </h1>

                    {frontmatter.excerpt && (
                        <p className="text-xl text-gray-400 mb-6 leading-relaxed">
                            {frontmatter.excerpt}
                        </p>
                    )}

                    <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm">
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
                <article className="prose prose-invert prose-lg max-w-none">
                    <div className="mdx-content">
                        <MDXRemote
                            source={content}
                            components={components}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkMath],
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
                            <p className="text-gray-400">
                                Awnon Bhowmik is a researcher and academic working in the field of computer science.
                                Connect with him for discussions on research, technology, and academic pursuits.
                            </p>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold">Share this post</h4>
                            <div className="flex gap-2">
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(frontmatter.title)}&url=${encodeURIComponent(`https://awnonbhowmik.github.io/blog/${resolvedParams.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded text-sm transition-colors"
                                >
                                    Twitter
                                </a>
                                <a
                                    href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://awnonbhowmik.github.io/blog/${resolvedParams.slug}`)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-700 hover:bg-blue-800 text-white px-3 py-2 rounded text-sm transition-colors"
                                >
                                    LinkedIn
                                </a>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
