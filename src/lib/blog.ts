import fs from 'fs';
import path from 'path';
import { JSON_SCHEMA, load as loadYaml } from 'js-yaml';

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

const BLOG_DIRECTORY = path.join(process.cwd(), 'src/content/blog');
const BLOG_SLUG_PATTERN = /^[a-zA-Z0-9_-]+$/;
const MAX_FRONTMATTER_SIZE = 32 * 1024;
const MAX_POST_SIZE = 2 * 1024 * 1024;

const calculateReadingTime = (content: string): string => {
  const wordsPerMinute = 200;
  const words = content.trim().match(/\S+/g)?.length ?? 0;
  const readingTime = Math.max(1, Math.ceil(words / wordsPerMinute));
  return `${readingTime} min read`;
};

const requiredString = (
  value: unknown,
  field: keyof Omit<BlogPostFrontmatter, 'tags'>,
  maxLength: number
): string => {
  if (typeof value !== 'string') {
    throw new Error(`Blog frontmatter field "${field}" must be a string.`);
  }

  const normalized = value.trim();
  if (!normalized || normalized.length > maxLength) {
    throw new Error(
      `Blog frontmatter field "${field}" must contain 1-${maxLength} characters.`
    );
  }

  return normalized;
};

const validateFrontmatter = (value: unknown): BlogPostFrontmatter => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new Error('Blog frontmatter must be a YAML object.');
  }

  const parsed = value as Record<string, unknown>;
  const date = requiredString(parsed.date, 'date', 10);
  const parsedDate = new Date(`${date}T00:00:00.000Z`);

  if (
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    Number.isNaN(parsedDate.getTime()) ||
    parsedDate.toISOString().slice(0, 10) !== date
  ) {
    throw new Error('Blog frontmatter field "date" must be a valid YYYY-MM-DD date.');
  }

  if (!Array.isArray(parsed.tags) || parsed.tags.length > 20) {
    throw new Error('Blog frontmatter field "tags" must be an array with at most 20 items.');
  }

  const tags = parsed.tags.map((tag, index) => {
    if (typeof tag !== 'string' || !tag.trim() || tag.trim().length > 80) {
      throw new Error(`Blog frontmatter tag ${index + 1} must contain 1-80 characters.`);
    }
    return tag.trim();
  });

  return {
    title: requiredString(parsed.title, 'title', 200),
    date,
    category: requiredString(parsed.category, 'category', 80),
    tags,
    excerpt: requiredString(parsed.excerpt, 'excerpt', 500),
  };
};

const parseMdxFrontmatter = (
  fileContents: string
): { frontmatter: BlogPostFrontmatter; content: string } => {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;
  const match = fileContents.match(frontmatterRegex);

  if (!match) {
    throw new Error('Blog post is missing YAML frontmatter.');
  }

  const [, rawFrontmatter] = match;
  if (Buffer.byteLength(rawFrontmatter, 'utf8') > MAX_FRONTMATTER_SIZE) {
    throw new Error('Blog frontmatter exceeds the 32 KiB size limit.');
  }

  const parsed = loadYaml(rawFrontmatter, { schema: JSON_SCHEMA });
  const frontmatter = validateFrontmatter(parsed);

  return {
    frontmatter,
    content: fileContents.slice(match[0].length),
  };
};

const readBlogFile = (slug: string): string | null => {
  if (!BLOG_SLUG_PATTERN.test(slug) || !fs.existsSync(BLOG_DIRECTORY)) {
    return null;
  }

  const fullPath = path.resolve(BLOG_DIRECTORY, `${slug}.mdx`);
  const relativePath = path.relative(BLOG_DIRECTORY, fullPath);
  if (relativePath.startsWith('..') || path.isAbsolute(relativePath)) {
    return null;
  }

  try {
    const fileStat = fs.lstatSync(fullPath);
    if (!fileStat.isFile() || fileStat.size > MAX_POST_SIZE) {
      return null;
    }

    // Reject symlinks and verify the resolved target remains inside the content
    // directory so a crafted repository cannot expose build-host files.
    const blogDirectoryRealPath = fs.realpathSync(BLOG_DIRECTORY);
    const fileRealPath = fs.realpathSync(fullPath);
    const realRelativePath = path.relative(blogDirectoryRealPath, fileRealPath);
    if (realRelativePath.startsWith('..') || path.isAbsolute(realRelativePath)) {
      return null;
    }

    return fs.readFileSync(fileRealPath, 'utf8');
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return null;
    }
    throw error;
  }
};

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!fs.existsSync(BLOG_DIRECTORY)) {
    return [];
  }

  const posts = fs
    .readdirSync(BLOG_DIRECTORY, { withFileTypes: true })
    .filter(
      (entry) =>
        entry.isFile() &&
        entry.name.endsWith('.mdx') &&
        BLOG_SLUG_PATTERN.test(entry.name.slice(0, -4))
    )
    .flatMap((entry) => {
      const slug = entry.name.slice(0, -4);
      const fileContents = readBlogFile(slug);
      if (fileContents === null) return [];

      const { frontmatter, content } = parseMdxFrontmatter(fileContents);
      const readingTime = calculateReadingTime(content);

      return [{
        slug,
        frontmatter,
        content,
        readingTime,
      }];
    })
    .sort((a: BlogPost, b: BlogPost) => 
      new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime()
    );

  return posts;
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  if (!BLOG_SLUG_PATTERN.test(slug)) {
    return null;
  }

  const fileContents = readBlogFile(slug);
  if (fileContents === null) return null;

  const { frontmatter, content } = parseMdxFrontmatter(fileContents);
  const readingTime = calculateReadingTime(content);

  return {
    slug,
    frontmatter,
    content,
    readingTime,
  };
}
