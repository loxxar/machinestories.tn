import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { getPaginatedArticles, getAllCategories, getAllTags, getFeaturedArticles } from '@/lib/content';
import { formatDate, formatDateISO, slugify } from '@/lib/utils';
import Container from '@/components/ui/Container';
import Badge from '@/components/ui/Badge';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Blog - Intelligence Artificielle | Machine Stories',
  description: 'Tous les articles sur l\'intelligence artificielle : tutoriels, actualités, analyses et guides approfondis.',
  alternates: {
    canonical: 'https://machinestories.tn/blog',
  },
};

const ARTICLES_PER_PAGE = 9;

export async function generateStaticParams() {
  const { totalPages } = getPaginatedArticles(1, ARTICLES_PER_PAGE);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push({ page: i.toString() });
  }
  return pages;
}

const categoryIcons: Record<string, string> = {
  'Machine Learning': '🧠',
  'Deep Learning': '🔮',
  'IA Générative': '✨',
  'Actualités IA': '📰',
  'Tutoriels & Guides': '📚',
  'Outils & Applications': '🛠️',
  'Éthique & Société': '⚖️',
  'Business & IA': '💼',
};

export default async function BlogPage({ params }: { params: Promise<{ page?: string }> }) {
  const { page: pageParam } = await params;
  const currentPage = pageParam ? parseInt(pageParam, 10) : 1;
  const { articles, totalPages } = getPaginatedArticles(currentPage, ARTICLES_PER_PAGE);
  const categories = getAllCategories();
  const tags = getAllTags();
  const featuredArticles = getFeaturedArticles(1);
  const firstFeatured = featuredArticles[0];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Header */}
      <section className="relative py-16 overflow-hidden bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        <Container className="relative z-10">
          <Breadcrumb items={[{ name: 'Blog', href: '/blog' }]} />
          
          <div className="max-w-2xl">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Blog <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Intelligence Artificielle</span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed">
              Tutoriels pratiques, analyses approfondies et dernières actualités sur l&apos;IA. 
              Restez informé sur les révolutions technologiques qui façonnent notre avenir.
            </p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            <Link 
              href="/blog" 
              className="px-4 py-1.5 text-sm font-medium bg-cyan-500 text-white rounded-full transition-all hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Tous
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/categorie/${slugify(cat)}`}
                className="group px-4 py-1.5 text-sm font-medium text-slate-400 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:text-white transition-all"
              >
                <span className="mr-1.5">{categoryIcons[cat] || '📂'}</span>
                {cat}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Featured Article */}
      {firstFeatured && currentPage === 1 && (
        <section className="py-8 bg-slate-950">
          <Container>
            <Link href={`/categorie/${slugify(firstFeatured.category)}`} className="inline-flex items-center gap-2 text-xs text-cyan-400 mb-4 hover:text-cyan-300 transition-colors">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
              Article en vedette
            </Link>
            <article className="group relative">
              <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/50 via-blue-500/50 to-cyan-500/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-sm" />
              <div className="relative bg-slate-900/80 border border-white/5 rounded-2xl overflow-hidden">
                <div className="grid lg:grid-cols-2">
                  {firstFeatured.image && (
                    <div className="relative aspect-[4/3] lg:aspect-auto overflow-hidden">
                      <Image
                        src={firstFeatured.image}
                        alt={firstFeatured.imageAlt || firstFeatured.title}
                        fill
                        className="object-cover transition-transform group-hover:scale-105"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-cyan-500/10 lg:block hidden" />
                    </div>
                  )}
                  <div className="p-8 lg:p-10 flex flex-col justify-center">
                    <div className="flex flex-wrap items-center gap-3 mb-4">
                      <Badge variant="primary" href={`/categorie/${slugify(firstFeatured.category)}`}>
                        {firstFeatured.category}
                      </Badge>
                      <span className="text-sm text-slate-500">{firstFeatured.readingTime} min de lecture</span>
                    </div>
                    <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-cyan-300 transition-colors">
                      <Link href={firstFeatured.route}>
                        {firstFeatured.title}
                      </Link>
                    </h2>
                    <p className="text-slate-400 mb-6 line-clamp-3 leading-relaxed">
                      {firstFeatured.description}
                    </p>
                    <div className="flex items-center gap-4">
                      <time dateTime={formatDateISO(firstFeatured.date)} className="text-sm text-slate-500">
                        {formatDate(firstFeatured.date)}
                      </time>
                      <span className="text-slate-700">•</span>
                      <span className="text-sm text-slate-500">{firstFeatured.author}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          </Container>
        </section>
      )}

      {/* Articles Grid */}
      <section className="py-8 bg-slate-900/50">
        <Container>
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-xl font-bold text-white">
              {currentPage === 1 && firstFeatured ? 'Tous les articles' : `Articles - Page ${currentPage}`}
            </h2>
            <span className="text-sm text-slate-500">{articles.length} article{articles.length > 1 ? 's' : ''}</span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {articles.map((article, index) => (
              <article 
                key={article.slug} 
                className="group relative"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Hover glow effect */}
                <div className="absolute -inset-px bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-cyan-500/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity -z-10 blur-sm" />
                
                <div className="relative bg-slate-900/80 border border-white/5 rounded-xl overflow-hidden h-full flex flex-col group-hover:border-cyan-500/30 transition-colors">
                  {article.image && (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={article.image}
                        alt={article.imageAlt || article.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        loading="lazy"
                      />
                      {/* Gradient overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                    </div>
                  )}
                  
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="primary" href={`/categorie/${slugify(article.category)}`}>
                        {article.category}
                      </Badge>
                      <span className="text-xs text-slate-500">{article.readingTime} min</span>
                    </div>
                    
                    <h3 className="font-heading text-base font-bold text-white mb-2 line-clamp-2 group-hover:text-cyan-300 transition-colors">
                      <Link href={article.route}>
                        {article.title}
                      </Link>
                    </h3>
                    
                    <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                      {article.description}
                    </p>
                    
                    <div className="flex items-center gap-2 text-xs text-slate-500 pt-3 border-t border-white/5">
                      <time dateTime={formatDateISO(article.date)}>{formatDate(article.date)}</time>
                      <span className="text-slate-700">•</span>
                      <span>{article.author}</span>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-2">
              {currentPage > 1 && (
                <Link
                  href={currentPage === 2 ? '/blog' : `/blog/page/${currentPage - 1}`}
                  className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-800 hover:border-cyan-500/30 transition-all"
                >
                  <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="group flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-300 bg-slate-900 border border-white/10 rounded-lg hover:bg-slate-800 hover:border-cyan-500/30 transition-all"
                >
                  Suivant
                  <svg className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )}
            </nav>
          )}
        </Container>
      </section>

      {/* Sidebar Section - Popular Tags */}
      <section className="py-12 bg-slate-950 border-t border-white/5">
        <Container>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Categories */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-500" />
                Catégories
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {categories.map((cat) => (
                  <Link
                    key={cat}
                    href={`/categorie/${slugify(cat)}`}
                    className="group flex items-center gap-3 p-3 bg-slate-900/50 border border-white/5 rounded-lg hover:border-cyan-500/30 transition-all"
                  >
                    <span className="text-xl">{categoryIcons[cat] || '📂'}</span>
                    <span className="text-sm text-slate-300 group-hover:text-white transition-colors">{cat}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Popular Tags */}
            <div>
              <h3 className="font-heading text-sm font-semibold text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                <span className="w-8 h-px bg-cyan-500" />
                Tags populaires
              </h3>
              <div className="flex flex-wrap gap-2">
                {tags.slice(0, 20).map((tag) => (
                  <Badge key={tag} variant="default" href={`/tag/${slugify(tag)}`}>
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border-t border-white/5">
        <Container className="text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
            Restez à la pointe de l&apos;IA
          </h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Recevez les derniers articles directement dans votre boîte mail. Aucun spam, promis.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="votre@email.com"
              required
              className="flex-1 px-4 py-3 rounded-lg bg-slate-900 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-500/50 focus:ring-2 focus:ring-cyan-500/20 transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
            >
              S&apos;inscrire
            </button>
          </form>
        </Container>
      </section>
    </div>
  );
}