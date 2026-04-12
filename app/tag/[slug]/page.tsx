import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticlesByTag, getAllTags } from '@/lib/content';
import { slugify } from '@/lib/utils';
import ArticleCard from '@/components/blog/ArticleCard';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: slugify(tag),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = getAllTags();
  const tag = tags.find((t) => slugify(t) === slug);
  
  if (!tag) return {};
  
  return {
    title: `#${tag} - Blog IA | Machine Stories`,
    description: `Articles tagués "${tag}" sur l'intelligence artificielle.`,
    alternates: { canonical: `https://machinestories.tn/tag/${slug}` },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tags = getAllTags();
  const tag = tags.find((t) => slugify(t) === slug);
  
  if (!tag) notFound();

  const articles = getArticlesByTag(tag);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Breadcrumb items={[{ name: 'Blog', href: '/blog' }, { name: `#${tag}`, href: `/tag/${slug}` }]} />
          
          <div className="mt-8 max-w-2xl">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 mb-6">
              <span className="text-2xl font-bold text-white">#</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">{tag}</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Tous les articles tagués avec ce mot-clé
            </p>
            <p className="text-sm text-slate-500 mt-3">
              {articles.length} article{articles.length !== 1 ? 's' : ''} disponible{articles.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          {articles.length === 0 ? (
            <div className="text-center py-16">
              <span className="text-5xl mb-4 block">#</span>
              <p className="text-slate-400">Aucun article avec ce tag pour le moment.</p>
              <Link href="/blog" className="inline-flex items-center gap-2 mt-4 text-cyan-400 hover:text-cyan-300 transition-colors">
                Retourner au blog
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, index) => (
                <article key={article.slug} className="group relative" style={{ animationDelay: `${index * 50}ms` }}>
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity -z-10 blur-sm" />
                  <ArticleCard article={article} />
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Popular Tags */}
      <section className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-xl font-bold text-white mb-6">Tags populaires</h2>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 20).map((t) => (
              <Link key={t} href={`/tag/${slugify(t)}`}>
                <Badge variant="default">#{t}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
