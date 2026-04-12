import { getSession } from '@/lib/auth';
import { getArticleBySlug, saveArticle, deleteArticle } from '@/lib/content';
import { NextResponse } from 'next/server';
import matter from 'gray-matter';

// Configuration GitHub
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/blog`;

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

    const frontmatterData = {
      title: frontmatter.title,
      slug: frontmatter.slug,
      description: frontmatter.description,
      date: frontmatter.date || new Date().toISOString().split('T')[0],
      lastModified: new Date().toISOString().split('T')[0],
      author: frontmatter.author || 'Machine Stories',
      category: frontmatter.category,
      tags: frontmatter.tags || [],
      image: frontmatter.image,
      imageAlt: frontmatter.imageAlt,
      featured: frontmatter.featured || false,
      draft: frontmatter.draft || false,
    };

    const content = matter.stringify(body || '', frontmatterData);
    const fileName = `${fileSlug}.mdx`;
    const apiUrl = `${GITHUB_API_BASE}/${fileName}`;

    // 1. Get current file SHA (obligatoire pour PUT si fichier existe)
    let sha: string | undefined;
    try {
      const getRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, {
        headers: {
          'Authorization': `Bearer ${GITHUB_TOKEN}`,
          'Accept': 'application/vnd.github+json',
          'X-GitHub-Api-Version': '2022-11-28',
        },
      });
      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      }
    } catch (e) {
      console.error('Error fetching file SHA:', e);
    }

    // 2. Update file on GitHub
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: update article ${fileSlug}`,
        content: Buffer.from(content).toString('base64'),
        branch: GITHUB_BRANCH,
        sha,
      }),
    });

    if (!putRes.ok) {
      const errorData = await putRes.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

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
  const fileName = `${fileSlug}.mdx`;
  const apiUrl = `${GITHUB_API_BASE}/${fileName}`;

  try {
    // 1. Get current file SHA (obligatoire pour DELETE)
    const getRes = await fetch(`${apiUrl}?ref=${GITHUB_BRANCH}`, {
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
      },
    });

    if (!getRes.ok) {
      return NextResponse.json({ error: 'Article non trouvé sur GitHub' }, { status: 404 });
    }

    const { sha } = await getRes.json();

    // 2. Delete file on GitHub
    const deleteRes = await fetch(apiUrl, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: delete article ${fileSlug}`,
        sha,
        branch: GITHUB_BRANCH,
      }),
    });

    if (!deleteRes.ok) {
      const errorData = await deleteRes.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }
  } catch (error) {
    console.error('API DELETE Error:', error);
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}