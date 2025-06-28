# IntelliSFX Architecture Plan

This document outlines the technical architecture for the IntelliSFX platform, combining the project overview with insights from the 11labs.md example.

## 1. High-Level Architecture

The system is composed of three main parts: a Next.js frontend, an Appwrite backend, and a set of external AI services.

```
[Next.js Frontend] <--> [Appwrite Backend] <--> [External AI Services]
   (User Interface,      (Database, Storage,      (Gemini, Lyria,
    Client-Side          Functions, Auth)         AudioGen)
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
2.  **Upload to Appwrite:** The original video will be uploaded to Appwrite Storage.
3.  **Trigger Backend Function:** The frontend will call an Appwrite Function to start the analysis process.
4.  **Real-time Updates:** The frontend will subscribe to Appwrite's real-time service to receive updates on the project's status.
5.  **Audio Merging:** Once the audio layers are generated, the frontend will use `ffmpeg.wasm` to merge them with the original video for preview and download.

## 3. Backend (Appwrite)

The backend will be powered by Appwrite, providing all the necessary backend-as-a-service features.

### Collections:

*   **projects:**
    *   `name` (string)
    *   `status` (string: "uploaded", "analyzing", "generating", "completed", "failed")
    *   `videoFileId` (string)
    *   `ownerId` (string)
*   **videos:**
    *   `projectId` (string)
    *   `originalFileId` (string)
*   **audio_layers:**
    *   `projectId` (string)
    *   `type` (string: "music", "sfx")
    *   `prompt` (string)
    *   `audioFileId` (string)
    *   `startTime` (number)
    *   `endTime` (number)

### Storage:

*   **raw_videos:** A bucket to store the original uploaded videos.
*   **generated_audio:** A bucket to store the generated audio files from the AI models.

### Functions:

*   **onVideoUpload:**
    *   Triggered by the frontend after a video is uploaded.
    *   Creates a new `project` and `video` document in the database.
    *   Calls the `analyzeVideo` function.
*   **analyzeVideo:**
    *   Retrieves the video file from storage.
    *   Calls the Gemini Vision API to analyze the video and generate scene context data.
    *   Saves the scene context data to the `project` document.
    *   Calls the `generateMusic` and `generateSfx` functions in parallel.
*   **generateMusic:**
    *   Takes the scene context data as input.
    *   Calls the Google Lyria API to generate a music track.
    *   Saves the generated music as a new `audio_layer` document.
*   **generateSfx:**
    *   Takes the scene context data as input.
    *   Calls the Meta AudioGen API to generate sound effects.
    *   Saves the generated SFX as new `audio_layer` documents.

## 4. AI Integration

*   **Gemini Vision Pro:** Used for scene analysis, object detection, and mood extraction. The API will be called from the `analyzeVideo` function.
*   **Google Lyria:** Used for generating background music. The API will be called from the `generateMusic` function.
*   **Meta AudioGen (via Replicate):** Used for generating sound effects. The API will be called from the `generateSfx` function.

## 5. Development Roadmap

1.  **Phase 1: Appwrite Setup & Frontend Scaffolding**
    *   Set up Appwrite project, collections, and storage.
    *   Create the Next.js frontend with basic UI components.
    *   Implement user authentication.
    *   Implement video upload and the `onVideoUpload` function.
2.  **Phase 2: Gemini Integration**
    *   Implement the `analyzeVideo` function.
    *   Integrate the Gemini Vision Pro API.
    *   Display the analysis results on the frontend.
3.  **Phase 3: Audio Generation**
    *   Implement the `generateMusic` and `generateSfx` functions.
    *   Integrate the Lyria and AudioGen APIs.
    *   Store the generated audio files in Appwrite Storage.
4.  **Phase 4: Audio Timeline & Merging**
    *   Implement the `AudioTimeline` component to display the generated audio layers.
    *   Use `ffmpeg.wasm` on the client-side to merge the audio layers with the video.
    *   Allow the user to download the final video.