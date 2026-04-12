import ArticleEditor from '@/components/admin/ArticleEditor';
import Link from 'next/link';

export default function NewArticlePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <header className="bg-white dark:bg-gray-900 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
              ← Retour
            </Link>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Nouvel Article</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white dark:bg-gray-900 shadow rounded-lg p-6">
          <ArticleEditor />
        </div>
      </main>
    </div>
  );
}