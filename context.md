@context

# Short-Term Memory
- The IntelliSFX project has a complete frontend and a backend with deployed Edge Functions.
- The backend was built using the "Asynchronous Assembly Line" architecture with Supabase Edge Functions.
- Key backend components implemented:
    - Database migrations for `processing_jobs` and `video_analysis` tables.
    - RLS policies for all tables.
    - Edge Functions for each stage of the processing pipeline: `on-video-upload`, `analyze-chunk`, `generate-music`, `generate-sfx-batch`, `finalize-project`.
- A workaround was used for Edge Function deployment by embedding shared code directly into each function.
- The immediate next step is to integrate the AI services and connect the frontend to the real-time backend.

# Long-Term Memory
- Core innovation: Layered audio generation, intelligent scene understanding, professional workflow integration, contextual synchronization.
- Architecture: Modular, event-driven Edge Functions for scalable, resilient processing. All AI model calls are abstracted and can be swapped/upgraded.
- Roadmap: 1) Supabase & frontend scaffolding, 2) Gemini integration, 3) Audio generation, 4) Timeline & merging, 5) Export & sharing.
- Best practices: Secure endpoints, RLS on Supabase, tests for core backend, App Router in Next.js, clear separation of concerns.
- UI/UX: "Instant First Draft, Infinite Refinements"—immediate results, transparent process, conversational and timeline-based editing, progressive disclosure, modern DAW-style timeline.

# Context Update Policy
- After any implementation or significant change, update this context.mdc file to keep the AI agent's personal context up-to-date and relevant for future decisions.


# IntelliSFX Code Context

This document provides a high-level overview of the IntelliSFX codebase, its architecture, and key components. It is intended to be a living document that evolves with the project.

## Core Technologies

*   **Frontend:** Next.js (React), TypeScript, Tailwind CSS
*   **Backend:** Next.js API Routes, Supabase (PostgreSQL, Storage, Edge Functions)
*   **State Management:** Zustand

## Project Structure

*   `src/app/api/`: Contains all the backend API routes.
*   `src/components/`: Houses the reusable React components.
*   `src/lib/`: Includes helper functions and Supabase client configurations.
*   `src/stores/`: Holds the Zustand state management stores.
*   `src/types/`: Defines the TypeScript types used throughout the application.
*   `supabase/`: Contains the Supabase database migrations and configuration.

## Key Workflows

### 1. Video Upload

The video upload process is a critical part of the application. It is implemented using a two-step signed URL approach to ensure security and scalability.

1.  **Client-Side (VideoUploader.tsx):**
    *   The user selects a video file.
    *   The client makes a `POST` request to `/api/upload-url` to get a signed URL.
    *   The client uses the signed URL to upload the file directly to Supabase Storage, tracking the progress.
    *   Once the upload is complete, the client makes a `POST` request to `/api/on-video-upload` to notify the backend.

2.  **Backend-Side:**
    *   **/api/upload-url:** This API route creates a new project in the database (if one doesn't exist) and generates a signed URL for the upload.
    *   **/api/on-video-upload:** This API route triggers the `on-video-upload` Supabase Edge Function.
    *   **on-video-upload (Edge Function):** This function updates the project status, creates a video record in the database, and initiates the processing pipeline.

### 2. Real-time Processing Updates

The application uses Supabase Realtime to provide users with live updates on the status of their video processing.

*   **Zustand Store (processing.ts):** The `useProcessingStore` subscribes to the `processing_jobs` table in the database.
*   **Supabase Channel:** A real-time channel is established to listen for any changes (inserts or updates) to the `processing_jobs` table.
*   **UI Components:** The UI components, such as the `ProcessingCard`, are connected to the Zustand store and automatically update whenever the job status or progress changes.

### 3. API and Database

*   **API Routes:** All backend logic is handled through Next.js API routes. These routes are responsible for interacting with the Supabase backend.
*   **Supabase Client:** The application uses a standardized Supabase client (`/lib/supabase.ts`) for all interactions with the database and storage.
*   **Database Schema:** The database schema is defined and managed through Supabase migrations located in the `supabase/migrations` directory.