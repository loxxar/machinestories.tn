import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Link from 'next/link';
import { getArticlesByCategory } from '@/lib/content';
import { getAllCategories } from '@/lib/categories';
import { slugify } from '@/lib/utils';
import ArticleCard from '@/components/blog/ArticleCard';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/layout/Breadcrumb';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const officialCategories = getAllCategories();
  const allArticles = (await import('@/lib/content')).getAllArticles();
  
  const officialSlugs = officialCategories.map(c => c.slug);
  const articleSlugs = allArticles.map(a => slugify(a.category));
  
  const allSlugs = Array.from(new Set([...officialSlugs, ...articleSlugs]));
  
  return allSlugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const categories = getAllCategories();
  const officialCategory = categories.find((c) => c.slug === slug);
  
  let name = officialCategory?.name;
  if (!name) {
    const allArticles = (await import('@/lib/content')).getAllArticles();
    name = allArticles.find(a => slugify(a.category) === slug)?.category;
  }
  
  if (!name) return {};
  
  return {
    title: `${name} - Blog IA | Machine Stories`,
    description: `Articles sur ${name.toLowerCase()} : tutoriels, analyses et actualités en intelligence artificielle.`,
    alternates: {
      canonical: `https://machinestories.tn/categorie/${slug}`,
    },
  };
}

const categoryData: Record<string, { icon: string; description: string; color: string }> = {
  'machine-learning': { icon: '🧠', description: 'Les algorithmes qui apprennent des données pour s\'améliorer automatiquement.', color: 'from-cyan-500 to-blue-500' },
  'deep-learning': { icon: '🔮', description: 'Réseaux de neurones profonds capable de traiter des données complexes.', color: 'from-purple-500 to-pink-500' },
  'ia-generative': { icon: '✨', description: 'L\'IA qui crée du contenu : texte, images, musique, code.', color: 'from-amber-500 to-orange-500' },
  'actualites-ia': { icon: '📰', description: 'Les dernières nouvelles et avancées en intelligence artificielle.', color: 'from-red-500 to-rose-500' },
  'tutoriels-guides': { icon: '📚', description: 'Apprenez à utiliser l\'IA avec nos guides pas à pas.', color: 'from-green-500 to-emerald-500' },
  'outils-applications': { icon: '🛠️', description: 'Découvrez les meilleurs outils et applications IA du marché.', color: 'from-blue-500 to-indigo-500' },
  'ethique-societe': { icon: '⚖️', description: 'Les enjeux éthiques et sociétaux posés par l\'intelligence artificielle.', color: 'from-violet-500 to-purple-500' },
  'business-ia': { icon: '💼', description: 'Comment l\'IA transforme le monde des affaires et l\'entreprise.', color: 'from-slate-400 to-gray-500' },
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const officialCategories = getAllCategories();
  const officialCategory = officialCategories.find((c) => c.slug === slug);
  
  let categoryName = officialCategory?.name;
  const allArticles = (await import('@/lib/content')).getAllArticles();
  
  if (!categoryName) {
    const matchingArticle = allArticles.find(a => slugify(a.category) === slug);
    if (matchingArticle) {
      categoryName = matchingArticle.category;
    }
  }
  
  if (!categoryName) notFound();

  const articles = (await import('@/lib/content')).getArticlesByCategory(categoryName);
  
  // Si c'est une catégorie non officielle et qu'elle est vide, ou si elle n'existe vraiment pas
  if (articles.length === 0 && !officialCategory) {
    notFound();
  }

  const data = categoryData[slug] || { icon: '📂', description: `Articles sur ${categoryName.toLowerCase()}.`, color: 'from-cyan-500 to-blue-500' };
  const displayName = categoryName;

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16">
        <div className="absolute inset-0">
          <div className={`absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r ${data.color} opacity-10 rounded-full blur-[120px]`} />
          <div className={`absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r ${data.color} opacity-10 rounded-full blur-[120px]`} />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Breadcrumb items={[{ name: 'Blog', href: '/blog' }, { name: displayName, href: `/categorie/${slug}` }]} />
          
          <div className="mt-8 max-w-2xl">
            <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${data.color} mb-6`}>
              <span className="text-3xl">{data.icon}</span>
            </div>
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              <span className={`bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>{displayName}</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              {data.description}
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
              <span className="text-5xl mb-4 block">{data.icon}</span>
              <p className="text-slate-400">Aucun article dans cette catégorie pour le moment.</p>
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
                  <div className={`absolute -inset-px bg-gradient-to-r ${data.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity -z-10 blur-sm`} />
                  <ArticleCard article={article} />
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Other Categories */}
      <section className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-xl font-bold text-white mb-6">Explorer d&apos;autres catégories</h2>
          <div className="flex flex-wrap gap-3">
            {categories.filter(c => c.slug !== slug).map((cat) => (
              <Link key={cat.slug} href={`/categorie/${cat.slug}`}>
                <Badge variant="default">{cat.name}</Badge>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
