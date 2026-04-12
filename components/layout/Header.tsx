import Link from 'next/link';
import { getAllCategories } from '@/lib/categories';
import { Rocket } from 'lucide-react';

export default function Header() {
  const categories = getAllCategories();
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-slate-950/95 backdrop-blur">
      <nav className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative flex items-center justify-center">
            <Rocket 
              size={24} 
              color="#06b6d4" 
              className="rocket-icon"
            />
          </div>
          <span className="font-mono font-medium text-xl text-white hidden sm:inline-block">
            Machine<span style={{ color: '#06b6d4' }}>Stories</span>
          </span>
          <style dangerouslySetInnerHTML={{ __html: `
            @keyframes rocket-float {
              0%, 100% { transform: rotate(-45deg) translateY(0px); }
              50%       { transform: rotate(-45deg) translateY(-4px); }
            }
            @keyframes rocket-glow {
              0%, 100% { filter: drop-shadow(0 0 4px #06b6d4); }
              50%       { filter: drop-shadow(0 0 10px #06b6d4) drop-shadow(0 0 20px #0891b2); }
            }
            .rocket-icon {
              animation: rocket-float 3s ease-in-out infinite, rocket-glow 2s ease-in-out infinite;
              transform: rotate(-45deg);
            }
          `}} />
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link href="/blog" className="text-sm text-slate-300 hover:text-white hover:text-cyan-300 transition-colors duration-200">Blog</Link>
          <div className="relative group">
            <button className="text-sm text-slate-300 hover:text-white hover:text-cyan-300 transition-colors duration-200 flex items-center gap-1">
              Catégories
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
            </button>
            <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
              <div className="bg-slate-900 border border-white/10 rounded-lg shadow-xl py-1.5 min-w-[160px]">
                {categories.map((cat) => (
                  <Link key={cat.slug} href={`/categorie/${cat.slug}`} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white hover:text-cyan-300 hover:bg-white/5 transition-colors duration-200">
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/a-propos" className="text-sm text-slate-300 hover:text-white hover:text-cyan-300 transition-colors duration-200">À propos</Link>
          <Link href="/contact" className="text-sm text-slate-300 hover:text-white hover:text-cyan-300 transition-colors duration-200">Contact</Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/recherche" className="p-2 text-slate-300 hover:text-white transition-colors" aria-label="Rechercher">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </Link>
          <ThemeToggle />
          <MobileMenu categories={categories} />
        </div>
      </nav>
    </header>
  );
}

function ThemeToggle() {
  return (
    <button id="theme-toggle" className="p-2 text-slate-300 hover:text-white transition-colors" aria-label="Basculer le thème">
      <svg className="w-4 h-4 hidden dark:block" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" /></svg>
      <svg className="w-4 h-4 block dark:hidden" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
    </button>
  );
}

function MobileMenu({ categories }: { categories: { name: string; slug: string }[] }) {
  return (
    <div className="md:hidden relative group">
      <button className="p-2 text-slate-300" aria-label="Menu">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>
      <div className="absolute right-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        <div className="bg-slate-900 border border-white/10 rounded-lg shadow-xl py-1.5 min-w-[160px]">
          <Link href="/blog" className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white">Blog</Link>
          <div className="border-t border-white/10 my-1" />
          {categories.map((cat) => (
            <Link key={cat.slug} href={`/categorie/${cat.slug}`} className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white">
              {cat.name}
            </Link>
          ))}
          <div className="border-t border-white/10 my-1" />
          <Link href="/a-propos" className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white">À propos</Link>
          <Link href="/contact" className="block px-3 py-1.5 text-sm text-slate-300 hover:text-white">Contact</Link>
        </div>
      </div>
    </div>
  );
}
