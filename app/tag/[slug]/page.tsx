import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticlesByTag, getAllTags } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const tags = getAllTags();
  const tag = tags.find(
    (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
  );
  
  if (!tag) return {};
  
  return {
    title: `Tag: ${tag} - Blog IA`,
    description: `Articles tagués "${tag}" sur l'intelligence artificielle.`,
    alternates: { canonical: `https://machinestories.tn/tag/${slug}` },
  };
}

export default async function TagPage({ params }: PageProps) {
  const { slug } = await params;
  const tags = getAllTags();
  const tag = tags.find(
    (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
  );
  
  if (!tag) notFound();

  const articles = getArticlesByTag(tag);

  return (
    <Container className="py-8">
      <Breadcrumb items={[{ name: 'Blog', href: '/blog' }, { name: `Tag: ${tag}`, href: `/tag/${slug}` }]} />

      <header className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">Tag: {tag}</h1>
        <p className="text-sm text-slate-400">{articles.length} article{articles.length !== 1 ? 's' : ''}</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-slate-500">Aucun article avec ce tag.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      )}
    </Container>
  );
}
