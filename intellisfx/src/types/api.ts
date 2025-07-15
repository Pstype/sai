import { VideoChunkAnalysis } from "@/lib/ai-clients";

export type VideoUploadRequest = {
  projectId: string;
  videoUrl: string;
  fileName: string;
  fileSize: number;
  duration: number;
};

export type ChunkAnalysisRequest = {
  projectId: string;
  chunkUrl: string;
  chunkIndex: number;
  totalChunks: number;
};

export type MusicGenerationRequest = {
  projectId: string;
  consolidatedAnalysis: VideoChunkAnalysis;
};

export type SFXGenerationRequest = {
  projectId: string;
  sfxPrompts: string[];
};

// Add other shared types here