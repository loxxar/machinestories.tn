'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Article } from '@/lib/content';
import ArticleCard from '@/components/blog/ArticleCard';

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [results, setResults] = useState<Article[]>([]);
  const [allArticles, setAllArticles] = useState<Article[]>([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/articles')
      .then((res) => res.json())
      .then((data) => {
        setAllArticles(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (query.trim() && allArticles.length > 0) {
      const q = query.toLowerCase();
      const filtered = allArticles.filter(
        (article) =>
          article.title.toLowerCase().includes(q) ||
          article.description.toLowerCase().includes(q) ||
          article.tags.some((tag) => tag.toLowerCase().includes(q)) ||
          article.category.toLowerCase().includes(q) ||
          article.body.raw.toLowerCase().includes(q)
      );
      setResults(filtered);
      setSearched(true);
    } else {
      setResults([]);
      setSearched(false);
    }
  }, [query, allArticles]);

  if (loading) {
    return <div className="text-gray-400">Chargement...</div>;
  }

  if (searched) {
    if (results.length > 0) {
      return (
        <div>
          <p className="text-gray-400 mb-6">
            {results.length} résultat{results.length !== 1 ? 's' : ''} pour &quot;{query}&quot;
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((article) => (
              <ArticleCard key={article.slug} article={article} />
            ))}
          </div>
        </div>
      );
    } else {
      return (
        <div className="text-center py-12">
          <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <h2 className="text-xl font-heading font-semibold text-white mb-2">
            Aucun résultat
          </h2>
          <p className="text-gray-400">
            Aucun article ne correspond à &quot;{query}&quot;. Essayez d&apos;autres termes.
          </p>
        </div>
      );
    }
  }

  return (
    <div className="text-center py-12">
      <svg className="w-16 h-16 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h2 className="text-xl font-heading font-semibold text-white mb-2">
        Rechercher sur Machine Stories
      </h2>
      <p className="text-gray-400">
        Entrez un terme pour rechercher dans nos articles sur l&apos;IA.
      </p>
    </div>
  );
}

export default SearchResults;
