# IntelliSFX V1 Architecture & Planning Notes

This document summarizes the key architectural and feature decisions made for the V1 implementation of IntelliSFX.

## Technology Stack

-   **Frontend Framework:** Next.js with React (App Router)
-   **Language:** TypeScript
-   **Component Foundation:** **shadcn/ui**
-   **Styling:** Tailwind CSS (leveraging modern conditional CSS like `@when`/`@else`)
-   **Animation:** **anime.js**
-   **State Management:** Zustand
-   **Backend Platform:** Supabase (PostgreSQL, Storage, Edge Functions, Realtime)
-   **AI Services:**
    -   **Video Analysis:** Gemini Vision Pro
    -   **Music Generation:** Google Lyria
    -   **Sound Effect Generation:** Meta AudioGen

## Core User Experience Flow (The "Instant First Draft")

The primary goal for V1 is to provide an immediate, fully-generated first draft to the user after they upload a video. The user should feel like they are collaborating with the AI, not just waiting for a black box.

1.  **Upload:** User uploads a video.
2.  **Processing:** The system immediately starts a multi-stage background process.
3.  **UX During Processing:** The UI will show a friendly, multi-stage progress bar (e.g., "Analyzing...", "Generating Music...", "Generating SFX...") with engaging text like "Go and grab a coffee, we're working on it!".
4.  **Completion:** Once processing is complete, the user is presented with a fully populated timeline editor, with video, background music, and sound effects already in place and synchronized.
5.  **Interactive Editing:** The user can then tweak the result, using a chat interface to interact with Gemini for adjustments (e.g., "change the music for this scene to be more upbeat") and previewing changes with client-side `ffmpeg.wasm`.
6.  **Final Export:** The final, high-quality render is performed on the backend server using `ffmpeg`.

## V1 Backend Architecture: The "Asynchronous Assembly Line"

To achieve the desired UX while respecting the technical constraints of serverless functions, we will use a chained, event-driven workflow managed through the database.

-   **Step 1: Video Chunking & Analysis Loop**
    -   Upon upload, the video is broken into smaller, manageable chunks (e.g., 30 seconds).
    -   An `analyze-chunk` function is called in a loop for each chunk, sending it to Gemini Vision and saving the results.
    -   This solves the Gemini context window limitation and avoids function timeouts.

-   **Step 2: Parallel Audio Generation**
    -   Once analysis is complete, the system triggers the audio generation phase.
    -   **Music:** A single `generate-music` function is called for the background music.
    -   **Sound Effects (SFX):** A "batched parallel" approach will be used.
        -   All required SFX prompts are gathered.
        -   They are grouped into small batches (e.g., 5 prompts per batch).
        -   A `generate-sfx-batch` function is invoked for each batch in parallel.
        -   This controls API rate-limiting and provides resilience.

-   **Step 3: Finalization & Timeline Assembly**
    -   A final function verifies that all analysis and generation jobs are complete.
    -   It updates the project status, which signals the frontend to hide the loading state and display the fully populated timeline.

## Deferred to V2

-   **Dedicated Job Queue:** A formal job queue system like **Inngest** will be deferred to V2. The V1 "Assembly Line" will be managed via database state and function chaining.
