import Link from 'next/link';
import Image from 'next/image';
import { formatDate, formatDateISO, slugify } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import type { Article } from '@/lib/content';

interface SimilarArticlesProps {
  articles: Article[];
}

export default function SimilarArticles({ articles }: SimilarArticlesProps) {
  if (articles.length === 0) return null;

  return (
    <section aria-labelledby="similar-heading" className="mt-12 pt-8 border-t border-white/10">
      <h2 id="similar-heading" className="font-heading text-xl font-bold text-white mb-6">
        Articles similaires
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.map((article) => {
          const categorySlug = slugify(article.category);
          
          return (
            <article key={article.slug}>
              <Card hover>
                {article.image && (
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={article.image}
                      alt={article.imageAlt || article.title}
                      fill
                      className="object-cover transition-transform hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      loading="lazy"
                    />
                  </div>
                )}
                <div className="p-4">
                  <Badge variant="primary" href={`/categorie/${categorySlug}`} className="mb-2">
                    {article.category}
                  </Badge>
                  <h3 className="font-heading text-sm font-semibold text-white mb-2 line-clamp-2">
                    <Link href={article.route} className="hover:text-cyan-400 transition-colors">
                      {article.title}
                    </Link>
                  </h3>
                  <time dateTime={formatDateISO(article.date)} className="text-xs text-slate-500">
                    {formatDate(article.date)}
                  </time>
                </div>
              </Card>
            </article>
          );
        })}
      </div>
    </section>
  );
}
