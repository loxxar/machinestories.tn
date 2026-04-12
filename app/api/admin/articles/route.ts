import { getSession } from '@/lib/auth';
import { getAdminArticles, saveArticle } from '@/lib/content';
import { NextResponse } from 'next/server';
import { slugify } from '@/lib/utils';

const contentDirectory = path.join(process.cwd(), 'content/blog');

export async function GET() {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const articles = getAdminArticles().map(a => ({
    slug: a.slug,
    fileSlug: a.fileSlug,
    title: a.title,
    description: a.description,
    date: a.date,
    category: a.category,
    tags: a.tags,
    featured: a.featured,
    draft: a.draft,
  }));

  return NextResponse.json({ articles });
}

export async function POST(request: Request) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { frontmatter, body } = await request.json();
    const fileSlug = frontmatter.fileSlug || frontmatter.slug || slugify(frontmatter.title || 'Untitled');
    const slug = frontmatter.slug || slugify(frontmatter.title || 'Untitled');

    saveArticle({
      ...frontmatter,
      slug,
      fileSlug,
      body: { raw: body || '' }
    });

    return NextResponse.json({ slug, fileSlug, success: true });
  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}