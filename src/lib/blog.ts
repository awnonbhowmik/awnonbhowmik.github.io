import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

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
      const { data: frontmatter, content } = matter(fileContents);
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
  const fullPath = path.join(process.cwd(), 'src/content/blog', `${slug}.mdx`);
  
  if (!fs.existsSync(fullPath)) {
    return null;
  }

  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data: frontmatter, content } = matter(fileContents);
  const readingTime = calculateReadingTime(content);

  return {
    slug,
    frontmatter: frontmatter as BlogPostFrontmatter,
    content,
    readingTime,
  };
}
