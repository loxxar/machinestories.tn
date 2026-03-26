import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export interface Article {
  slug: string;
  title: string;
  description: string;
  date: string;
  lastModified?: string;
  author: string;
  category: string;
  tags: string[];
  image?: string;
  imageAlt?: string;
  featured: boolean;
  draft: boolean;
  readingTime: number;
  wordCount: number;
  body: { raw: string };
  route: string;
}

function parseArticle(filename: string): Article | null {
  try {
    const slug = filename.replace(/\.mdx$/, '');
    const fullPath = path.join(contentDirectory, filename);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      title: data.title || '',
      description: data.description || '',
      date: data.date || new Date().toISOString(),
      lastModified: data.lastModified,
      author: data.author || 'Équipe Nodes.tn',
      category: data.category || 'Actualités IA',
      tags: data.tags || [],
      image: data.image,
      imageAlt: data.imageAlt,
      featured: data.featured || false,
      draft: data.draft || false,
      readingTime: Math.ceil(stats.minutes),
      wordCount: content.split(/\s+/).length,
      body: { raw: content },
      route: `/blog/${slug}`,
    };
  } catch {
    return null;
  }
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(contentDirectory)) {
    return [];
  }
  const filenames = fs.readdirSync(contentDirectory);
  const articles = filenames
    .filter((f) => f.endsWith('.mdx'))
    .map(parseArticle)
    .filter((a): a is Article => a !== null && !a.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  return articles;
}

export function getArticleBySlug(slug: string): Article | undefined {
  return getAllArticles().find((article) => article.slug === slug);
}

export function getArticlesByCategory(category: string): Article[] {
  return getAllArticles().filter(
    (article) => article.category.toLowerCase() === category.toLowerCase()
  );
}

export function getArticlesByTag(tag: string): Article[] {
  return getAllArticles().filter((article) =>
    article.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

export function getFeaturedArticles(limit = 3): Article[] {
  return getAllArticles().filter((article) => article.featured).slice(0, limit);
}

export function getSimilarArticles(article: Article, limit = 3): Article[] {
  const all = getAllArticles().filter((a) => a.slug !== article.slug);
  const scored = all.map((a) => {
    let score = 0;
    if (a.category === article.category) score += 3;
    const commonTags = a.tags.filter((t) => article.tags.includes(t)).length;
    score += commonTags;
    return { article: a, score };
  });
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.article);
}

export function getAllCategories(): string[] {
  const categories = new Set(getAllArticles().map((a) => a.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tags = new Set(getAllArticles().flatMap((a) => a.tags));
  return Array.from(tags);
}

export function getPaginatedArticles(page: number, perPage = 10): {
  articles: Article[];
  totalPages: number;
  currentPage: number;
} {
  const all = getAllArticles();
  const totalPages = Math.ceil(all.length / perPage);
  const articles = all.slice((page - 1) * perPage, page * perPage);
  return { articles, totalPages, currentPage: page };
}

export function generateArticleMetadata(article: Article) {
  const url = `https://nodes.tn/blog/${article.slug}`;
  return {
    title: `${article.title} | Nodes.tn - Blog Intelligence Artificielle`,
    description: article.description,
    authors: [{ name: article.author }],
    openGraph: {
      title: article.title,
      description: article.description,
      url,
      siteName: 'Nodes.tn',
      images: [
        {
          url: `https://nodes.tn/api/og/${article.slug}`,
          width: 1200,
          height: 630,
        },
      ],
      locale: 'fr_FR',
      type: 'article',
      publishedTime: article.date,
      modifiedTime: article.lastModified || article.date,
      section: article.category,
      tags: article.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [`https://nodes.tn/api/og/${article.slug}`],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large' as const,
        'max-snippet': -1,
      },
    },
  };
}
