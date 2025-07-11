import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';
import { corsHeaders } from '@/lib/cors';
import { batchGenerateSFX } from '@/lib/ai-clients';
import type { SFXGenerationRequest } from '@/types/api';

export async function OPTIONS() {
  return new NextResponse("ok", { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, sfxPrompts }: SFXGenerationRequest = await request.json();

    const sfxUrls = await batchGenerateSFX(sfxPrompts);

    const layers = sfxUrls.map(url => ({ project_id: projectId, url, type: 'sfx' }));
    await supabase.from('audio_layers').insert(layers);

    await supabase.from('processing_jobs').update({ stage: 'mixing' }).eq('project_id', projectId);

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