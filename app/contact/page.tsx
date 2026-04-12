import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact - Machine Stories | Blog Intelligence Artificielle',
  description: 'Contactez l\'équipe de Machine Stories pour vos questions et suggestions.',
  alternates: { canonical: 'https://machinestories.tn/contact' },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Breadcrumb items={[{ name: 'Contact', href: '/contact' }]} />
          
          <div className="mt-8 max-w-2xl mx-auto text-center">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-4">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Contactez-nous</span>
            </h1>
            <p className="text-lg text-slate-400">
              Une question ou une suggestion ? Nous sommes à votre écoute.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-8">
              <h2 className="font-heading text-xl font-bold text-white mb-6">Envoyez-nous un message</h2>
              <form className="space-y-5" action="#" method="POST">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Nom</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 text-sm border border-white/10 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="Votre nom"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 text-sm border border-white/10 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">Sujet</label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    className="w-full px-4 py-3 text-sm border border-white/10 rounded-lg bg-slate-800/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all"
                  >
                    <option value="">Sélectionnez un sujet</option>
                    <option value="question">Question générale</option>
                    <option value="suggestion">Suggestion d&apos;article</option>
                    <option value="contribution">Contribution</option>
                    <option value="partnership">Partenariat</option>
                    <option value="feedback">Retour sur le site</option>
                    <option value="other">Autre</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 text-sm border border-white/10 rounded-lg bg-slate-800/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-transparent transition-all resize-none"
                    placeholder="Votre message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all flex items-center justify-center gap-2"
                >
                  <span>Envoyer le message</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-6">
              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">Email</h3>
                    <p className="text-slate-400 text-sm">contact@machinestories.tn</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">Réseaux sociaux</h3>
                    <p className="text-slate-400 text-sm">Suivez-nous sur X (Twitter) pour les dernières actualités</p>
                    <a href="https://twitter.com/machine_stories" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 text-sm mt-1 transition-colors">
                      @machine_stories
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900/80 border border-white/5 rounded-2xl p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-heading font-semibold text-white mb-1">Sujets que nous adorons</h3>
                    <p className="text-slate-400 text-sm">Questions sur l&apos;IA, suggestions d&apos;articles, partenariats, contributions invitéess</p>
                  </div>
                </div>
              </div>

              {/* Quick Links */}
              <div className="pt-4">
                <p className="text-sm text-slate-500 mb-4">Vous cherchez quelque chose en particulier ?</p>
                <div className="flex flex-wrap gap-3">
                  <Link href="/blog" className="px-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-sm text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all">
                    Tous les articles
                  </Link>
                  <Link href="/recherche" className="px-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-sm text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all">
                    Rechercher
                  </Link>
                  <Link href="/a-propos" className="px-4 py-2 bg-slate-800/50 border border-white/5 rounded-lg text-sm text-slate-300 hover:text-white hover:border-cyan-500/30 transition-all">
                    À propos
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
