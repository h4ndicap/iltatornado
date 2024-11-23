import { NextResponse } from 'next/server';
import { uploadToS3 } from '@/lib/s3client';

export async function POST(req: Request) {
  const formData = await req.formData();
  const file = formData.get('file') as File;

  if (!file) {
    return NextResponse.json({ error: 'File is required' }, { status: 400 });
  }

  const arrayBuffer = await file.arrayBuffer();
  const fileName = `${Date.now()}-${file.name}`;

  try {
    const url = await uploadToS3(fileName, Buffer.from(arrayBuffer));
    return NextResponse.json({ url });
  } catch (error) {
    console.error('S3 Upload Error:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
