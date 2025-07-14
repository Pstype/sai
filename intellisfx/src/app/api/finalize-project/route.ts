import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';
import { corsHeaders } from '@/lib/cors';

export async function POST(request: NextRequest) {
  try {
    const { projectId } = await request.json();
    const supabase = createClient();

    const { error: projectError } = await supabase
      .from('projects')
      .update({ status: 'completed' })
      .eq('id', projectId);

    if (projectError) {
      console.error('Error updating project status:', projectError);
      return NextResponse.json({ error: projectError.message }, { status: 500 });
    }

    const { error: jobError } = await supabase
      .from('processing_jobs')
      .update({ status: 'completed', progress: 100, completed_at: new Date().toISOString() })
      .eq('project_id', projectId);

    if (jobError) {
      console.error('Error updating processing job:', jobError);
      return NextResponse.json({ error: jobError.message }, { status: 500 });
    }

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