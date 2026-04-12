import { NextRequest, NextResponse } from 'next/server';
import { getAllCategories, addCategory } from '@/lib/categories';
import { getSession } from '@/lib/auth';

export async function GET() {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const categories = getAllCategories();
  return NextResponse.json({ categories });
}

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ error: 'Missing name' }, { status: 400 });
    }

    const category = addCategory(name);
    return NextResponse.json({ success: true, category });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to create category' }, { status: 500 });
  }
}