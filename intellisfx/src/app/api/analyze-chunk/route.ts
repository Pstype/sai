import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
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

    const supabase = createClient();
    const analysis = await analyzeVideoChunk(chunkUrl);

    const { error: analysisError } = await supabase.from('video_analysis').insert({ video_id: projectId, ...analysis });

    if (analysisError) {
      console.error('Error inserting video analysis:', analysisError);
      return NextResponse.json({ error: analysisError.message }, { status: 500 });
    }

    const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
    const { error: progressError } = await supabase.from('processing_jobs').update({ progress }).eq('project_id', projectId);

    if (progressError) {
      console.error('Error updating progress:', progressError);
      return NextResponse.json({ error: progressError.message }, { status: 500 });
    }

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