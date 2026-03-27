import { Suspense } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/blog/SearchBar';
import SearchResults from '@/components/blog/SearchResults';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata = {
  title: 'Recherche - Machine Stories | Blog Intelligence Artificielle',
  description: 'Rechercher sur Machine Stories - Blog Intelligence Artificielle',
};

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Breadcrumb items={[{ name: 'Recherche', href: '/recherche' }]} />
          
          <div className="mt-8 max-w-2xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Recherche</span>
            </h1>
            <p className="text-lg text-slate-400 mb-8">
              Trouvez l&apos;article qui vous intéresse parmi notre collection sur l&apos;IA
            </p>
            <div className="max-w-xl mx-auto">
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Results */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Suspense fallback={
            <div className="flex items-center justify-center py-16">
              <div className="flex items-center gap-3 text-slate-400">
                <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Chargement...
              </div>
            </div>
          }>
            <SearchResults />
          </Suspense>
        </div>
      </section>

      {/* Popular Categories */}
      <section className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-xl font-bold text-white mb-6">Parcourez par catégorie</h2>
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/categorie/machine-learning" className="px-4 py-2 bg-slate-900 border border-white/10 rounded-full text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all">
              🧠 Machine Learning
            </Link>
            <Link href="/categorie/deep-learning" className="px-4 py-2 bg-slate-900 border border-white/10 rounded-full text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all">
              🔮 Deep Learning
            </Link>
            <Link href="/categorie/ia-generative" className="px-4 py-2 bg-slate-900 border border-white/10 rounded-full text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all">
              ✨ IA Générative
            </Link>
            <Link href="/categorie/actualites-ia" className="px-4 py-2 bg-slate-900 border border-white/10 rounded-full text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all">
              📰 Actualités IA
            </Link>
            <Link href="/categorie/tutoriels-guides" className="px-4 py-2 bg-slate-900 border border-white/10 rounded-full text-sm text-slate-300 hover:border-cyan-500/50 hover:text-white transition-all">
              📚 Tutoriels
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
