import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { corsHeaders } from '@/lib/cors';
import { generateMusic } from '@/lib/ai-clients';
import type { MusicGenerationRequest } from '@/types/api';

export async function POST(request: NextRequest) {
  try {
    const { projectId, consolidatedAnalysis }: MusicGenerationRequest = await request.json();
    const supabase = createClient();

    const musicUrl = await generateMusic(consolidatedAnalysis);

    await supabase.from('audio_layers').insert({ project_id: projectId, url: musicUrl, type: 'music' });

    await supabase.from('processing_jobs').update({ stage: 'generating_sfx' }).eq('project_id', projectId);

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

export async function OPTIONS() {
  return new Response("ok", { headers: corsHeaders });
}