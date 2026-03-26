import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { getArticlesByCategory, getAllCategories } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const categories = getAllCategories();
  return categories.map((cat) => ({
    slug: cat.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find(
    (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
  );
  
  if (!category) return {};
  
  return {
    title: `${category} - Blog IA`,
    description: `Articles sur ${category.toLowerCase()} : tutoriels, analyses et actualités.`,
    alternates: {
      canonical: `https://machinestories.tn/categorie/${slug}`,
    },
  };
}

const DESCRIPTIONS: Record<string, string> = {
  'machine-learning': 'Algorithmes et modèles qui permettent aux machines d\'apprendre à partir de données.',
  'deep-learning': 'Réseaux de neurones profonds et architectures avancées.',
  'ia-generative': 'IA capable de créer du contenu : texte, images, musique, code.',
  'actualites-ia': 'Dernières nouvelles et avancées en intelligence artificielle.',
  'tutoriels-guides': 'Apprenez à utiliser l\'IA avec nos guides pas à pas.',
  'outils-applications': 'Découvrez les meilleurs outils et applications IA.',
  'ethique-societe': 'Enjeux éthiques et sociétaux de l\'IA.',
  'business-ia': 'L\'IA dans le monde des affaires et l\'entreprise.',
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const categories = getAllCategories();
  const category = categories.find(
    (c) => c.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') === slug
  );
  
  if (!category) notFound();

  const articles = getArticlesByCategory(category);

  return (
    <Container className="py-8">
      <Breadcrumb items={[{ name: 'Blog', href: '/blog' }, { name: category, href: `/categorie/${slug}` }]} />

      <header className="mb-8">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">{category}</h1>
        <p className="text-sm text-slate-400">{DESCRIPTIONS[slug] || `Articles sur ${category.toLowerCase()}.`}</p>
      </header>

      {articles.length === 0 ? (
        <p className="text-slate-500">Aucun article dans cette catégorie.</p>
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
