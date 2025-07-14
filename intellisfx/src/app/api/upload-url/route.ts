import { NextRequest, NextResponse } from 'next/server';
import { getSignedUploadUrl } from '@/lib/supabase';
import { createClient } from '@/lib/supabase-server';
import { z } from 'zod';

const uploadUrlRequestSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.string().min(1, 'File type is required'),
  fileSize: z.number().positive('File size must be positive'),
  duration: z.number().positive('Duration must be positive'),
  projectId: z.string().uuid().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = uploadUrlRequestSchema.parse(body);
    const { fileName } = validatedData;
    let { projectId } = validatedData;
    const supabase = createClient();

    if (!projectId) {
        const { data, error } = await supabase.from('projects').insert({ name: fileName, status: 'uploading' }).select('id').single();
        if (error) {
          console.error('Error creating project:', error);
          return NextResponse.json({ error: error.message }, { status: 500 });
        }
        projectId = data.id;
    }

    const filePath = `videos/${projectId}/${fileName}`;

    const { signedUrl, path } = await getSignedUploadUrl('videos', filePath);

    return NextResponse.json({ signedUrl, path, projectId }, { status: 200 });

  } catch (error) {
    console.error('Error in upload-url route:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
