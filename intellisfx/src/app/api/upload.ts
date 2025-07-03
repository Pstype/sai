import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!supabaseUrl || !supabaseKey) {
    return NextResponse.json({ error: 'Supabase credentials not set' }, { status: 500 });
  }
  const supabase = createClient(supabaseUrl, supabaseKey);

  const formData = await req.formData();
  const file = formData.get('file');
  const filename = formData.get('filename');
  if (!file || typeof filename !== 'string' || !(file instanceof File)) {
    return NextResponse.json({ error: 'No file uploaded or invalid file type' }, { status: 400 });
  }

  // Server-side file size validation
  if (file.size > 1024 * 1024 * 1024) { // 1GB
    return NextResponse.json({ error: 'File size exceeds 1GB limit' }, { status: 400 });
  }

  // Validate file type more strictly
  if (!file.type || !file.type.startsWith('video/')) {
    return NextResponse.json({ error: 'Only video files are allowed' }, { status: 400 });
  }

  // Sanitize filename
  const sanitizedFilename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const filePath = `videos/${Date.now()}_${sanitizedFilename}`;
  const { error: uploadError } = await supabase.storage.from('raw_videos').upload(filePath, buffer, {
    contentType: file.type || 'video/mp4',
    upsert: false,
  });
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }
  const { data: urlData } = supabase.storage.from('raw_videos').getPublicUrl(filePath);
  if (!urlData || !urlData.publicUrl) {
    return NextResponse.json({ error: 'Failed to get public URL' }, { status: 500 });
  }
  return NextResponse.json({ publicUrl: urlData.publicUrl });
}