import { getSession } from '@/lib/auth';
import { getArticleBySlug, saveArticle, deleteArticle } from '@/lib/content';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { slug: fileSlug } = await params;
  // Note: here 'slug' in params is the fileSlug from the dashboard link
  const articles = (await import('@/lib/content')).getAdminArticles();
  const article = articles.find(a => a.fileSlug === fileSlug);

  if (!article) {
    return NextResponse.json({ error: 'Article non trouvé' }, { status: 404 });
  }

  return NextResponse.json({ article });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const { slug: fileSlug } = await params;
    const { frontmatter, body } = await request.json();

    saveArticle({
      ...frontmatter,
      fileSlug,
      body: { raw: body || '' }
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('API PUT Error:', error);
    return NextResponse.json({ error: 'Failed to update article' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const { slug: fileSlug } = await params;
  const success = deleteArticle(fileSlug);

  if (!success) {
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}