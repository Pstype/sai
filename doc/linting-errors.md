# Linter Errors Log

This file contains a summary of the current linting errors in the project. These will be addressed at a later stage.

- **./src/app/projects/page.tsx**: Unused variables `Input`, `MoreHorizontal`, `Search`, `AlertCircle`, `Star`, `useProjectStore`. Undefined variables `TrendingUp`, `CheckSquare`, `Square`, `Filter`, `SortAsc`, `FolderOpen`, `Users`, `Clock`.
- **./src/app/projects/[id]/edit/page.tsx**: Unused variables `setDuration`, `setVolume`, `timelinePosition`, `setTimelinePosition`, `setMarkers`, `updateTrackVolume`. Unused `index` in map.
- **./src/app/projects/[id]/export/page.tsx**: Unused variable `startProgress`.
- **./src/app/projects/[id]/generate/page.tsx**: Unescaped characters `"` in JSX.
- **./src/app/projects/[id]/page.tsx**: Unused variable `currentProject`. Unescaped character `'` in JSX.
- **./src/app/projects/[id]/upload/page.tsx**: Unused variables `jobs`, `currentJob`, `url`.
- **./src/components/dashboard/project-card.tsx**: `<img>` used instead of `next/image`.
- **./src/components/dashboard/project-grid.tsx**: Unused variable `filters`. Unnecessary dependencies in `useEffect` hooks.
- **./src/components/dashboard/quick-upload.tsx**: Unused variable `onProjectCreated`. Use of `any` type.
- **./src/components/ui/input.tsx**: Empty interface `InputProps`.
- **./src/components/upload/video-uploader.tsx**: Unused variables `Upload`, `X`, `Check`, `AlertCircle`, `Video`, `FileVideo`, `formatFileSize`, `formatDuration`, `onCancel`, `videoFile`, `videoDuration`.
- **./src/lib/supabase.ts**: Use of `any` type.
- **./src/stores/processing.ts**: Use of `any` type. Unused variables `projectId`, `videoUrl`.
- **./src/types/index.ts**: Multiple uses of `any` type.
