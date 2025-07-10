import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"
import type { VideoUploadRequest } from "../_shared/types.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { projectId, videoUrl, fileName, fileSize, duration }: VideoUploadRequest = await req.json();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
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

    return new Response(JSON.stringify({ jobId: job.id }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
})
