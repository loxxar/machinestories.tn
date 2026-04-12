import Link from 'next/link';
import Image from 'next/image';
import { getAllArticles, getFeaturedArticles } from '@/lib/content';
import { getAllCategories } from '@/lib/categories';
import ArticleCard from '@/components/blog/ArticleCard';
import SearchBar from '@/components/blog/SearchBar';
import Badge from '@/components/ui/Badge';
import Container from '@/components/ui/Container';
import Newsletter from '@/components/layout/Newsletter';

export default function HomePage() {
  const featuredArticles = getFeaturedArticles(3);
  const latestArticles = getAllArticles().slice(0, 6);
  const categories = getAllCategories();

  return (
    <div className="bg-slate-950 text-slate-100">
      <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-slate-950">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/blog/ia-futur-du-travail.png"
            alt="Futur du travail avec l'IA"
            fill
            className="object-cover opacity-40"
            priority
          />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/15 rounded-full blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500/15 rounded-full blur-[100px]" />
        </div>

        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(2,6,23,0.5)_0%,rgba(2,6,23,0.6)_50%,rgba(2,6,23,0.95)_100%)] z-10" />
        
        <Container className="relative z-20 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900 border border-white/10 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              <span className="text-xs text-slate-300">Votre source sur l&apos;IA en français</span>
            </div>
            
            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-transparent">
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
                className="px-6 py-3 bg-slate-900 border border-white/10 text-white font-medium rounded-lg hover:bg-slate-800 transition-all"
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
            <div className="grid gap-8">
              {featuredArticles.map((article) => (
                <ArticleCard key={article.slug} article={article} featured={true} />
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

      <Newsletter />
    </div>
  );
}
