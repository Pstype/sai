# IntelliSFX Architecture Plan

This document outlines the technical architecture for the IntelliSFX platform, combining the project overview with insights from the 11labs.md example.

## 1. High-Level Architecture

The system is composed of three main parts: a Next.js frontend, a Supabase backend, and a set of external AI services.

```
[Next.js Frontend] <--> [Supabase Backend] <--> [External AI Services]
   (User Interface,      (Database, Storage,      (Gemini, Lyria,
    Client-Side          Edge Functions, Auth)   AudioGen)
    Processing)
```

## 2. Frontend (Next.js)

The frontend will be a Server-Side Rendered (SSR) application built with Next.js and React.

### UI Components:

*   **VideoUploader:** A drag-and-drop component for uploading videos.
*   **ProjectDashboard:** A view to list and manage all projects.
*   **ProjectView:** A detailed view of a single project, including the video player and audio timeline.
*   **AudioTimeline:** A component to visualize and edit the generated audio layers.
*   **Authentication:** Pages for user login, registration, and profile management.

### State Management:

We will use Zustand for centralized state management, with stores for:

*   `auth`: To manage user authentication state.
*   `projects`: To manage the list of projects and the currently active project.
*   `ui`: To manage UI state, such as loading indicators and notifications.

### Client-Side Workflow:

1.  **Video Upload:** The user uploads a video using the `VideoUploader` component.
2.  **Upload to Supabase:** The original video will be uploaded to Supabase Storage.
3.  **Trigger Backend Function:** The frontend will call a Next.js API route to start the analysis process.
4.  **Real-time Updates:** The frontend will subscribe to Supabase's real-time service to receive updates on the project's status.
5.  **Audio Merging:** Once the audio layers are generated, the frontend will use `ffmpeg.wasm` to merge them with the original video for preview and download.

## 3. Backend Architecture

The backend comprises two parts: Supabase services for data storage and authentication, and Next.js API routes for all video processing logic.

### 3.1 Supabase (Database & Storage)

#### Tables:

*   **projects:**
    *   `name` (text)
    *   `status` (text: "uploaded", "analyzing", "generating", "completed", "failed")
    *   `video_file_id` (uuid)
    *   `owner_id` (uuid)
*   **videos:**
    *   `project_id` (uuid)
    *   `original_file_id` (uuid)
*   **audio_layers:**
    *   `project_id` (uuid)
    *   `type` (text: "music", "sfx")
    *   `prompt` (text)
    *   `audio_file_id` (uuid)
    *   `start_time` (float8)
    *   `end_time` (float8)

#### Storage:

*   **raw_videos:** A bucket to store the original uploaded videos.
*   **generated_audio:** A bucket to store the generated audio files from the AI models.

### 3.2 API Routes (Node.js)

All backend processing functions have been migrated from Supabase Edge Functions (Deno runtime) to Next.js API routes (Node.js runtime). This provides:

*   A unified Node.js environment for both frontend and backend code.
*   Direct use of the Supabase JavaScript client with service role key.
*   Per-route timeout configuration for long-running operations.

#### Environment Variables

Define the following in `.env.local` (also documented in `.env.local.example`):

*   SUPABASE_URL: Your Supabase project URL.
*   SUPABASE_SERVICE_ROLE_KEY: Service role key for server-side operations.
*   SUPABASE_ANON_KEY: Public key for client-side interactions (if needed).

#### API Endpoint Structure

The processing endpoints are implemented under `src/app/api`:

*   **POST /api/on-video-upload**  
    File: `src/app/api/on-video-upload/route.ts`  
    - Parses `VideoUploadRequest`  
    - Creates project and video records  
    - Initiates the processing job  

*   **POST /api/analyze-chunk**  
    File: `src/app/api/analyze-chunk/route.ts`  
    - Parses `ChunkAnalysisRequest`  
    - Calls AI client to analyze video chunk  
    - Inserts scene context data and updates job progress  

*   **POST /api/generate-music**  
    File: `src/app/api/generate-music/route.ts`  
    - Parses `MusicGenerationRequest`  
    - Calls AI client to generate background music  
    - Inserts music layer and advances job stage to “generating_sfx”  

*   **POST /api/generate-sfx-batch**  
    File: `src/app/api/generate-sfx-batch/route.ts`  
    - Parses `SFXGenerationRequest`  
    - Calls AI client to generate SFX in batches  
    - Inserts SFX layers and advances job stage to “mixing”  

*   **POST /api/finalize-project**  
    File: `src/app/api/finalize-project/route.ts`  
    - Parses `projectId`  
    - Updates project status to “completed” and marks job as done  

#### Timeout Configuration

Next.js API routes have a default timeout of 60 seconds. To match the original Supabase Edge Function settings, we extend the timeout to 300 seconds (5 minutes) for the long-running routes (`generate-music` and `generate-sfx-batch`) via `next.config.ts`:

```js
// next.config.ts
const nextConfig = {
  api: {
    responseLimit: false,
    timeout: 300_000, // 300 seconds
  },
};
module.exports = nextConfig;
```

## 4. AI Integration

*   **Gemini Vision Pro:** Used for scene analysis, object detection, and mood extraction. The API will be called from the `/api/analyze-chunk` route.
*   **Google Lyria:** Used for generating background music. The API will be called from the `/api/generate-music` route.
*   **Meta AudioGen (via Replicate):** Used for generating sound effects. The API will be called from the `/api/generate-sfx-batch` route.

## 5. Development Roadmap

1.  **Phase 1: Supabase Setup & Frontend Scaffolding**  
    *   Set up Supabase project, tables, and storage.  
    *   Create the Next.js frontend with basic UI components.  
    *   Implement user authentication.  
    *   Implement video upload and the `/api/on-video-upload` route.  
2.  **Phase 2: Gemini Integration**  
    *   Implement the `/api/analyze-chunk` route.  
    *   Integrate the Gemini Vision Pro API.  
    *   Display the analysis results on the frontend.  
3.  **Phase 3: Audio Generation**  
    *   Implement the `/api/generate-music` and `/api/generate-sfx-batch` routes.  
    *   Integrate the Lyria and AudioGen APIs.  
    *   Store the generated audio files in Supabase Storage.  
4.  **Phase 4: Audio Timeline & Merging**  
    *   Implement the `AudioTimeline` component to display the generated audio layers.  
    *   Use `ffmpeg.wasm` on the client-side to merge the audio layers with the video.  
    *   Allow the user to download the final video.  