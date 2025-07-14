import { NextRequest, NextResponse } from 'next/server';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { corsHeaders } from '@/lib/cors';
import { batchGenerateSFX } from '@/lib/ai-clients';
import type { SFXGenerationRequest } from '@/types/api';

export async function OPTIONS() {
  return new NextResponse("ok", { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, sfxPrompts }: SFXGenerationRequest = await request.json();
    const supabase = createClient();

    const sfxUrls = await batchGenerateSFX(sfxPrompts);

    const layers = sfxUrls.map(url => ({ project_id: projectId, url, type: 'sfx', status: 'pending' }));
    const { error: sfxError } = await supabase.from('audio_layers').insert(layers);

    if (sfxError) {
      console.error('Error inserting SFX layers:', sfxError);
      return NextResponse.json({ error: sfxError.message }, { status: 500 });
    }

    const { error: jobError } = await supabase.from('processing_jobs').update({ stage: 'mixing' }).eq('project_id', projectId);

    if (jobError) {
      console.error('Error updating processing job stage:', jobError);
      return NextResponse.json({ error: jobError.message }, { status: 500 });
    }

    return NextResponse.json({ success: true }, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
}