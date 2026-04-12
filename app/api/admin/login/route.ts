import { createSession, getSessionCookie } from '@/lib/auth';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const envPw = process.env.ADMIN_PASSWORD;
    console.log('Attempted password:', JSON.stringify(password));
    console.log('Env password:', JSON.stringify(envPw));
    console.log('Match result:', password === envPw);
    
    if (!envPw || password !== envPw) {
      return NextResponse.json({ error: 'Mot de passe incorrect' }, { status: 401 });
    }

    const token = await createSession();
    const cookieStore = await cookies();
    cookieStore.set(getSessionCookie(token));

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('Login error:', e);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}