import { Suspense } from 'react';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SearchBar from '@/components/blog/SearchBar';
import SearchResults from '@/components/blog/SearchResults';

export const metadata = {
  title: 'Recherche',
  description: 'Rechercher sur Machine Stories - Blog Intelligence Artificielle',
};

export default function SearchPage() {
  return (
    <Container className="py-8">
      <Breadcrumb items={[{ name: 'Recherche', href: '/recherche' }]} />

      <header className="mb-6">
        <h1 className="font-heading text-2xl md:text-3xl font-bold text-white mb-4">Recherche</h1>
        <div className="max-w-md">
          <SearchBar />
        </div>
      </header>

      <Suspense fallback={<div className="text-slate-400 text-sm">Chargement...</div>}>
        <SearchResults />
      </Suspense>
    </Container>
  );
}
