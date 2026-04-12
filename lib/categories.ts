import fs from 'fs';
import path from 'path';

const categoriesFile = path.join(process.cwd(), 'data/categories.json');

interface Category {
  name: string;
  slug: string;
  icon?: string;
  description?: string;
}

function ensureDataDir() {
  const dir = path.join(process.cwd(), 'data');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function readCategories(): Category[] {
  ensureDataDir();
  if (!fs.existsSync(categoriesFile)) {
    return [
      { name: 'Machine Learning', slug: 'machine-learning', icon: '🧠', description: 'Les algorithmes qui apprennent' },
      { name: 'Deep Learning', slug: 'deep-learning', icon: '🔮', description: 'Réseaux de neurones profonds' },
      { name: 'IA Générative', slug: 'ia-generative', icon: '✨', description: 'Création de contenu par l\'IA' },
      { name: 'Actualités IA', slug: 'actualites-ia', icon: '📰', description: 'Dernières nouvelles du secteur' },
      { name: 'Tutoriels & Guides', slug: 'tutoriels-guides', icon: '📚', description: 'Apprenez pas à pas' },
      { name: 'Outils & Applications', slug: 'outils-applications', icon: '🛠️', description: 'Découvrez les meilleurs outils' },
      { name: 'Éthique & Société', slug: 'ethique-societe', icon: '⚖️', description: 'Enjeux et réflexions' },
      { name: 'Business & IA', slug: 'business-ia', icon: '💼', description: 'L\'IA dans l'entreprise' },
    ];
  }
  return JSON.parse(fs.readFileSync(categoriesFile, 'utf8'));
}

function writeCategories(categories: Category[]) {
  ensureDataDir();
  fs.writeFileSync(categoriesFile, JSON.stringify(categories, null, 2), 'utf8');
}

export function getAllCategories(): Category[] {
  return readCategories();
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return readCategories().find(c => c.slug === slug);
}

export function addCategory(name: string): Category {
  const categories = readCategories();
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const newCategory = { name, slug };
  categories.push(newCategory);
  writeCategories(categories);
  return newCategory;
}

export function updateCategory(slug: string, name: string): Category | null {
  const categories = readCategories();
  const index = categories.findIndex(c => c.slug === slug);
  if (index === -1) return null;
  categories[index].name = name;
  writeCategories(categories);
  return categories[index];
}

export function deleteCategory(slug: string): boolean {
  const categories = readCategories();
  const filtered = categories.filter(c => c.slug !== slug);
  if (filtered.length === categories.length) return false;
  writeCategories(filtered);
  return true;
}