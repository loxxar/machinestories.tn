import { getSession } from '@/lib/auth';
import { getAdminArticles, saveArticle } from '@/lib/content';
import { NextResponse } from 'next/server';
import { slugify } from '@/lib/utils';
import matter from 'gray-matter';

// Configuration GitHub
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_OWNER = process.env.GITHUB_OWNER;
const GITHUB_REPO = process.env.GITHUB_REPO;
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || 'main';
const GITHUB_API_BASE = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/contents/content/blog`;

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

    const frontmatterData = {
      title: frontmatter.title,
      slug: slug,
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

    // 1. Get current file SHA if exists
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
      console.error('Error fetching existing file SHA from GitHub:', e);
    }

    // 2. Create or Update file
    const putRes = await fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github+json',
        'X-GitHub-Api-Version': '2022-11-28',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: `feat: create article ${slug}`,
        content: Buffer.from(content).toString('base64'),
        branch: GITHUB_BRANCH,
        sha,
      }),
    });

    if (!putRes.ok) {
      const errorData = await putRes.json();
      throw new Error(`GitHub API error: ${errorData.message}`);
    }

    return NextResponse.json({ slug, fileSlug, success: true });
  } catch (error) {
    console.error('API POST Error:', error);
    return NextResponse.json({ error: 'Failed to create article' }, { status: 500 });
  }
}