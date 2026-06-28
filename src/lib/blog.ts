import fs from 'fs';
import path from 'path';
import { load as loadYaml } from 'js-yaml';

export interface BlogPostFrontmatter {
  title: string;
  date: string;
  category: string;
  tags: string[];
  excerpt: string;
}

export interface BlogPost {
  slug: string;
  frontmatter: BlogPostFrontmatter;
  content: string;
  readingTime: string;
}

const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readingTime = Math.ceil(words / wordsPerMinute);
  return `${readingTime} min read`;
};

const parseMdxFrontmatter = (
  fileContents: string
): { frontmatter: BlogPostFrontmatter; content: string } => {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = fileContents.match(frontmatterRegex);

  if (!match) {
    return {
      frontmatter: {} as BlogPostFrontmatter,
      content: fileContents,
    };
  }

  const [, rawFrontmatter] = match;
  const parsed = loadYaml(rawFrontmatter);
  const frontmatter =
    parsed && typeof parsed === 'object' ? (parsed as BlogPostFrontmatter) : ({} as BlogPostFrontmatter);

  return {
    frontmatter,
    content: fileContents.slice(match[0].length),
  };
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  
  if (!fs.existsSync(blogDirectory)) {
    return [];
  }

  const filenames = fs.readdirSync(blogDirectory);
  const posts = filenames
    .filter((name: string) => name.endsWith('.mdx'))
    .map((filename: string) => {
      const slug = filename.replace(/\.mdx$/, '');
      const fullPath = path.join(blogDirectory, filename);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { frontmatter, content } = parseMdxFrontmatter(fileContents);
      const readingTime = calculateReadingTime(content);

      return {
        slug,
        frontmatter: frontmatter as BlogPostFrontmatter,
        content,
        readingTime,
      };
    })
    .sort((a: BlogPost, b: BlogPost) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Sanitize slug to prevent path traversal attacks
  // Only allow alphanumeric characters, hyphens, and underscores
  const sanitizedSlug = slug.replace(/[^a-zA-Z0-9-_]/g, '');
  
  if (!sanitizedSlug || sanitizedSlug !== slug) {
    // If slug contains invalid characters, return null
    return null;
  }
  
  const blogDirectory = path.join(process.cwd(), 'src/content/blog');
  const fullPath = path.join(blogDirectory, `${sanitizedSlug}.mdx`);
  
  // Verify the resolved path is still within the blog directory
  // This prevents path traversal attacks like ../../../etc/passwd
  // Using path.relative() and checking for '..' is more robust than startsWith
  const relativePath = path.relative(blogDirectory, fullPath);
  
  // If relative path contains '..', the file is outside the blog directory
  // Also check if relative path is empty or starts with path separator
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null;
  }
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { frontmatter, content } = parseMdxFrontmatter(fileContents);
  const readingTime = calculateReadingTime(content);

  return {
    slug: sanitizedSlug,
    frontmatter: frontmatter as BlogPostFrontmatter,
    content,
    readingTime,
  };
}
