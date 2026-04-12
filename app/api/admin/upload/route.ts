import { NextRequest, NextResponse } from 'next/server';
import { getSession } from '@/lib/auth';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const SCW_ACCESS_KEY = process.env.SCW_ACCESS_KEY;
const SCW_SECRET_KEY = process.env.SCW_SECRET_KEY;
const SCW_REGION = process.env.SCW_REGION;
const SCW_BUCKET = process.env.SCW_BUCKET;
const SCW_ENDPOINT = process.env.SCW_ENDPOINT;

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session?.authenticated) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  try {
    const formData = await req.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'Aucun fichier fourni' }, { status: 400 });
    }

    // Validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Type de fichier non autorisé (JPEG, PNG, WEBP uniquement)' }, { status: 400 });
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'Fichier trop lourd (max 5MB)' }, { status: 400 });
    }

    const s3Client = new S3Client({
      region: SCW_REGION,
      endpoint: SCW_ENDPOINT,
      credentials: {
        accessKeyId: SCW_ACCESS_KEY!,
        secretAccessKey: SCW_SECRET_KEY!,
      },
    });

    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.name.replace(/\s+/g, '-')}`;
    const key = `machinestories/${fileName}`;

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await s3Client.send(
      new PutObjectCommand({
        Bucket: SCW_BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        ACL: 'public-read',
      })
    );

    const publicUrl = `https://${SCW_BUCKET}.s3.${SCW_REGION}.scw.cloud/${key}`;

    return NextResponse.json({ url: publicUrl });
  } catch (error) {
    console.error('Upload Error:', error);
    return NextResponse.json({ error: 'Erreur lors de l\'upload vers Scaleway' }, { status: 500 });
  }
}
