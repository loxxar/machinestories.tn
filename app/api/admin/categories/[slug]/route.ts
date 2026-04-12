import { NextResponse } from 'next/server';
import { getCategoryBySlug, updateCategory, deleteCategory } from '@/lib/categories';
import { getSession } from '@/lib/auth';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
  }
  return NextResponse.json({ category });
}

export async function PUT(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const { slug } = await params;
  const { name } = await request.json();
  const category = updateCategory(slug, name);
  if (!category) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
  }
  return NextResponse.json({ category });
}

export async function DELETE(request: Request, { params }: RouteParams) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }
  const { slug } = await params;
  const deleted = deleteCategory(slug);
  if (!deleted) {
    return NextResponse.json({ error: 'Non trouvé' }, { status: 404 });
  }
  return NextResponse.json({ success: true });
}