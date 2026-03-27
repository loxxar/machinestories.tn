import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'À propos - Machine Stories | Blog Intelligence Artificielle',
  description: 'Découvrez Machine Stories, blog dédié à l\'intelligence artificielle en français.',
  alternates: { canonical: 'https://machinestories.tn/a-propos' },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero */}
      <section className="relative overflow-hidden bg-slate-950 py-16">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        </div>
        
        <div className="relative z-10 container mx-auto px-4">
          <Breadcrumb items={[{ name: 'À propos', href: '/a-propos' }]} />
          
          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-6 mb-8">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl rotate-6" />
                <div className="absolute inset-0 bg-slate-950 rounded-2xl flex items-center justify-center">
                  <span className="text-4xl font-bold bg-gradient-to-br from-cyan-400 to-blue-400 bg-clip-text text-transparent">MS</span>
                </div>
              </div>
              <div>
                <h1 className="font-heading text-4xl md:text-5xl font-bold text-white mb-2">
                  Machine <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Stories</span>
                </h1>
                <p className="text-slate-400">Votre ressource francophone sur l&apos;intelligence artificielle</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="bg-slate-900/50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <div className="prose prose-invert prose-lg max-w-none
              prose-headings:font-heading prose-headings:text-white 
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-3
              prose-h3:text-xl prose-h3:mt-6 prose-h3:mb-3
              prose-p:text-slate-300 prose-p:leading-relaxed prose-p:mb-6
              prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white prose-strong:font-semibold
              prose-ul:text-slate-300 prose-ul:my-4 prose-li:my-1
              prose-li:marker:text-cyan-500
              prose-blockquote:border-l-cyan-500 prose-blockquote:text-slate-400 prose-blockquote:italic">
              
              <h2>Notre mission</h2>
              <p>
                Machine Stories est né d&apos;une conviction simple : l&apos;intelligence artificielle est en train de transformer notre monde, 
                et tout le monde devrait pouvoir comprendre ses enjeux et ses applications, sans avoir besoin d&apos;être expert en informatique.
              </p>
              <p>
                Nous croyons qu&apos;une information claire, accessible et de qualité est essentielle pour permettre à chacun de 
                participer pleinement à cette révolution technologique.
              </p>

              <h2>Ce que nous couvrons</h2>
              <ul>
                <li><strong>Machine Learning & Deep Learning</strong> : Les fondements techniques expliqués simplement</li>
                <li><strong>IA Générative</strong> : ChatGPT, Midjourney, DALL-E et les outils qui révolutionnent la création</li>
                <li><strong>Actualités</strong> : Les dernières innovations et avancées du secteur</li>
                <li><strong>Tutoriels</strong> : Apprenez à utiliser les outils d&apos;IA pas à pas</li>
                <li><strong>Éthique & Société</strong> : L&apos;impact de l&apos;IA sur notre monde et les questions qu&apos;elle soulève</li>
                <li><strong>Business & IA</strong> : Comment les entreprises utilisent l&apos;IA pour se transformer</li>
              </ul>

              <h2>Notre approche</h2>
              <p>
                Chaque article est rédigé avec soin pour être à la fois précis techniquement et accessible à tous. 
                Nous évitons le jargon inutile et privilégions les explications claires, les exemples concrets et les 
                perspectives équilibrées.
              </p>

              <h2>Contactez-nous</h2>
              <p>
                Une question, une suggestion d&apos;article ou une idée de partenariat ? Nous sommes à votre écoute et 
                serions ravis de discuter avec vous.
              </p>
            </div>

            <div className="mt-8">
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all"
              >
                Contactez-nous
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 border-t border-white/5 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl font-bold text-white mb-4">Prêt à explorer l&apos;univers de l&apos;IA ?</h2>
          <p className="text-slate-400 mb-6 max-w-md mx-auto">
            Découvrez nos derniers articles et restez informé des évolutions technologiques.
          </p>
          <Link 
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 text-white font-medium rounded-lg hover:bg-white/10 transition-all"
          >
            Explorer le blog
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
