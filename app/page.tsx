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
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-[100px]" />
        </div>
        
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(2,6,23,0.4)_50%,rgba(2,6,23,1)_100%)] z-10" />
        
        <Container className="relative z-20 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-slate-300">Votre source sur l&apos;IA en français</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                L&apos;Intelligence Artificielle,
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
                démystifiée
              </span>
            </h1>
            
            <p className="text-base md:text-lg text-slate-400 mb-8 max-w-2xl mx-auto">
              Tutoriels approfondis, analyses critiques et actualités sur le machine learning, le deep learning, ChatGPT et les révolutions de l&apos;IA.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link
                href="/blog"
                className="group px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Explorer le blog
                <svg className="inline-block ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categorie/tutoriels-guides"
                className="px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
              >
                Tutoriels
              </Link>
            </div>
            
            <div className="max-w-md mx-auto">
              <SearchBar />
            </div>
          </div>
        </Container>
        
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <svg className="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      <section className="py-12 bg-slate-950">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                Articles en vedette
              </h2>
              <p className="text-sm text-slate-500">Les contenus les plus importants du moment</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              Voir tous
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          {featuredArticles.length > 0 ? (
            <div className="grid gap-6">
              {featuredArticles.map((article) => (
                <article key={article.slug} className="group relative">
                  <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/30 via-blue-500/30 to-cyan-500/30 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative bg-slate-900/80 backdrop-blur border border-white/5 rounded-xl overflow-hidden group-hover:border-cyan-500/20 transition-colors">
                    <div className="grid md:grid-cols-2">
                      {article.image && (
                        <div className="relative aspect-video md:aspect-auto overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/10 to-blue-600/10" />
                        </div>
                      )}
                      <div className="p-5 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="primary">{article.category}</Badge>
                          <span className="text-xs text-slate-500">{article.readingTime} min</span>
                        </div>
                        <h3 className="font-heading text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                          <Link href={article.route}>{article.title}</Link>
                        </h3>
                        <p className="text-sm text-slate-400 mb-2 line-clamp-2">{article.description}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
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
            <p className="text-center text-slate-500 py-8">Aucun article en vedette pour le moment.</p>
          )}
        </Container>
      </section>

      <section className="py-12 bg-slate-950">
        <Container>
          <div className="text-center mb-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
              Explorer par catégorie
            </h2>
            <p className="text-sm text-slate-500">Plongez dans les différents aspects de l&apos;intelligence artificielle</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/categorie/${cat.slug}`}
                className="group p-4 bg-slate-900/50 border border-white/5 rounded-xl hover:border-cyan-500/30 transition-all"
              >
                <span className="text-2xl mb-2 block">{cat.icon}</span>
                <h3 className="font-heading text-sm font-semibold text-white mb-0.5 group-hover:text-cyan-300 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500">{cat.description}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-slate-900/50">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-1">
                Derniers articles
              </h2>
              <p className="text-sm text-slate-500">Les dernières publications sur l&apos;IA</p>
            </div>
            <Link href="/blog" className="hidden md:flex items-center gap-1 text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
              Voir tous
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {latestArticles.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </Container>
      </section>

      <section className="py-12 bg-gradient-to-br from-cyan-600 to-blue-600">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
        <Container className="relative text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Restez à la pointe de l&apos;IA
          </h2>
          <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm">
            Recevez les derniers articles directement dans votre boîte mail. Aucune spam, promis.
          </p>
          <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              required
              className="flex-1 px-4 py-2.5 rounded-lg text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-slate-950 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors text-sm"
            >
              S&apos;inscrire
            </button>
          </form>
        </Container>
      </section>
    </>
  );
}
