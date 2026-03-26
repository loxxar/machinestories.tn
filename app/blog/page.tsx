import type { Metadata } from 'next';
import { getPaginatedArticles, getAllCategories, getAllTags } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Blog - Intelligence Artificielle',
  description: 'Tous les articles sur l\'intelligence artificielle : tutoriels, actualités, analyses et guides sur le machine learning, deep learning, IA générative et ChatGPT.',
  alternates: {
    canonical: 'https://machinestories.tn/blog',
  },
};

interface PageProps {
  params: Promise<{ page?: string }>;
}

const ARTICLES_PER_PAGE = 9;

export async function generateStaticParams() {
  const { totalPages } = getPaginatedArticles(1, ARTICLES_PER_PAGE);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push({ page: i.toString() });
  }
  return pages;
}

export default async function BlogPage({ params }: PageProps) {
  const { page: pageParam } = await params;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const { articles, totalPages } = getPaginatedArticles(currentPage, ARTICLES_PER_PAGE);
  const categories = getAllCategories();
  const tags = getAllTags();

  return (
    <Container className="py-12">
      <Breadcrumb items={[{ name: 'Blog', href: '/blog' }]} />

      <header className="mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
          Blog Intelligence Artificielle
        </h1>
        <p className="text-slate-400 max-w-2xl">
          Découvrez tous nos articles sur l&apos;IA : tutoriels pratiques, analyses approfondies et dernières actualités sur le machine learning, le deep learning et l&apos;IA générative.
        </p>
      </header>

      <div className="grid lg:grid-cols-[1fr_280px] gap-8">
        <main>
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {articles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
                  className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  ← Précédent
                </Link>
              )}
              
              <span className="px-4 py-2 text-sm text-slate-500">
                Page {currentPage} sur {totalPages}
              </span>

              {currentPage < totalPages && (
                <Link
                  href={`/blog/page/${currentPage + 1}`}
                  className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Suivant →
                </Link>
              )}
            </nav>
          )}
        </main>

        <aside className="space-y-8">
          <div>
            <h2 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Catégories
            </h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => {
                const slug = cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <Badge key={cat} variant="default" href={`/categorie/${slug}`}>
                    {cat}
                  </Badge>
                );
              })}
            </div>
          </div>

          <div>
            <h2 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wide">
              Tags populaires
            </h2>
            <div className="flex flex-wrap gap-2">
              {tags.slice(0, 20).map((tag) => {
                const slug = tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return (
                  <Badge key={tag} variant="default" href={`/tag/${slug}`}>
                    {tag}
                  </Badge>
                );
              })}
            </div>
          </div>
        </aside>
      </div>
    </Container>
  );
}
