import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase-server';
import { corsHeaders } from '@/lib/cors';

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();

    await supabase
      .from('projects')
      .update({ status: 'completed' })
      .eq('id', projectId);

    await supabase
      .from('processing_jobs')
      .update({ status: 'completed', progress: 100, completed_at: new Date().toISOString() })
      .eq('project_id', projectId);

    // TODO: Broadcast completion message

    return NextResponse.json({ success: true }, {
      status: 200,
      headers: corsHeaders,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, {
      status: 400,
      headers: corsHeaders,
    });
  }
}

export async function OPTIONS() {
  return new NextResponse("ok", { headers: corsHeaders });
}