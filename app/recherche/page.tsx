import { Suspense } from 'react';
import Container from '@/components/ui/Container';
import Breadcrumb from '@/components/layout/Breadcrumb';
import SearchBar from '@/components/blog/SearchBar';
import SearchResults from '@/components/blog/SearchResults';

export const metadata = {
  title: 'Recherche',
  description: 'Rechercher sur Nodes.tn - Blog Intelligence Artificielle',
};

export default function SearchPage() {
  return (
    <Container className="py-12">
      <Breadcrumb items={[{ name: 'Recherche', href: '/recherche' }]} />

      <header className="mb-8">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
          Recherche
        </h1>
        <div className="max-w-xl">
          <SearchBar />
        </div>
      </header>

      <Suspense fallback={<div className="text-gray-600 dark:text-gray-400">Chargement...</div>}>
        <SearchResults />
      </Suspense>
    </Container>
  );
}
