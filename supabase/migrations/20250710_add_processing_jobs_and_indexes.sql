CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "public"."processing_jobs" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "project_id" uuid NOT NULL REFERENCES "public"."projects"("id") ON DELETE CASCADE,
    "type" text NOT NULL CHECK (type IN ('upload', 'analysis', 'generation', 'export')),
    "stage" text NOT NULL CHECK (stage IN ('uploading', 'analyzing', 'generating_music', 'generating_sfx', 'mixing', 'exporting')),
    "status" text NOT NULL CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'cancelled')),
    "progress" integer DEFAULT 0,
    "metadata" jsonb,
    "error_message" text,
    "created_at" timestamptz DEFAULT now(),
    "updated_at" timestamptz DEFAULT now(),
    "completed_at" timestamptz
);

CREATE TABLE "public"."video_analysis" (
    "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    "video_id" uuid NOT NULL REFERENCES "public"."videos"("id") ON DELETE CASCADE,
    "scenes" jsonb[],
    "emotions" jsonb[],
    "objects" jsonb[],
    "audio_recommendations" jsonb[],
    "analysis_metadata" jsonb,
    "created_at" timestamptz DEFAULT now()
);

CREATE INDEX idx_audio_layers_project_id ON public.audio_layers(project_id);
CREATE INDEX idx_projects_owner_id ON public.projects(owner_id);
CREATE INDEX idx_videos_project_id ON public.videos(project_id);
CREATE INDEX idx_processing_jobs_project_id ON public.processing_jobs(project_id);
CREATE INDEX idx_processing_jobs_status ON public.processing_jobs(status);
CREATE INDEX idx_video_analysis_video_id ON public.video_analysis(video_id);