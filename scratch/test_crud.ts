
import { getAdminArticles, saveArticle, deleteArticle, getAllArticles } from './lib/content';
import fs from 'fs';
import path from 'path';

async function testCrud() {
  console.log('--- TEST 1: Visibility of Drafts ---');
  // Create a draft
  const draftTitle = 'Test Draft Article';
  const draftFileSlug = 'test-draft-article';
  saveArticle({
    title: draftTitle,
    slug: draftFileSlug,
    fileSlug: draftFileSlug,
    description: 'Test description',
    category: 'Actualités IA',
    tags: ['test'],
    author: 'Tester',
    featured: false,
    draft: true, // It is a draft
    body: { raw: 'Test content' }
  });

  const adminArticles = getAdminArticles();
  const foundInAdmin = adminArticles.find(a => a.fileSlug === draftFileSlug);
  console.log('Draft found in Admin Articles:', !!foundInAdmin);

  const publicArticles = getAllArticles();
  const foundInPublic = publicArticles.find(a => a.fileSlug === draftFileSlug);
  console.log('Draft hidden from Public Articles:', !foundInPublic);

  console.log('\n--- TEST 2: Create Article (POST simulation) ---');
  const newTitle = 'New Test Article';
  const newFileSlug = 'new-test-article';
  saveArticle({
    title: newTitle,
    slug: newFileSlug,
    fileSlug: newFileSlug,
    description: 'Test description',
    category: 'Actualités IA',
    tags: ['test'],
    author: 'Tester',
    featured: false,
    draft: false,
    body: { raw: 'Test content' }
  });
  const exists = fs.existsSync(path.join(process.cwd(), 'content/blog', `${newFileSlug}.mdx`));
  console.log('File created in content/blog:', exists);

  console.log('\n--- TEST 3: Update Article (PUT simulation) ---');
  const updatedDescription = 'Updated description';
  saveArticle({
    title: newTitle,
    slug: newFileSlug,
    fileSlug: newFileSlug,
    description: updatedDescription, // Updated
    category: 'Actualités IA',
    tags: ['test'],
    author: 'Tester',
    featured: false,
    draft: false,
    body: { raw: 'Test content' }
  });
  
  // Re-read to verify
  const articlesAfterUpdate = getAdminArticles();
  const updatedArticle = articlesAfterUpdate.find(a => a.fileSlug === newFileSlug);
  console.log('Description correctly updated:', updatedArticle?.description === updatedDescription);

  console.log('\n--- TEST 4: Delete Article ---');
  const deleted = deleteArticle(newFileSlug);
  const stillExists = fs.existsSync(path.join(process.cwd(), 'content/blog', `${newFileSlug}.mdx`));
  console.log('File deleted:', deleted && !stillExists);

  // Clean up draft
  deleteArticle(draftFileSlug);
}

testCrud().catch(console.error);
