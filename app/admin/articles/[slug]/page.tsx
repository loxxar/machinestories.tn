'use client';

import { useState, useEffect } from 'react';
import ArticleEditor from '@/components/admin/ArticleEditor';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function EditArticlePage() {
  const { slug } = useParams() as { slug: string };
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/admin/articles/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Article non trouvé');
        return res.json();
      })
      .then((data) => {
        setArticle(data.article);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              ← Retour
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Éditer l'Article</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          {loading ? (
            <div className="text-center py-12 text-gray-500">Chargement...</div>
          ) : error ? (
            <div className="text-center py-12 text-red-500">{error}</div>
          ) : (
            <ArticleEditor slug={slug} initialData={{ ...article, body: article.body?.raw }} />
          )}
        </div>
      </main>
    </div>
  );
}