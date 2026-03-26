import type { Metadata } from 'next';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez l\'équipe de Machine Stories.',
  alternates: { canonical: 'https://machinestories.tn/contact' },
};

export default function ContactPage() {
  return (
    <Container className="py-8">
      <Breadcrumb items={[{ name: 'Contact', href: '/contact' }]} />

      <div className="max-w-xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-2">Contactez-nous</h1>
          <p className="text-sm text-slate-400">Une question ou une suggestion ? Nous sommes à votre écoute.</p>
        </header>

        <form className="space-y-4" action="#" method="POST">
          <div>
            <label htmlFor="name" className="block text-xs font-medium text-slate-300 mb-1">Nom</label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 text-sm border border-white/10 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs font-medium text-slate-300 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 text-sm border border-white/10 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500"
            />
          </div>

          <div>
            <label htmlFor="subject" className="block text-xs font-medium text-slate-300 mb-1">Sujet</label>
            <select
              id="subject"
              name="subject"
              required
              className="w-full px-3 py-2 text-sm border border-white/10 rounded-lg bg-slate-900/50 text-white focus:outline-none focus:ring-1 focus:ring-cyan-500"
            >
              <option value="">Sélectionnez</option>
              <option value="question">Question générale</option>
              <option value="suggestion">Suggestion d&apos;article</option>
              <option value="contribution">Contribution</option>
              <option value="partnership">Partenariat</option>
              <option value="other">Autre</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-medium text-slate-300 mb-1">Message</label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              className="w-full px-3 py-2 text-sm border border-white/10 rounded-lg bg-slate-900/50 text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2.5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-cyan-500/20 transition-all text-sm"
          >
            Envoyer
          </button>
        </form>
      </div>
    </Container>
  );
}
