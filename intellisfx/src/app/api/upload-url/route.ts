import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    console.log('Supabase URL:', supabaseUrl);
    console.log('Supabase Key present:', !!supabaseKey);
    if (!supabaseUrl || !supabaseKey) {
      console.error('Supabase credentials not set');
      return NextResponse.json({ error: 'Supabase credentials not set' }, { status: 500 });
    }
    const supabase = createClient(supabaseUrl, supabaseKey);

    let body;
    try {
      body = await req.json();
      console.log('Request body:', body);
    } catch (parseErr) {
      console.error('Failed to parse request body:', parseErr);
      return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
    }
    const { fileName } = body;
    if (!fileName || typeof fileName !== 'string') {
      console.error('Invalid fileName:', fileName);
      return NextResponse.json({ error: 'Invalid fileName' }, { status: 400 });
    }
    // Sanitize filename
    const sanitizedFileName = fileName.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    const filePath = `videos/${Date.now()}-${sanitizedFileName}`;

    // Generate signed upload URL
    const { data, error } = await supabase.storage
      .from('raw_videos')
      .createSignedUploadUrl(filePath, 60 * 10); // 10 minutes expiry

    if (error || !data) {
      console.error('Supabase signed URL error:', error);
      return NextResponse.json({ error: error?.message || 'Failed to generate signed URL' }, { status: 500 });
    }

    console.log('Signed URL generated:', data.signedUrl);
    return NextResponse.json({ signedUrl: data.signedUrl, filePath });
  } catch (err: any) {
    console.error('API error:', err);
    return NextResponse.json({ error: err.message || 'Internal server error' }, { status: 500 });
  }
} 