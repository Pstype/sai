import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"
import { analyzeVideoChunk } from "../_shared/ai-clients.ts";
import type { ChunkAnalysisRequest } from "../_shared/types.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { projectId, chunkUrl, chunkIndex, totalChunks }: ChunkAnalysisRequest = await req.json();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const analysis = await analyzeVideoChunk(chunkUrl);

    await supabase.from('video_analysis').insert({ video_id: projectId, ...analysis });

    const progress = Math.round(((chunkIndex + 1) / totalChunks) * 100);
    await supabase.from('processing_jobs').update({ progress }).eq('project_id', projectId);

    if (chunkIndex < totalChunks - 1) {
      // Trigger next chunk analysis
    } else {
      // Trigger music and sfx generation
    }

    return new Response(JSON.stringify({ success: true }), {
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
