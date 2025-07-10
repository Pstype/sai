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

---

