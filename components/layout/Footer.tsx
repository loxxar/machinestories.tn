import Link from 'next/link';

const categories = [
  { name: 'Machine Learning', slug: 'machine-learning' },
  { name: 'Deep Learning', slug: 'deep-learning' },
  { name: 'IA Générative', slug: 'ia-generative' },
  { name: 'Actualités IA', slug: 'actualites-ia' },
  { name: 'Tutoriels & Guides', slug: 'tutoriels-guides' },
  { name: 'Outils & Applications', slug: 'outils-applications' },
  { name: 'Éthique & Société', slug: 'ethique-societe' },
  { name: 'Business & IA', slug: 'business-ia' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-slate-950 to-slate-900 mt-16">
      <div className="container mx-auto px-4 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1 sm:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg rotate-3" />
                <div className="absolute inset-0 bg-slate-950 rounded-lg flex items-center justify-center">
                  <span className="text-base font-bold bg-gradient-to-br from-cyan-400 to-blue-400 bg-clip-text text-transparent">M</span>
                </div>
              </div>
              <div>
                <div className="font-heading font-bold text-white text-lg">Machine<span className="text-cyan-400">Stories</span></div>
                <div className="text-xs text-slate-500">IA en français</div>
              </div>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed mt-3">Tutoriels approfondis, analyses critiques et actualités sur le machine learning et la révolution de l&apos;IA.</p>
          </div>

          {/* Categories Section */}
          <div className="hidden lg:block">
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wide text-cyan-400">Catégories</h3>
            <ul className="space-y-2.5">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link href={`/categorie/${cat.slug}`} className="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200">
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Pages Section */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wide text-cyan-400">Navigation</h3>
            <ul className="space-y-2.5">
              <li><Link href="/blog" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200">Blog</Link></li>
              <li><Link href="/a-propos" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200">À propos</Link></li>
              <li><Link href="/contact" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200">Contact</Link></li>
              <li><Link href="/recherche" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors duration-200">Recherche</Link></li>
            </ul>
          </div>

          {/* Socials Section */}
          <div>
            <h3 className="font-heading font-semibold text-white mb-4 text-sm uppercase tracking-wide text-cyan-400">Suivre</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/rss.xml" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-2.5">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 2a3 3 0 00-3 3v1a3 3 0 006 0V5a3 3 0 00-3-3zm11.707 1.293a1 1 0 00-1.414 0L12.879 5.707a1 1 0 001.414 1.414l2.414-2.414a1 1 0 000-1.414zM8 10a2 2 0 100-4 2 2 0 000 4z"/></svg>
                  Flux RSS
                </Link>
              </li>
              <li>
                <a href="https://twitter.com/machine_stories" className="text-sm text-slate-400 hover:text-cyan-300 transition-colors flex items-center gap-2.5" target="_blank" rel="noopener noreferrer">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                  Twitter/X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-8" />

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-400">
          <p>© {currentYear} Machine Stories. Tous droits réservés.</p>
          <div className="flex items-center gap-6">
            <Link href="/sitemap.xml" className="hover:text-cyan-300 transition-colors">Sitemap</Link>
            <Link href="/robots.txt" className="hover:text-cyan-300 transition-colors">Robots.txt</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
