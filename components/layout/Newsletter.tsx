import Container from '@/components/ui/Container';

export default function Newsletter() {
  return (
    <section className="py-12 bg-gradient-to-br from-cyan-600 to-blue-600 rounded-2xl overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30" />
      <Container className="relative text-center">
        <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
          Restez à la pointe de l'IA
        </h2>
        <p className="text-white/80 mb-6 max-w-xl mx-auto text-sm">
          Recevez les derniers articles directement dans votre boîte mail. Aucun spam, promis.
        </p>
        <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
          <input
            type="email"
            placeholder="votre@email.com"
            required
            aria-label="Adresse e-mail pour la newsletter"
            className="flex-1 px-4 py-2.5 rounded-lg text-slate-900 placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-white/20"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-slate-950 text-white font-medium rounded-lg hover:bg-slate-900 transition-colors text-sm"
          >
            S'inscrire
          </button>
        </form>
      </Container>
    </section>
  );
}
