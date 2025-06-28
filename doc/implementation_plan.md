# IntelliSFX Implementation Plan

## Phase 1: Project Foundation & Appwrite Setup

### 1.1. Initialize Next.js Project
- Scaffold a new Next.js app with TypeScript, Tailwind CSS, and App Router:
  ```bash
  npx create-next-app@latest intellisfx --typescript --tailwind --app
  ```
- Set up project structure as per your UI/UX doc (app/, components/, lib/, etc.).
- Configure path aliases in `tsconfig.json`:
  ```json
  {
    "compilerOptions": {
      "baseUrl": "src/",
      "paths": {
        "@/components/*": ["components/*"],
        "@/styles/*": ["styles/*"]
      }
    }
  }
  ```

### 1.2. Appwrite Backend Setup
- Deploy Appwrite (cloud or self-hosted).
- Create a new project, set up API keys, and configure environment variables in `.env.local`.
- Define collections:
  - `projects` (name, status, videoFileId, ownerId)
  - `videos` (projectId, originalFileId)
  - `audio_layers` (projectId, type, prompt, audioFileId, startTime, endTime)
- Set up storage buckets: `raw_videos`, `generated_audio`.

### 1.3. Frontend Scaffolding
- Implement authentication pages (`/auth/login`, `/auth/register`) using Appwrite's JS SDK.
- Build the dashboard (`/`) with project grid, upload CTA, and status indicators.
- Create the drag-and-drop `VideoUploader` component.
- Set up Zustand stores for `auth`, `projects`, and `ui` state.

---

## Phase 2: Video Upload & Analysis Integration

### 2.1. Video Upload Workflow
- Integrate the `VideoUploader` to upload files directly to Appwrite Storage.
- On upload, trigger an Appwrite Function (`onVideoUpload`) to:
  - Create a new project and video document.
  - Store the video in `raw_videos`.

### 2.2. Scene Analysis
- Implement the `analyzeVideo` Appwrite Function:
  - Retrieve video from storage.
  - Call Gemini Vision API for scene, emotion, and context analysis.
  - Store analysis results in the project document.
- Display live analysis results in the frontend (scene timeline, emotion graph, object detection).

---

## Phase 3: Audio Generation Pipeline

### 3.1. Music & SFX Generation
- Implement `generateMusic` and `generateSfx` Appwrite Functions:
  - Use scene context data as input.
  - Call Google Lyria for music, Meta AudioGen (via Replicate) for SFX.
  - Store generated audio in `audio_layers` and `generated_audio` bucket.

### 3.2. Real-Time Updates
- Use Appwrite's real-time API to push job status and results to the frontend.
- Update UI with progress bars and notifications.

---

## Phase 4: Audio Timeline Editing & Merging

### 4.1. Timeline Editor
- Build `/projects/[id]/edit` with a DAW-style timeline:
  - Video track with scene markers.
  - Multiple audio tracks (music, SFX, ambient).
  - Inspector panel for AI insights and manual adjustments.
- Implement tools: razor, time-stretch, fade, markers.

### 4.2. Client-Side Merging
- Integrate `ffmpeg.wasm` to merge audio layers with video for preview and download.
- Allow users to export stems, mixed audio, and project files.

---

## Phase 5: Export, Sharing, and Collaboration

### 5.1. Export Tools
- `/projects/[id]/export` page for format selection, stem separation, and sharing.
- Generate preview links, enable password protection, and support direct export to editing suites (Premiere, DaVinci).

### 5.2. Collaboration
- Implement project sharing and team editing features.
- Track usage analytics, billing, and preferences in `/settings`.

---

## Best Practices & Official Guidance

- **Next.js**: Use App Router, Server/Client Components, Suspense for async data, and Tailwind for styling. Reference [Next.js docs](https://nextjs.org/docs) for layouts, routing, and API routes.
- **Appwrite**: Use JS SDK for frontend, Functions for backend logic, and real-time API for updates. Reference [Appwrite docs](https://appwrite.io/docs) for storage, authentication, and database operations.
- **Security**: Use environment variables for secrets, role-based access control, and never expose API keys in the client.
- **Testing**: Add unit and integration tests for critical flows (upload, analysis, generation, export).

---

## Summary Table

| Phase | Key Tasks |
|-------|-----------|
| 1     | Next.js & Appwrite setup, auth, dashboard, upload UI |
| 2     | Video upload, Appwrite Functions, Gemini Vision integration, analysis UI |
| 3     | Music/SFX generation, API integration, real-time updates |
| 4     | Timeline editor, audio merging, export tools |
| 5     | Sharing, collaboration, analytics, billing | 