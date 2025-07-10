# IntelliSFX Implementation Plan (V1)

This plan is aligned with the "Asynchronous Assembly Line" architecture for V1.

## Phase 1: Project Foundation & Core UI

### 1.1. Initialize Next.js Project & Dependencies
- Scaffold a new Next.js app with TypeScript, Tailwind CSS, and App Router.
- Install core dependencies: `zustand`, `anime.js`, `ffmpeg.wasm`.
- Set up `shadcn/ui` and create foundational UI components (Button, Card, etc.).
- Configure path aliases in `tsconfig.json`.

### 1.2. Supabase Backend Setup
- Create a new Supabase project and configure environment variables.
- Define tables: `projects`, `videos`, `audio_layers`, and a `jobs` table to track the status of asynchronous tasks.
- Set up storage buckets: `raw_videos`, `generated_audio`.

### 1.3. Frontend Scaffolding & "Instant First Draft" UI
- Implement authentication pages using Supabase's JS client.
- Build the main dashboard and the `VideoUploader` component.
- Create the processing UI that displays the multi-stage progress (Analyzing, Generating Music, etc.) to deliver the "Instant First Draft" experience.
- Set up Zustand stores for `auth`, `projects`, `ui`, and `processing`.

---

## Phase 2: The Asynchronous Assembly Line - Backend

### 2.1. Video Upload & Chunking
- On video upload, trigger the `on-video-upload` Edge Function.
- This function creates the initial project record and starts the video chunking process.

### 2.2. Scene Analysis Loop
- Implement the `analyze-chunk` Edge Function to process a single video chunk with Gemini Vision.
- Orchestrate the loop, calling `analyze-chunk` for each chunk and updating the `jobs` table.

### 2.3. Parallel Audio Generation
- Implement the `generate-music` Edge Function for the main music track.
- Implement the `generate-sfx-batch` Edge Function for batched, parallel SFX generation.
- Trigger these functions once the analysis phase is complete.

### 2.4. Finalization & Real-time Updates
- Implement the `finalize-project` function to mark the project as complete.
- Use Supabase's real-time API to push job status and results to the frontend, updating the processing UI.

---

## Phase 3: Interactive Timeline & Client-Side Editing

### 3.1. Timeline Editor
- Build the DAW-style timeline editor at `/projects/[id]/edit`.
- Populate the timeline with the video and the generated audio layers once the backend signals completion.
- Use `anime.js` for smooth timeline animations and interactions.

### 3.2. Client-Side Preview & Merging
- Integrate `ffmpeg.wasm` to allow for client-side previews of audio adjustments.
- Implement the chat-based interface for interacting with Gemini to make changes (e.g., "make the music more intense here").

### 3.3. Backend Final Render
- Create an API endpoint that takes the final timeline data and uses a backend `ffmpeg` instance to perform the high-quality render for export.

---

## Phase 4: Export & Sharing (V1 Scope)

### 4.1. Export Tools
- Create the `/projects/[id]/export` page.
- Allow users to select export formats and trigger the backend rendering process.
- Provide download links for the final video.

---

## Best Practices & Official Guidance

- **Next.js**: Use App Router, Server/Client Components, and Suspense.
- **Supabase**: Use the JS client, Edge Functions for the assembly line, and the real-time API for UI updates.
- **Security**: Secure all endpoints and use RLS on Supabase tables.
- **Testing**: Add tests for the core backend functions (`analyze-chunk`, `generate-sfx-batch`).

---

## Summary Table

| Phase | Key Tasks |
|-------|-----------|
| 1     | Next.js & Supabase setup, `shadcn/ui`, auth, dashboard, processing UI |
| 2     | Implement the full "Asynchronous Assembly Line" on the backend |
| 3     | Build the timeline editor, integrate `ffmpeg.wasm` and the AI chat interface |
| 4     | Implement backend rendering and the export page | 