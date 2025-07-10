@context

# Short-Term Memory
- The IntelliSFX project now has a comprehensive and functional frontend foundation.
- The implementation includes a sophisticated dashboard, a complete UI component library, robust state management with Zustand, and a modern design system.
- Key features implemented:
    - A robust video upload system using Supabase signed URLs.
    - A project management dashboard for viewing and organizing projects.
    - Visualization for the multi-stage processing pipeline.
    - A complete user workflow with dedicated pages for upload, generation, editing, and exporting.
- The component architecture is modular, and state management is cleanly separated by domain.
- Supabase is integrated for storage, with configuration managed via environment variables.
- The immediate next step is to fix configuration issues (missing dependencies, broken imports, Supabase setup) and complete route implementation before proceeding with backend AI integration.

# Long-Term Memory
- Core innovation: Layered audio generation, intelligent scene understanding, professional workflow integration, contextual synchronization.
- Architecture: Modular, event-driven Edge Functions for scalable, resilient processing. All AI model calls are abstracted and can be swapped/upgraded.
- Roadmap: 1) Supabase & frontend scaffolding, 2) Gemini integration, 3) Audio generation, 4) Timeline & merging, 5) Export & sharing.
- Best practices: Secure endpoints, RLS on Supabase, tests for core backend, App Router in Next.js, clear separation of concerns.
- UI/UX: "Instant First Draft, Infinite Refinements"—immediate results, transparent process, conversational and timeline-based editing, progressive disclosure, modern DAW-style timeline.

# Context Update Policy
- After any implementation or significant change, update this context.mdc file to keep the AI agent's personal context up-to-date and relevant for future decisions.

---

