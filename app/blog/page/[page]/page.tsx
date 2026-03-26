import type { Metadata } from 'next';
import { getPaginatedArticles } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ page: string }>;
}

const ARTICLES_PER_PAGE = 9;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `Blog - Page ${page}`,
    description: `Page ${page} des articles sur l'intelligence artificielle.`,
    alternates: {
      canonical: `https://nodes.tn/blog/page/${page}`,
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
    <Container className="py-12">
      <Breadcrumb items={[
        { name: 'Blog', href: '/blog' },
        { name: `Page ${currentPage}`, href: `/blog/page/${currentPage}` },
      ]} />

      <header className="mb-12">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Blog Intelligence Artificielle
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Page {currentPage} sur {totalPages}
        </p>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <nav aria-label="Pagination" className="mt-12 flex justify-center gap-2">
        {currentPage > 2 && (
          <Link
            href="/blog"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ← Page 1
          </Link>
        )}
        
        {currentPage > 1 && (
          <Link
            href={`/blog/page/${currentPage - 1}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            ← Précédent
          </Link>
        )}
        
        <span className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">
          Page {currentPage} sur {totalPages}
        </span>

        {currentPage < totalPages && (
          <Link
            href={`/blog/page/${currentPage + 1}`}
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Suivant →
          </Link>
        )}
      </nav>
    </Container>
  );
}
