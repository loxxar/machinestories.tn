import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatDateISO } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Article } from '@/lib/content';

interface ArticleCardProps {
  article: Article;
  featured?: boolean;
}

export default function ArticleCard({ article, featured = false }: ArticleCardProps) {
  const categorySlug = article.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  if (featured) {
    return (
      <article className="grid md:grid-cols-2 gap-6 bg-gray-900/80 border border-white/5 rounded-xl overflow-hidden">
        {article.image && (
          <div className="relative aspect-video md:aspect-auto overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              loading="eager"
            />
          </div>
        )}
        <div className="p-6 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="primary" href={`/categorie/${categorySlug}`}>
              {article.category}
            </Badge>
            <span className="text-xs text-gray-500">
              {article.readingTime} min de lecture
            </span>
          </div>
          <h2 className="font-heading text-2xl font-bold text-white mb-3 line-clamp-2">
            <Link href={article.route} className="hover:text-violet-300 transition-colors">
              {article.title}
            </Link>
          </h2>
          <p className="text-gray-400 mb-4 line-clamp-3">
            {article.description}
          </p>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <time dateTime={formatDateISO(article.date)} className="text-sm text-gray-500">
                {formatDate(article.date)}
              </time>
              <span className="text-gray-600">•</span>
              <span className="text-sm text-gray-500">{article.author}</span>
            </div>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article>
      <Card hover>
        {article.image && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={article.image}
              alt={article.imageAlt || article.title}
              fill
              className="object-cover transition-transform hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              loading="lazy"
            />
          </div>
        )}
        <div className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Badge variant="primary" href={`/categorie/${categorySlug}`}>
              {article.category}
            </Badge>
            <span className="text-xs text-gray-500">
              {article.readingTime} min
            </span>
          </div>
          <h2 className="font-heading text-lg font-bold text-white mb-2 line-clamp-2">
            <Link href={article.route} className="hover:text-violet-300 transition-colors">
              {article.title}
            </Link>
          </h2>
          <p className="text-sm text-gray-400 mb-4 line-clamp-2">
            {article.description}
          </p>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <time dateTime={formatDateISO(article.date)}>{formatDate(article.date)}</time>
            <span>•</span>
            <span>{article.author}</span>
          </div>
        </div>
      </Card>
    </article>
  );
}
