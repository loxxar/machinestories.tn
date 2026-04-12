'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Category {
  name: string;
  slug: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(data.categories);
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) return;
    try {
      const res = await fetch('/api/admin/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName }),
      });
      if (res.ok) {
        setNewName('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleUpdate = async (slug: string) => {
    if (!editingName.trim()) return;
    try {
      const res = await fetch(`/api/admin/categories/${slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: editingName }),
      });
      if (res.ok) {
        setEditingSlug(null);
        setEditingName('');
        fetchCategories();
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm('Supprimer cette catégorie ?')) return;
    try {
      const res = await fetch(`/api/admin/categories/${slug}`, { method: 'DELETE' });
      if (res.ok) {
        setCategories(categories.filter(c => c.slug !== slug));
      }
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white">
              ← Retour
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Catégories</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 py-8">
        <form onSubmit={handleAdd} className="mb-8 flex gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Nouvelle catégorie..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
          >
            Ajouter
          </button>
        </form>

        {loading ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">Chargement...</div>
        ) : (
          <div className="bg-white dark:bg-gray-900 shadow rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Nom</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Slug</th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                {categories.map((cat) => (
                  <tr key={cat.slug}>
                    <td className="px-6 py-4">
                      {editingSlug === cat.slug ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className="w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded dark:bg-gray-800 dark:text-white"
                          autoFocus
                        />
                      ) : (
                        <span className="text-sm font-medium text-gray-900 dark:text-white">{cat.name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">{cat.slug}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      {editingSlug === cat.slug ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => handleUpdate(cat.slug)}
                            className="px-3 py-1 text-sm text-green-600 hover:text-green-700"
                          >
                            Sauver
                          </button>
                          <button
                            onClick={() => { setEditingSlug(null); setEditingName(''); }}
                            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900"
                          >
                            Annuler
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() => { setEditingSlug(cat.slug); setEditingName(cat.name); }}
                            className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700"
                          >
                            Modifier
                          </button>
                          <button
                            onClick={() => handleDelete(cat.slug)}
                            className="px-3 py-1 text-sm text-red-600 hover:text-red-700"
                          >
                            Supprimer
                          </button>
                        </div>
                      )}
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