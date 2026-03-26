import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Machine Stories, blog dédié à l\'intelligence artificielle.',
  alternates: { canonical: 'https://machinestories.tn/a-propos' },
};

export default function AboutPage() {
  return (
    <Container className="py-8">
      <Breadcrumb items={[{ name: 'À propos', href: '/a-propos' }]} />

      <article className="max-w-3xl">
        <header className="mb-8">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">
            À propos de Machine Stories
          </h1>
          <p className="text-slate-400">Votre ressource francophone sur l&apos;intelligence artificielle</p>
        </header>

        <div className="prose prose-invert prose-sm max-w-none">
          <h2 className="text-white text-lg">Notre mission</h2>
          <p className="text-slate-300">
            Machine Stories est né d&apos;une conviction simple : l&apos;intelligence artificielle est en train de transformer notre monde, et tout le monde devrait pouvoir comprendre ses enjeux et ses applications.
          </p>

          <h2 className="text-white text-lg mt-6">Ce que nous couvrons</h2>
          <ul className="text-slate-300 space-y-1">
            <li><strong>Machine Learning & Deep Learning</strong> : Les fondements techniques</li>
            <li><strong>IA Générative</strong> : ChatGPT, Midjourney, DALL-E</li>
            <li><strong>Actualités</strong> : Les dernières innovations</li>
            <li><strong>Tutoriels</strong> : Apprenez à utiliser les outils d&apos;IA</li>
            <li><strong>Éthique & Société</strong> : L&apos;impact de l&apos;IA sur notre monde</li>
          </ul>

          <h2 className="text-white text-lg mt-6">Contactez-nous</h2>
          <p className="text-slate-300">
            Question, suggestion d&apos;article ou partenariat ? <a href="/contact" className="text-cyan-400 hover:text-cyan-300">Contactez-nous</a>.
          </p>
        </div>
      </article>
    </Container>
  );
}
