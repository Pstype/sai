import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import type { VideoUploadRequest } from '@/types/api';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

export async function OPTIONS() {
  return new Response("ok", { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const { projectId, videoUrl, fileName, fileSize, duration }: VideoUploadRequest = await request.json();
    
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: project, error: projectError } = await supabase
      .from('projects')
      .update({ status: 'analyzing' })
      .eq('id', projectId)
      .select()
      .single();

    if (projectError) throw projectError;

    const { data: video, error: videoError } = await supabase
      .from('videos')
      .insert({ project_id: projectId, url: videoUrl, name: fileName, size: fileSize, duration })
      .select()
      .single();

    if (videoError) throw videoError;

    const { data: job, error: jobError } = await supabase
      .from('processing_jobs')
      .insert({ project_id: projectId, type: 'analysis', stage: 'uploading', status: 'pending' })
      .select()
      .single();

    if (jobError) throw jobError;

    // TODO: Implement chunking and trigger analyze-chunk

    return NextResponse.json({ jobId: job.id }, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
}