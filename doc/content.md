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

### 1. Video Upload and Real-time Feedback

The video upload process is a critical part of the application. It is implemented using a two-step signed URL approach, combined with a proactive real-time subscription model to ensure security, scalability, and a seamless user experience.

1.  **Client-Side (VideoUploader.tsx):**
    *   The user selects a video file.
    *   The client makes a `POST` request to `/api/upload-url` to get a signed URL and a `projectId`.
    *   **Immediately upon receiving the `projectId`, the client subscribes to real-time updates for that project.**
    *   The client uses the signed URL to upload the file directly to Supabase Storage, tracking the progress.
    *   Once the upload is complete, the client makes a `POST` request to `/api/on-video-upload` to notify the backend.
    *   The UI provides optimistic feedback to the user, immediately navigating them to the project page.

2.  **Backend-Side:**
    *   **/api/upload-url:** This API route creates a new project in the database (if one doesn't exist) and generates a signed URL for the upload.
    *   **/api/on-video-upload:** This API route triggers the `on-video-upload` Supabase Edge Function.
    *   **on-video-upload (Edge Function):** This function updates the project status, creates a video record in the database, and initiates the processing pipeline by inserting a job into the `processing_jobs` table.

3.  **Real-time Updates:**
    *   **Zustand Store (processing.ts):** The `useProcessingStore` manages a single, persistent real-time channel. It intelligently subscribes to the correct project, ensuring no messages are lost.
    *   **Supabase Channel:** The real-time channel listens for any changes to the `processing_jobs` table.
    *   **UI Components:** The UI components are connected to the Zustand store and automatically update whenever the job status or progress changes, providing a seamless experience for the user.

### 2. API and Database

*   **API Routes:** All backend logic is handled through Next.js API routes. These routes are responsible for interacting with the Supabase backend.
*   **Supabase Client:** The application uses a standardized Supabase client (`/lib/supabase.ts`) for all interactions with the database and storage.
*   **Database Schema:** The database schema is defined and managed through Supabase migrations located in the `supabase/migrations` directory.
