'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
const RichTextEditor = dynamic(() => import('./RichTextEditor'), { 
  ssr: false 
});

interface ArticleData {
  title?: string;
  description?: string;
  date?: string;
  author?: string;
  category?: string;
  tags?: string[];
  image?: string;
  imageAlt?: string;
  featured?: boolean;
  draft?: boolean;
  slug?: string;
  body?: string;
}

interface ArticleEditorProps {
  slug?: string;
  initialData?: ArticleData;
}

const DEFAULT_FRONTMATTER = {
  title: '',
  description: '',
  date: new Date().toISOString().split('T')[0],
  author: 'Machine Stories',
  category: 'Actualités IA',
  tags: [],
  image: '',
  imageAlt: '',
  featured: false,
  draft: false,
};

export default function ArticleEditor({ slug, initialData }: ArticleEditorProps) {
  const [frontmatter, setFrontmatter] = useState(initialData || DEFAULT_FRONTMATTER);
  const [body, setBody] = useState(initialData?.body || '');
  const [tagsInput, setTagsInput] = useState(initialData?.tags?.join(', ') || '');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => {
        const loadedCategories = data.categories.map((c: { name: string }) => c.name);
        setCategories(loadedCategories);
        
        // Validation: if current category is not in list, set to first one or empty
        if (loadedCategories.length > 0 && (!frontmatter.category || !loadedCategories.includes(frontmatter.category))) {
          setFrontmatter(prev => ({ ...prev, category: loadedCategories[0] }));
        }
        
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSubmit = async (e: React.FormEvent, publishAsDraft = false) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    const tags = tagsInput.split(',').map(t => t.trim()).filter(Boolean);
    const finalData = { ...frontmatter, tags, draft: publishAsDraft };

    const url = slug ? `/api/admin/articles/${slug}` : '/api/admin/articles';
    const method = slug ? 'PUT' : 'POST';
    const { body: _, ...cleanFrontmatter } = finalData as any;

    console.log('DEBUG SAVE ARTICLE:', {
      url,
      method,
      payload: { frontmatter: cleanFrontmatter, body }
    });

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ frontmatter: cleanFrontmatter, body }),
      });

      if (res.ok) {
        setMessage({ type: 'success', text: 'Article enregistré !' });
        setTimeout(() => router.push('/admin'), 1500);
      } else {
        setMessage({ type: 'error', text: "Erreur lors de l'enregistrement" });
      }
    } catch {
      setMessage({ type: 'error', text: 'Erreur serveur' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setFrontmatter(prev => ({ ...prev, image: data.url }));
        setUploadError(null);
      } else {
        setUploadError(data.error || "Erreur lors de l'upload");
      }
    } catch {
      setUploadError("Erreur réseau lors de l'upload");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form className="space-y-6">
      {message && (
        <div className={`p-4 rounded-lg ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="font-semibold text-gray-900 dark:text-white">Contenu</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Titre *</label>
            <input
              type="text"
              value={frontmatter.title}
              onChange={(e) => setFrontmatter({ ...frontmatter, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description *</label>
            <textarea
              value={frontmatter.description}
              onChange={(e) => setFrontmatter({ ...frontmatter, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
              <input
                type="date"
                value={frontmatter.date}
                onChange={(e) => setFrontmatter({ ...frontmatter, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Auteur</label>
              <input
                type="text"
                value={frontmatter.author}
                onChange={(e) => setFrontmatter({ ...frontmatter, author: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Catégorie</label>
            <select
              value={frontmatter.category}
              onChange={(e) => setFrontmatter({ ...frontmatter, category: e.target.value })}
              disabled={loading}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
            >
              <option value="">Sélectionner...</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Tags (séparés par virgules)</label>
            <input
              type="text"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              placeholder="IA, SEO, Machine Learning"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Image de couverture</label>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    isUploading 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-cyan-600 hover:bg-cyan-700 active:bg-cyan-800'
                  } text-white text-sm shadow-sm`}
                >
                  {isUploading ? 'Chargement...' : 'Choisir une image'}
                </button>
              </div>

              {uploadError && (
                <p className="text-sm text-red-500 font-medium">{uploadError}</p>
              )}

              {frontmatter.image && (
                <div className="relative w-full max-w-xs group">
                  <img 
                    src={frontmatter.image} 
                    alt="Aperçu" 
                    className="rounded-lg max-h-32 object-cover border border-slate-700 shadow-md"
                  />
                  <div className="mt-2">
                    <input
                      type="text"
                      value={frontmatter.image}
                      readOnly
                      className="w-full px-3 py-1.5 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800/50 dark:text-gray-400 text-xs font-mono truncate"
                    />
                    <p className="text-[10px] text-gray-500 mt-1 italic">URL de l&apos;image (lecture seule)</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Alt Image</label>
            <input
              type="text"
              value={frontmatter.imageAlt}
              onChange={(e) => setFrontmatter({ ...frontmatter, imageAlt: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg dark:bg-gray-800 dark:text-white"
            />
          </div>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={frontmatter.featured}
                onChange={(e) => setFrontmatter({ ...frontmatter, featured: e.target.checked })}
                className="rounded border-gray-300"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Article mis en avant</span>
            </label>
          </div>
        </div>

        <div>
          <h3 className="font-semibold text-gray-900 dark:text-white mb-4">Corps du texte</h3>
          <RichTextEditor content={body} onChange={setBody} />
        </div>
      </div>

      <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <button
          type="button"
          onClick={(e) => handleSubmit(e, true)}
          disabled={saving}
          className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
        >
          Sauvegarder en brouillon
        </button>
        <button
          type="button"
          onClick={(e) => handleSubmit(e, false)}
          disabled={saving}
          className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50"
        >
          {saving ? 'Enregistrement...' : 'Publier'}
        </button>
      </div>
    </form>
  );
}