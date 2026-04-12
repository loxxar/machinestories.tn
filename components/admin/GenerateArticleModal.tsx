'use client';

import { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { marked } from 'marked';

interface GenerateArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function GenerateArticleModal({ isOpen, onClose, onSuccess }: GenerateArticleModalProps) {
  const [subject, setSubject] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<string[]>([]);
  const [status, setStatus] = useState<'idle' | 'generating' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      fetchCategories();
      setStatus('idle');
      setSubject('');
      setErrorMsg('');
    }
  }, [isOpen]);

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        const cats = data.categories.map((c: any) => c.name);
        setCategories(cats);
        if (cats.length > 0) setCategory(cats[0]);
      }
    } catch (err) {
      console.error('Failed to fetch categories');
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !category) return;

    setStatus('generating');
    setErrorMsg('');

    try {
      const prompt = `# RÔLE
Tu es un rédacteur expert, senior et reconnu, avec 15 ans d'expérience dans la rédaction d'articles de haute qualité — presse, contenu éditorial, content marketing B2B. Tu écris avec autorité, précision et singularité. Tu n'es jamais générique.

# OBJECTIF
Rédige un article de blog complet en français sur le sujet : ${subject}
Catégorie : ${category}
Angle choisi : l'angle le plus différenciant et contre-intuitif sur ce sujet pour un lecteur francophone professionnel
Lecteur cible : professionnel francophone, à l'aise avec l'IA, qui cherche des insights actionnables — pas de la vulgarisation

# RÈGLES DE RÉDACTION IMPÉRATIVES

## AVANT D'ÉCRIRE
- Formule l'angle en une phrase avant la première ligne
- Chaque section répond à une question précise du lecteur
- Le plan se lit comme un chemin logique, pas un sommaire de manuel

## TITRE ET ACCROCHE
- Le titre est une promesse contractuelle : spécifique, honnête, irrésistible — jamais vague ni racoleur
- Les 3 premières phrases : captent, qualifient, promettent
- Interdit en introduction : "Dans cet article nous allons voir...", "Bienvenue...", tout contexte inutile

## STYLE ET CLARTÉ
- Une idée par paragraphe, sans exception
- Alterner phrases courtes (affirmation) et longues (nuance)
- Toute phrase de plus de 35 mots est scindée
- Mots parasites bannis : "en effet", "il convient de noter que", "comme nous pouvons le constater", "dans le cadre de", "force est de constater"
- À chaque affirmation abstraite : exemple concret, chiffre ou anecdote
- Voix active uniquement. Verbes forts — jamais "faire", "mettre en place", "effectuer"

## STRUCTURE
- Intertitres = mini-promesses, pas titres de chapitres
- Chaque transition résume ce qui vient d'être établi et annonce ce qui suit
- La conclusion ouvre (action/réflexion) — elle ne résume jamais

## CRÉDIBILITÉ
- Citer uniquement si la source renforce l'argument
- Admettre les nuances : bannir "toujours" et "jamais" dans les affirmations générales
- Avoir un point de vue tranché et l'assumer

# FORMAT DE SORTIE OBLIGATOIRE
Réponds UNIQUEMENT avec un JSON valide, sans backticks, sans texte avant ou après, avec cette structure exacte :
{
  "title": "Titre SEO optimisé 60 chars max, promesse contractuelle",
  "slug": "slug-url-sans-accents-ni-caracteres-speciaux",
  "description": "Meta description 150-160 caractères avec mot-clé principal",
  "tags": ["tag1", "tag2", "tag3", "tag4"],
  "body": "Corps complet en markdown, minimum 1500 mots, structure ## H2 et ### H3, FAQ 3 questions en fin d'article, introduction sans formules interdites, conclusion qui ouvre et n'est pas un résumé"
}
`;

      // 1. Appel direct OpenRouter depuis le client
      const aiRes = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://machinestories.tn"
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-flash-001",
          max_tokens: 5000,
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        })
      });

      if (!aiRes.ok) throw new Error('Échec de l\'appel à OpenRouter');

      const aiData = await aiRes.json();
      const aiContent = aiData.choices[0].message.content;
      
      // Nettoyage robuste
      const cleaned = aiContent
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/i, '')
        .trim();

      console.log('Cleaned AI Content:', cleaned);

      let generatedJson;
      try {
        const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
        if (!jsonMatch) throw new Error('JSON introuvable dans la réponse');
        generatedJson = JSON.parse(jsonMatch[0]);

        if (!generatedJson.title || !generatedJson.body || !generatedJson.slug) {
          throw new Error('Champs manquants dans le JSON généré');
        }
      } catch (e: any) {
        console.error('Parsing error. Original content:', aiContent);
        throw new Error(e.message || 'Le format JSON généré est invalide.');
      }

      // 1. Recherche Unsplash multiple (Couverture + 2 images corps)
      const fetchUnsplash = async (query: string) => {
        try {
          const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
            { headers: { Authorization: `Client-ID ${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}` } }
          );
          if (res.ok) {
            const data = await res.json();
            return data.results?.[0];
          }
        } catch (e) { console.error('Unsplash error:', e); }
        return null;
      };

      const [coverPhoto, photo1, photo2] = await Promise.all([
        fetchUnsplash(generatedJson.slug.replace(/-/g, ' ')),
        generatedJson.tags?.[0] ? fetchUnsplash(generatedJson.tags[0]) : Promise.resolve(null),
        generatedJson.tags?.[1] ? fetchUnsplash(generatedJson.tags[1]) : Promise.resolve(null),
      ]);

      // 2. Injection des images dans le body Markdown
      const photo1Tag = photo1 ? 
        `\n<img src="${photo1.urls.regular}" alt="${photo1.alt_description || ''}" style="float:left; margin: 0 24px 16px 0; width:320px; border-radius:12px; border: 1px solid rgba(255,255,255,0.1);" />\n` 
        : '';

      const photo2Tag = photo2 ? 
        `\n<img src="${photo2.urls.regular}" alt="${photo2.alt_description || ''}" style="float:right; margin: 0 0 16px 24px; width:320px; border-radius:12px; border: 1px solid rgba(255,255,255,0.1);" />\n` 
        : '';

      let bodyWithPhotos = generatedJson.body;
      
      // Injection après le 1er ## H2
      bodyWithPhotos = bodyWithPhotos.replace(/(## .+\n)/, `$1${photo1Tag}`);

      // Injection après le 3ème ## H2
      let h2Count = 0;
      bodyWithPhotos = bodyWithPhotos.replace(/## .+\n/g, (match: string) => {
        h2Count++;
        return h2Count === 3 ? match + photo2Tag : match;
      });

      // 3. Conversion Markdown -> HTML pour TipTap
      const htmlBody = await marked.parse(bodyWithPhotos);

      // 4. Sauvegarde via l'API locale
      const saveRes = await fetch('/api/admin/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          frontmatter: {
            title: generatedJson.title,
            slug: generatedJson.slug,
            description: generatedJson.description,
            date: new Date().toISOString().split('T')[0],
            author: 'Machine Stories',
            category: category,
            tags: generatedJson.tags || [],
            image: coverPhoto?.urls?.regular || '',
            imageAlt: coverPhoto?.alt_description || generatedJson.title,
            featured: false,
            draft: true,
          },
          body: htmlBody
        }),
      });

      if (saveRes.ok) {
        setStatus('success');
        onSuccess();
      } else {
        const err = await saveRes.json();
        throw new Error(err.error || 'Échec de la sauvegarde');
      }
    } catch (err: any) {
      console.error('Generation/Save error:', err);
      setStatus('error');
      setErrorMsg(err.message || 'Erreur lors de la génération');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity" 
        onClick={status !== 'generating' ? onClose : undefined}
      />

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Sparkles className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Générer avec l'IA</h2>
            </div>
            <button 
              onClick={onClose}
              disabled={status === 'generating'}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {status === 'idle' && (
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Sujet de l'article / Mots-clés cibles
                </label>
                <textarea
                  required
                  rows={4}
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ex: Pourquoi Gemini 2.0 Flash change la donne pour les développeurs Next.js"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all outline-none resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Catégorie
                </label>
                <select
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 dark:bg-gray-800 dark:text-white focus:ring-2 focus:ring-purple-500 transition-all outline-none"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl shadow-lg shadow-purple-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                Générer l'article
              </button>
            </form>
          )}

          {status === 'generating' && (
            <div className="py-12 flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <Loader2 className="w-12 h-12 text-purple-600 animate-spin" />
                <Sparkles className="w-6 h-6 text-purple-400 absolute -top-2 -right-2 animate-pulse" />
              </div>
              <div className="text-center">
                <p className="text-lg font-medium text-gray-900 dark:text-white">Génération en cours...</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Gemini 2.0 Flash rédige votre futur article (15-30s)</p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                <CheckCircle2 className="w-10 h-10 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">Article généré !</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">
                  L'article a été créé en tant que <strong>brouillon</strong> sur votre dépôt GitHub.
                </p>
              </div>
              <button
                onClick={onClose}
                className="w-full py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="py-8 flex flex-col items-center justify-center space-y-4">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-gray-900 dark:text-white">Échec de la génération</p>
                <p className="text-red-500 mt-2 text-sm px-4">{errorMsg}</p>
              </div>
              <div className="flex gap-3 w-full">
                <button
                  onClick={() => setStatus('idle')}
                  className="flex-1 py-3 bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  Réessayer
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-3 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  Annuler
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
