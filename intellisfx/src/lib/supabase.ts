import { createClient, RealtimeChannel } from '@supabase/supabase-js';
import { Database, RealtimePostgresChangesPayload } from '@/types/supabase';
import { env } from '@/config/env';

export const supabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const STORAGE_BUCKETS = {
    videos: {
        name: 'videos',
        maxSize: 1024 * 1024 * 1024, // 1GB
        allowedTypes: ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/x-matroska'],
    },
    audio: {
        name: 'audio',
        maxSize: 100 * 1024 * 1024, // 100MB
        allowedTypes: ['audio/mpeg', 'audio/wav', 'audio/ogg'],
    },
    thumbnails: {
        name: 'thumbnails',
        maxSize: 5 * 1024 * 1024, // 5MB
        allowedTypes: ['image/jpeg', 'image/png'],
    },
};

/**
 * Get a signed URL for uploading a file to Supabase Storage
 * @param bucket - The bucket name (must be one of STORAGE_BUCKETS keys)
 * @param filePath - The path to store the file in the bucket
 * @param options - Upload options
 * @param options.expiresIn - URL expiration time in seconds (default: 3600)
 * @param options.upsert - Whether to overwrite existing file (default: false)
 */
export async function getSignedUploadUrl(
    bucket: string,
    filePath: string,
    options: { expiresIn?: number; upsert?: boolean; } = {}
) {
    const bucketConfig = STORAGE_BUCKETS[bucket as keyof typeof STORAGE_BUCKETS];
    if (!bucketConfig) {
        throw new Error('Invalid bucket specified');
    }

    const { expiresIn = 3600, upsert = false } = options;

    try {
        // Use inline type definition to satisfy TypeScript
        const { data, error } = await supabase.storage
            .from(bucketConfig.name)
            .createSignedUploadUrl(filePath, {
                expiresIn: expiresIn,
                upsert: upsert,
            } as {
                expiresIn: number;
                upsert: boolean;
            });

        if (error) {
            console.error('Error creating signed upload URL:', error);
            throw new Error(error.message);
        }

        if (!data) {
            throw new Error('No data returned from Supabase');
        }

        return {
            signedUrl: data.signedUrl,
            path: data.path
        };
    } catch (error) {
        console.error('Unexpected error in getSignedUploadUrl:', error);
        throw error instanceof Error ? error : new Error('An unexpected error occurred.');
    }
}


// --- NEW REAL-TIME FUNCTIONS ---

let projectChannel: RealtimeChannel | null = null;

export function subscribeToProject(
    projectId: string,
    onUpdate: (payload: RealtimePostgresChangesPayload<unknown>) => void
): RealtimeChannel {
    if (projectChannel && projectChannel.topic === `realtime:public:projects:id=eq.${projectId}`) {
        return projectChannel;
    }

    if (projectChannel) {
        projectChannel.unsubscribe();
    }

    projectChannel = supabase.channel(`project-${projectId}`);
    projectChannel
        .on(
            'postgres_changes',
            {
                event: '*',
                schema: 'public',
                table: 'processing_jobs',
                filter: `project_id=eq.${projectId}`,
            },
            (payload) => {
                onUpdate(payload);
            }
        )
        .subscribe((status, err) => {
            if (status === 'SUBSCRIBED') {
                console.log(`Subscribed to project ${projectId}`);
            }
            if (err) {
                console.error(`Error subscribing to project ${projectId}:`, err);
            }
        });

    return projectChannel;
}

export function unsubscribeFromProject() {
    if (projectChannel) {
        projectChannel.unsubscribe();
        projectChannel = null;
    }
}


// --- NEW EDGE FUNCTION TRIGGERS ---

async function triggerEdgeFunction(functionName: string, payload: Record<string, unknown>) {
    const { data, error } = await supabase.functions.invoke(functionName, {
        body: payload,
    });

    if (error) {
        console.error(`Error invoking ${functionName}:`, error);
        throw new Error(`Failed to trigger ${functionName}: ${error.message}`);
    }

    return data;
}

export const triggerVideoUpload = (payload: {
    projectId: string;
    videoUrl: string;
    fileName: string;
    fileSize: number;
    duration: number;
}) => triggerEdgeFunction('on-video-upload', payload);

// Add other trigger functions (triggerAnalysis, triggerGeneration) as needed


// --- NEW DATABASE QUERY HELPERS ---

export const fetchProjectWithJobs = async (projectId: string) => {
    const { data, error } = await supabase
        .from('projects')
        .select(`
            *,
            processing_jobs (*)
        `)
        .eq('id', projectId)
        .single();

    if (error) {
        console.error('Error fetching project with jobs:', error);
        throw error;
    }
    return data;
};

export const fetchProcessingJobs = async (projectId: string) => {
    const { data, error } = await supabase
        .from('processing_jobs')
        .select('*')
        .eq('project_id', projectId)
        .order('created_at', { ascending: true });

    if (error) {
        console.error('Error fetching processing jobs:', error);
        throw error;
    }
    return data;
};

export const fetchVideoAnalysis = async (videoId: string) => {
    const { data, error } = await supabase
        .from('video_analysis')
        .select('*')
        .eq('video_id', videoId);

    if (error) {
        console.error('Error fetching video analysis:', error);
        throw error;
    }
    return data;
};
