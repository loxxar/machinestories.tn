import type { Metadata } from 'next';
import { getPaginatedArticles } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ page: string }>;
}

const ARTICLES_PER_PAGE = 9;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog - Page ${page} | Machine Stories`,
    description: `Page ${page} des articles sur l'intelligence artificielle.`,
    alternates: {
      canonical: `https://machinestories.tn/blog/page/${page}`,
    },
  };
}

export async function generateStaticParams() {
  const { totalPages } = getPaginatedArticles(1, ARTICLES_PER_PAGE);
  const pages = [];
  for (let i = 2; i <= totalPages; i++) {
    pages.push({ page: i.toString() });
  }
  return pages;
}

export default async function BlogPage({ params }: PageProps) {
  const { page: pageParam } = await params;
  const currentPage = parseInt(pageParam, 10);
  const { articles, totalPages } = getPaginatedArticles(currentPage, ARTICLES_PER_PAGE);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-12">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Breadcrumb items={[
            { name: 'Blog', href: '/blog' },
            { name: `Page ${currentPage}`, href: `/blog/page/${currentPage}` },
          ]} />
          
          <div className="mt-8 max-w-2xl">
            <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
              Blog <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Intelligence Artificielle</span>
            </h1>
            <p className="text-slate-400">Page {currentPage} sur {totalPages}</p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <article key={article.slug} className="group relative" style={{ animationDelay: `${index * 50}ms` }}>
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm" />
                <ArticleCard article={article} />
              </article>
            ))}
          </div>

          {/* Pagination */}
          <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
            {currentPage > 2 && (
              <Link
                href="/blog"
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-800 hover:border-cyan-500/30 transition-all"
              >
                ← Page 1
              </Link>
            )}
            
            {currentPage > 1 && (
              <Link
                href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-800 hover:border-cyan-500/30 transition-all flex items-center gap-1"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Précédent
              </Link>
            )}
            
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Link
                  key={page}
                  href={page === 1 ? '/blog' : `/blog/page/${page}`}
                  className={`w-10 h-10 flex items-center justify-center text-sm font-medium rounded-lg transition-all ${
                    page === currentPage
                      ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/25'
                      : 'text-slate-400 bg-slate-900 border border-white/10 hover:bg-slate-800 hover:border-cyan-500/30'
                  }`}
                >
                  {page}
                </Link>
              ))}
            </div>

            {currentPage < totalPages && (
              <Link
                href={`/blog/page/${currentPage + 1}`}
                className="px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-800 hover:border-cyan-500/30 transition-all flex items-center gap-1"
              >
                Suivant
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            )}
          </nav>
        </div>
      </section>
    </div>
  );
}
