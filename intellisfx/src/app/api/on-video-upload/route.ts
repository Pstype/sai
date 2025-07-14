import { NextRequest, NextResponse } from 'next/server';
import { triggerVideoUpload } from '@/lib/supabase';
import { corsHeaders } from '@/lib/cors';
import { z } from 'zod';

const videoUploadRequestSchema = z.object({
  projectId: z.string().uuid(),
  videoUrl: z.string().min(1),
  fileName: z.string().min(1),
  fileSize: z.number().positive(),
  duration: z.number().positive(),
});

export async function OPTIONS() {
  return new Response("ok", { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const payload = videoUploadRequestSchema.parse(body);

    // Securely trigger the backend processing
    const data = await triggerVideoUpload(payload);

    return NextResponse.json({ ...data }, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 202, // Accepted
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request payload', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: error.message }, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
}