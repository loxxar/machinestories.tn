import { MetadataRoute } from 'next';
import { getAllArticles, getAllCategories, getAllTags } from '@/lib/content';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://machinestories.tn';
  const articles = getAllArticles();
  const categories = getAllCategories();
  const tags = getAllTags();

  const articleEntries = articles.map((article) => ({
    url: `${baseUrl}/blog/${article.slug}`,
    lastModified: new Date(article.lastModified || article.date),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  const categoryEntries = categories.map((category) => {
    const slug = category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      url: `${baseUrl}/categorie/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    };
  });

  const tagEntries = tags.map((tag) => {
    const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    return {
      url: `${baseUrl}/tag/${slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.4,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/a-propos`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/recherche`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.4,
    },
    ...articleEntries,
    ...categoryEntries,
    ...tagEntries,
  ];
}
