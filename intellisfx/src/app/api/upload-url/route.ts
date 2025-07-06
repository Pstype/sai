import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl) {
    console.error('Missing Supabase URL credential.');
    return NextResponse.json({ error: 'Supabase URL is not configured.' }, { status: 500 });
  }

  if (!supabaseServiceRoleKey) {
    console.error('Missing Supabase service role key credential.');
    return NextResponse.json({ error: 'Supabase service role key is not configured.' }, { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

  try {
    const { data, error } = await supabase.storage.from('videos').createSignedUploadUrl('video.mp4');

    if (error) {
      console.error('Error creating signed upload URL:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (e) {
    const error = e as Error;
    console.error('An unexpected error occurred:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}