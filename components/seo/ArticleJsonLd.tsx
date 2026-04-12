import JsonLd from './JsonLd';
import type { Article } from '@/lib/content';

interface ArticleJsonLdProps {
  article: Article;
}

export default function ArticleJsonLd({ article }: ArticleJsonLdProps) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: article.image ? `https://machinestories.tn${article.image}` : undefined,
    author: {
      '@type': 'Person',
      name: article.author,
      url: 'https://machinestories.tn/a-propos',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Machine Stories',
      logo: {
        '@type': 'ImageObject',
        url: 'https://machinestories.tn/icon.svg',
      },
    },
    datePublished: article.date,
    dateModified: article.lastModified || article.date,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://machinestories.tn/blog/${article.slug}`,
    },
    wordCount: article.wordCount,
    articleSection: article.category,
    keywords: article.tags.join(', '),
  };

  return <JsonLd data={data} />;
}
