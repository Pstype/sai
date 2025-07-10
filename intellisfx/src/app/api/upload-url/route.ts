import { NextRequest, NextResponse } from 'next/server';
import { getSignedUploadUrl, triggerVideoUpload, supabase } from '@/lib/supabase';
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
    const { fileName, fileType, fileSize, duration } = validatedData;
    let { projectId } = validatedData;

    if (!projectId) {
        const { data, error } = await supabase.from('projects').insert({ name: fileName, status: 'uploading' }).select().single();
        if (error) throw error;
        projectId = data.id;
    }

    const filePath = `videos/${projectId}/${fileName}`;

    const { signedUrl, path } = await getSignedUploadUrl('videos', filePath, { contentType: fileType });

    await triggerVideoUpload({ projectId, videoUrl: path, fileName, fileSize, duration });

    return NextResponse.json({ signedUrl, jobId: null, projectId }, { status: 200 });

  } catch (error) {
    console.error('Error in upload-url route:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
