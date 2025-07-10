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
3.  **Trigger Backend Function:** The frontend will call a Supabase Edge Function to start the analysis process.
4.  **Real-time Updates:** The frontend will subscribe to Supabase's real-time service to receive updates on the project's status.
5.  **Audio Merging:** Once the audio layers are generated, the frontend will use `ffmpeg.wasm` to merge them with the original video for preview and download.

## 3. Backend (Supabase)

The backend will be powered by Supabase, providing all the necessary backend-as-a-service features.

### Tables:

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

### Storage:

*   **raw_videos:** A bucket to store the original uploaded videos.
*   **generated_audio:** A bucket to store the generated audio files from the AI models.

### Edge Functions: The Asynchronous Assembly Line

The backend logic is orchestrated through a series of chained, event-driven Edge Functions to create an "Asynchronous Assembly Line" for processing videos. This avoids function timeouts and manages API limitations gracefully.

*   **on-video-upload:**
    *   Triggered by the frontend after a video is uploaded.
    *   Creates a new `project` and `video` record in the database.
    *   Initiates the video chunking process.
*   **analyze-chunk (Loop):**
    *   Takes a video chunk as input.
    *   Calls the Gemini Vision API to analyze the chunk and generate scene context data.
    *   Saves the scene context data.
    *   This function is called in a loop for all chunks.
*   **generate-music:**
    *   Triggered after all chunks are analyzed.
    *   Takes the complete scene context data as input.
    *   Calls the Google Lyria API to generate a music track.
    *   Saves the generated music as a new `audio_layer` record.
*   **generate-sfx-batch (Batched Parallel):**
    *   Triggered after all chunks are analyzed.
    *   Gathers all required SFX prompts and groups them into small batches.
    *   This function is invoked in parallel for each batch.
    *   Calls the Meta AudioGen API to generate sound effects for the batch.
    *   Saves the generated SFX as new `audio_layer` records.
*   **finalize-project:**
    *   Verifies that all analysis and generation jobs are complete.
    *   Updates the project status to "completed", signaling the frontend to display the final timeline.

## 4. AI Integration

*   **Gemini Vision Pro:** Used for scene analysis, object detection, and mood extraction. The API will be called from the `analyze-video` function.
*   **Google Lyria:** Used for generating background music. The API will be called from the `generate-music` function.
*   **Meta AudioGen (via Replicate):** Used for generating sound effects. The API will be called from the `generate-sfx` function.

## 5. Development Roadmap

1.  **Phase 1: Supabase Setup & Frontend Scaffolding**
    *   Set up Supabase project, tables, and storage.
    *   Create the Next.js frontend with basic UI components.
    *   Implement user authentication.
    *   Implement video upload and the `on-video-upload` function.
2.  **Phase 2: Gemini Integration**
    *   Implement the `analyze-video` function.
    *   Integrate the Gemini Vision Pro API.
    *   Display the analysis results on the frontend.
3.  **Phase 3: Audio Generation**
    *   Implement the `generate-music` and `generate-sfx` functions.
    *   Integrate the Lyria and AudioGen APIs.
    *   Store the generated audio files in Supabase Storage.
4.  **Phase 4: Audio Timeline & Merging**
    *   Implement the `AudioTimeline` component to display the generated audio layers.
    *   Use `ffmpeg.wasm` on the client-side to merge the audio layers with the video.
    *   Allow the user to download the final video.