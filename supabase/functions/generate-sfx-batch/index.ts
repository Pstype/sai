import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"
import { corsHeaders } from "../_shared/cors.ts"
import { batchGenerateSFX } from "../_shared/ai-clients.ts";
import type { SFXGenerationRequest } from "../_shared/types.ts";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { projectId, sfxPrompts }: SFXGenerationRequest = await req.json();
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const sfxUrls = await batchGenerateSFX(sfxPrompts);

    const layers = sfxUrls.map(url => ({ project_id: projectId, url, type: 'sfx' }));
    await supabase.from('audio_layers').insert(layers);

    await supabase.from('processing_jobs').update({ stage: 'mixing' }).eq('project_id', projectId);

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
