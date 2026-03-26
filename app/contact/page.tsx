import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'équipe de Machine Stories. Questions, suggestions d\'articles, partenariats ou contributions - nous sommes à votre écoute.',
  alternates: {
    canonical: 'https://machinestories.tn/contact',
  },
};

export default function ContactPage() {
  return (
    <Container className="py-12">
      <Breadcrumb items={[{ name: 'Contact', href: '/contact' }]} />

      <div className="max-w-2xl mx-auto">
        <header className="mb-12 text-center">
          <h1 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
            Contactez-nous
          </h1>
          <p className="text-lg text-slate-400">
            Une question, une suggestion d&apos;article ou un partenariat ? Nous sommes à votre écoute.
          </p>
        </header>

        <form className="space-y-6" action="#" method="POST">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 border border-white/10 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 border border-white/10 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-300 mb-2">
              Sujet
            </label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full px-4 py-3 border border-white/10 rounded-lg bg-slate-900/50 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
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
            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              required
              className="w-full px-4 py-3 border border-white/10 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
          >
            Envoyer le message
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-white/10">
          <h2 className="font-heading text-lg font-semibold text-white mb-4">
            Autres moyens de nous contacter
          </h2>
          <div className="space-y-3">
            <p className="text-slate-400">
              <strong className="text-white">Twitter/X :</strong>{' '}
              <a href="https://twitter.com/machine_stories" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">
                @machine_stories
              </a>
            </p>
            <p className="text-slate-400">
              <strong className="text-white">LinkedIn :</strong>{' '}
              <a href="https://linkedin.com/company/machine-stories" className="text-cyan-400 hover:text-cyan-300 transition-colors" target="_blank" rel="noopener noreferrer">
                Machine Stories
              </a>
            </p>
          </div>
        </div>
      </div>
    </Container>
  );
}
