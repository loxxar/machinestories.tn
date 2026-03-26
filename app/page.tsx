import Link from 'next/link';
import { getAllArticles, getFeaturedArticles, getAllCategories } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';
import SearchBar from '@/components/blog/SearchBar';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';

const categories = [
  { name: 'Machine Learning', slug: 'machine-learning', description: 'Algorithmes qui apprennent des données' },
  { name: 'Deep Learning', slug: 'deep-learning', description: 'Réseaux de neurones profonds' },
  { name: 'IA Générative', slug: 'ia-generative', description: 'Création de contenu par l\'IA' },
  { name: 'Actualités IA', slug: 'actualites-ia', description: 'Dernières nouvelles du secteur' },
  { name: 'Tutoriels & Guides', slug: 'tutoriels-guides', description: 'Apprenez pas à pas' },
  { name: 'Outils & Applications', slug: 'outils-applications', description: 'Découvrez les meilleurs outils' },
  { name: 'Éthique & Société', slug: 'ethique-societe', description: 'Enjeux et réflexions' },
  { name: 'Business & IA', slug: 'business-ia', description: 'L\'IA dans le monde professionnel' },
];

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(3);
  const latestArticles = getAllArticles().slice(0, 6);

  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-gray-950 dark:via-gray-950 dark:to-accent-950/20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <Container className="relative py-20 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              L&apos;Intelligence Artificielle,
              <span className="text-primary-600 dark:text-primary-400"> expliquée simplement</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Tutoriels, analyses et actualités sur l&apos;IA. Restez informé sur le machine learning, le deep learning, ChatGPT et les dernières innovations.
            </p>
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
        </Container>
      </section>

      {featuredArticles.length > 0 && (
        <section className="py-16 bg-white dark:bg-gray-900">
          <Container>
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                Articles en vedette
              </h2>
              <Link href="/blog" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                Voir tous →
              </Link>
            </div>
            <div className="grid gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} featured />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-16 bg-gray-50 dark:bg-gray-950">
        <Container>
          <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Explorer par catégorie
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="group p-4 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl hover:border-primary-300 dark:hover:border-primary-700 transition-all"
              >
                <Badge variant="primary" className="mb-2">{cat.name}</Badge>
                <p className="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-white dark:bg-gray-900">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
              Derniers articles
            </h2>
            <Link href="/blog" className="text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
              Voir tous →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 bg-gradient-to-br from-primary-600 to-accent-600">
        <Container className="text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">
            Restez informé
          </h2>
          <p className="text-primary-100 mb-8 max-w-xl mx-auto">
            Recevez les derniers articles directement dans votre boîte mail. Aucune spam, promis.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="votre@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-white text-primary-600 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              S&apos;inscrire
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
