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
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-3 mb-4" aria-label="Machine Stories">
              <div className="relative w-10 h-10">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-xl rotate-3" />
                <div className="absolute inset-0 bg-slate-950 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold bg-gradient-to-br from-cyan-400 to-blue-400 bg-clip-text text-transparent">M</span>
                </div>
              </div>
              <span className="font-heading text-xl font-bold text-white">
                Machine<span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Stories</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Votre source francophone sur l&apos;intelligence artificielle : actualités, tutoriels, analyses et guides pour comprendre l&apos;IA de demain.
            </p>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Catégories</h3>
            <ul className="space-y-3">
              {categories.slice(0, 4).map((cat) => (
                <li key={cat.slug}>
                  <Link
                    href={`/categorie/${cat.slug}`}
                    className="text-sm text-slate-400 hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">Pages</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/blog" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-sm text-slate-400 hover:text-white transition-colors">
                  À propos
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/recherche" className="text-sm text-slate-400 hover:text-white transition-colors">
                  Recherche
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-white mb-4">RSS & Suivre</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/rss.xml" className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6 2a6 6 0 0111.607 2.393A6 6 0 0116 18a5.97 5.97 0 01-3.356-.949A4 4 0 0015 18H3a4 4 0 01-3.894-5.789A6.03 6.03 0 013 18a6 6 0 01-.001-12.001A6 6 0 016 2z" />
                    <circle cx="4" cy="14" r="1.5" />
                  </svg>
                  Flux RSS
                </Link>
              </li>
              <li>
                <a
                  href="https://twitter.com/machine_stories"
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter/X
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/company/machine-stories"
                  className="text-sm text-slate-400 hover:text-white transition-colors flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z" />
                  </svg>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-slate-400">
            © {currentYear} Machine Stories. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/sitemap.xml" className="text-sm text-slate-400 hover:text-white transition-colors">
              Sitemap
            </Link>
            <Link href="/robots.txt" className="text-sm text-slate-400 hover:text-white transition-colors">
              Robots.txt
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
