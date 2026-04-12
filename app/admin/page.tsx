'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

interface Article {
  slug: string;
  fileSlug: string;
  title: string;
  description: string;
  date: string;
  category: string;
  tags: string[];
  featured: boolean;
  draft: boolean;
}

export default function AdminPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    try {
      const res = await fetch('/api/admin/articles');
      if (res.ok) {
        const data = await res.json();
        setArticles(data.articles);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileSlug: string) => {
    if (!confirm('Supprimer cet article ?')) return;
    setDeleting(fileSlug);
    try {
      const res = await fetch(`/api/admin/articles/${fileSlug}`, { method: 'DELETE' });
      if (res.ok) {
        setArticles(articles.filter(a => a.fileSlug !== fileSlug));
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setDeleting(null);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Administration</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">Machine Stories</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            Déconnexion
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Articles</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">{articles.length} article(s)</p>
          </div>
          <div className="flex gap-3">
            <Link
              href="/admin/categories"
              className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-medium rounded-lg transition-colors"
            >
              Catégories
            </Link>
            <Link
              href="/admin/articles/new"
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
            >
              + Nouvel article
            </Link>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">Chargement...</div>
        ) : articles.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-900 rounded-lg">
            <p className="text-gray-500 dark:text-gray-400">Aucun article pour le moment</p>
            <Link href="/admin/articles/new" className="text-blue-600 hover:text-blue-700 mt-2 inline-block">
              Créer votre premier article
            </Link>
          </div>
        ) : (
          <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Titre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Catégorie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Statut
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {articles.map((article) => (
                  <tr key={article.fileSlug}>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{article.title}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 truncate max-w-xs">{article.description}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600 dark:text-gray-400">{article.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {format(new Date(article.date), 'd MMM yyyy', { locale: fr })}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        {article.featured && (
                          <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400 rounded">
                            Featured
                          </span>
                        )}
                        {article.draft && (
                          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 rounded">
                            Draft
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end gap-2">
                        <Link
                          href={`/admin/articles/${article.fileSlug}`}
                          className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
                        >
                          Éditer
                        </Link>
                        <button
                          onClick={() => handleDelete(article.fileSlug)}
                          disabled={deleting === article.fileSlug}
                          className="px-3 py-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 disabled:opacity-50"
                        >
                          {deleting === article.fileSlug ? '...' : 'Supprimer'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}