import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import JsonLd from '@/components/seo/JsonLd';

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez Machine Stories, le blog dédié à l\'intelligence artificielle. Notre mission est de rendre l\'IA accessible à tous, avec des articles clairs et approfondis.',
  alternates: {
    canonical: 'https://machinestories.tn/a-propos',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  mainEntity: {
    '@type': 'Organization',
    name: 'Machine Stories',
    description: 'Blog dédié à l\'intelligence artificielle',
    url: 'https://machinestories.tn',
    sameAs: [
      'https://twitter.com/machine_stories',
      'https://linkedin.com/company/machine-stories',
    ],
  },
};

export default function AboutPage() {
  return (
    <Container className="py-12">
      <JsonLd data={aboutJsonLd} />
      <Breadcrumb items={[{ name: 'À propos', href: '/a-propos' }]} />

      <article className="max-w-3xl">
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            À propos de Machine Stories
          </h1>
          <p className="text-lg text-gray-400">
            Votre ressource francophone sur l&apos;intelligence artificielle
          </p>
        </header>

        <div className="prose prose-invert prose-lg max-w-none">
          <h2 className="text-white">Notre mission</h2>
          <p className="text-gray-300">
            Machine Stories est né d&apos;une conviction simple : l&apos;intelligence artificielle est en train de transformer 
            notre monde, et tout le monde devrait pouvoir comprendre ses enjeux et ses applications.
          </p>
          <p className="text-gray-300">
            Notre mission est de démocratiser la connaissance autour de l&apos;IA. Nous croyons que des explications 
            claires, des tutoriels pratiques et des analyses approfondies peuvent rendre accessible même les 
            concepts les plus complexes.
          </p>

          <h2 className="text-white">Ce que nous couvrons</h2>
          <ul className="text-gray-300">
            <li><strong>Machine Learning & Deep Learning</strong> : Les fondements techniques de l&apos;IA</li>
            <li><strong>IA Générative</strong> : ChatGPT, Midjourney, DALL-E et la création de contenu par l&apos;IA</li>
            <li><strong>Actualités</strong> : Les dernières innovations et avancées du secteur</li>
            <li><strong>Tutoriels</strong> : Apprenez à utiliser les outils d&apos;IA pas à pas</li>
            <li><strong>Éthique & Société</strong> : Les réflexions sur l&apos;impact de l&apos;IA sur notre monde</li>
          </ul>

          <h2 className="text-white">Notre approche</h2>
          <p className="text-gray-300">
            Chaque article est rédigé avec soin pour être compréhensible par tous, tout en restant précis et informatif. 
            Nous évitons le jargon inutile et privilégions des explications concrètes, illustrées par des exemples pratiques.
          </p>

          <h2 className="text-white">L&apos;équipe</h2>
          <p className="text-gray-300">
            Machine Stories est maintenu par une équipe passionnée par l&apos;IA et sa vulgarisation. Nous combinons 
            expertise technique et capacité à rendre les concepts accessibles.
          </p>

          <h2 className="text-white">Contactez-nous</h2>
          <p className="text-gray-300">
            Vous avez une question, une suggestion d&apos;article ou souhaitez contribuer ? 
            N&apos;hésitez pas à nous contacter via notre <a href="/contact" className="text-violet-400 hover:text-violet-300">page de contact</a>.
          </p>
        </div>
      </article>
    </Container>
  );
}
