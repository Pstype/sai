import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';
import { corsHeaders } from '@/lib/cors';
import { analyzeVideoChunk } from '@/lib/ai-clients';
import type { ChunkAnalysisRequest } from '@/types/api';

export async function OPTIONS() {
  return new Response('ok', { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body: ChunkAnalysisRequest = await request.json();
    const { projectId, chunkUrl, chunkIndex, totalChunks } = body;

    const analysis = await analyzeVideoChunk(chunkUrl);

    await supabase.from('video_analysis').insert({ video_id: projectId, ...analysis });

    const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
    await supabase.from('processing_jobs').update({ progress }).eq('project_id', projectId);

    if (chunkIndex < totalChunks - 1) {
      // Trigger next chunk analysis
    } else {
      // Trigger music and sfx generation
    }

    return NextResponse.json({ success: true }, {
      headers: corsHeaders,
      status: 200,
    });
  } catch (error) {
    console.error('Error in analyze-chunk route:', error);
    return NextResponse.json({ error: error instanceof Error ? error.message : 'Internal Server Error' }, {
      headers: corsHeaders,
      status: 400,
    });
  }
}