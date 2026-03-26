import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'équipe de Nodes.tn. Questions, suggestions d\'articles, partenariats ou contributions - nous sommes à votre écoute.',
  alternates: {
    canonical: 'https://nodes.tn/contact',
  },
};

export default function ContactPage() {
  return (
    <Container className="py-12">
      <Breadcrumb items={[{ name: 'Contact', href: '/contact' }]} />

      <div className="max-w-2xl">
        <header className="mb-12">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Une question, une suggestion d&apos;article ou un partenariat ? Nous sommes à votre écoute.
          </p>
        </header>

        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Sujet
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="question">Question générale</option>
              <option value="suggestion">Suggestion d&apos;article</option>
              <option value="contribution">Contribution d&apos;article</option>
              <option value="partnership">Partenariat</option>
              <option value="feedback">Retour sur un article</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-gray-950"
          >
            Envoyer le message
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-800">
          <h2 className="font-heading text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Autres moyens de nous contacter
          </h2>
          <div className="space-y-3">
            <p className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-white">Twitter/X :</strong>{' '}
              <a href="https://twitter.com/nodes_tn" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">
                @nodes_tn
              </a>
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong className="text-gray-900 dark:text-white">LinkedIn :</strong>{' '}
              <a href="https://linkedin.com/company/nodes-tn" className="text-primary-600 dark:text-primary-400 hover:underline" target="_blank" rel="noopener noreferrer">
                Nodes.tn
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
