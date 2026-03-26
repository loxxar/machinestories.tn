import Link from 'next/link';
import { getAllArticles, getFeaturedArticles } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';
import SearchBar from '@/components/blog/SearchBar';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';

const categories = [
  { name: 'Machine Learning', slug: 'machine-learning', icon: '🧠', description: 'Les algorithmes qui apprennent' },
  { name: 'Deep Learning', slug: 'deep-learning', icon: '🔮', description: 'Réseaux de neurones profonds' },
  { name: 'IA Générative', slug: 'ia-generative', icon: '✨', description: 'Création de contenu par l\'IA' },
  { name: 'Actualités IA', slug: 'actualites-ia', icon: '📰', description: 'Dernières nouvelles du secteur' },
  { name: 'Tutoriels & Guides', slug: 'tutoriels-guides', icon: '📚', description: 'Apprenez pas à pas' },
  { name: 'Outils & Applications', slug: 'outils-applications', icon: '🛠️', description: 'Découvrez les meilleurs outils' },
  { name: 'Éthique & Société', slug: 'ethique-societe', icon: '⚖️', description: 'Enjeux et réflexions' },
  { name: 'Business & IA', slug: 'business-ia', icon: '💼', description: 'L\'IA dans l\'entreprise' },
];

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(3);
  const latestArticles = getAllArticles().slice(0, 6);

  return (
    <>
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/20 rounded-full blur-[128px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-[128px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[128px]" />
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(2,6,23,0.5)_50%,rgba(2,6,23,1)_100%)] z-10" />
        
        <Container className="relative z-20 py-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm text-gray-300">Votre source sur l&apos;IA en français</span>
            </div>
            
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                L&apos;Intelligence Artificielle,
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-violet-400 bg-clip-text text-transparent">
                démystifiée
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-2xl mx-auto leading-relaxed">
              Tutoriels approfondis, analyses critiques et actualités sur le machine learning, le deep learning, ChatGPT et les révolutions de l&apos;IA.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link
                href="/blog"
                className="group px-8 py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold rounded-xl hover:shadow-2xl hover:shadow-violet-500/25 transition-all duration-300"
              >
                Explorer le blog
                <svg className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categorie/tutoriels-guides"
                className="px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300"
              >
                Tutoriels
              </Link>
            </div>
            
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
        </Container>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="relative py-24 bg-gray-950">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-violet-950/20 to-gray-950" />
        <Container className="relative">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                Articles en vedette
              </h2>
              <p className="text-gray-400">Les contenus les plus importants du moment</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors">
              Voir tous
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {featuredArticles.length > 0 ? (
            <div className="grid gap-8">
              {featuredArticles.map((article) => (
                <article key={article.slug} className="group relative">
                  <div className="absolute -inset-px bg-gradient-to-r from-violet-500/50 via-fuchsia-500/50 to-violet-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
                  <div className="relative bg-gray-900/80 backdrop-blur-xl border border-white/5 rounded-2xl overflow-hidden group-hover:border-violet-500/30 transition-colors">
                    <div className="grid md:grid-cols-2 gap-0">
                      {article.image && (
                        <div className="relative aspect-[4/3] md:aspect-auto overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 to-fuchsia-600/20" />
                          <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.03)_50%,transparent_75%)] bg-[length:200%_200%] group-hover:animate-pulse" />
                        </div>
                      )}
                      <div className="p-8 flex flex-col justify-center">
                        <div className="flex items-center gap-3 mb-4">
                          <Badge variant="primary">{article.category}</Badge>
                          <span className="text-sm text-gray-500">{article.readingTime} min</span>
                        </div>
                        <h3 className="font-heading text-2xl font-bold text-white mb-3 group-hover:text-violet-300 transition-colors">
                          <Link href={article.route}>{article.title}</Link>
                        </h3>
                        <p className="text-gray-400 mb-4 line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <time>{new Date(article.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric' })}</time>
                          <span>•</span>
                          <span>{article.author}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-400">Aucun article en vedette pour le moment.</p>
            </div>
          )}
        </Container>
      </section>

      <section className="relative py-24 bg-gray-950">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-0 w-72 h-72 bg-fuchsia-500/10 rounded-full blur-[100px]" />
          <div className="absolute top-1/2 right-0 w-72 h-72 bg-violet-500/10 rounded-full blur-[100px]" />
        </div>
        <Container className="relative">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              Explorer par catégorie
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Plongez dans les différents aspects de l&apos;intelligence artificielle
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, index) => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="group relative p-6 bg-gray-900/50 border border-white/5 rounded-2xl hover:border-violet-500/50 transition-all duration-300 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-fuchsia-500/0 group-hover:from-violet-500/10 group-hover:to-fuchsia-500/10 transition-all duration-500" />
                <div className="relative">
                  <span className="text-4xl mb-4 block">{cat.icon}</span>
                  <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:text-violet-300 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-gray-500">{cat.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 bg-gray-900/50">
        <Container>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-2">
                Derniers articles
              </h2>
              <p className="text-gray-400">Les dernières publications sur l&apos;IA</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-2 text-violet-400 hover:text-violet-300 transition-colors">
              Voir tous
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-600 via-fuchsia-600 to-violet-600" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-50" />
        <Container className="relative text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Restez à la pointe de l&apos;IA
          </h2>
          <p className="text-white/80 mb-8 max-w-xl mx-auto text-lg">
            Recevez les derniers articles directement dans votre boîte mail. Aucune spam, promis.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <label htmlFor="newsletter-email" className="sr-only">Email</label>
            <input
              id="newsletter-email"
              type="email"
              placeholder="votre@email.com"
              required
              className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/20"
            />
            <button
              type="submit"
              className="px-8 py-4 bg-gray-950 text-white font-semibold rounded-xl hover:bg-gray-900 transition-colors"
            >
              S&apos;inscrire
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
