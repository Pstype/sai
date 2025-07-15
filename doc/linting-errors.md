```
./src/app/api/generate-music/route.ts
7:13  Error: 'projectId' is assigned a value but never used.  @typescript-eslint/no-unused-vars
8:11  Error: 'supabase' is assigned a value but never used.  @typescript-eslint/no-unused-vars

./src/components/dashboard/project-card.tsx
129:11  Warning: Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image` or a custom image loader to automatically optimize images. This may incur additional usage or cost from your provider. See: https://nextjs.org/docs/messages/no-img-element  @next/next/no-img-element

./src/components/dashboard/project-grid.tsx
20:3  Error: 'Clock' is defined but never used.  @typescript-eslint/no-unused-vars
25:34  Error: 'SortOptions' is defined but never used.  @typescript-eslint/no-unused-vars

./src/components/dashboard/quick-upload.tsx
41:31  Error: 'onProjectCreated' is defined but never used.  @typescript-eslint/no-unused-vars

./src/components/ui/input.tsx
5:18  Error: An interface declaring no members is equivalent to its supertype.  @typescript-eslint/no-empty-object-type

./src/components/upload/video-uploader.tsx
141:6  Warning: React Hook useCallback has a missing dependency: 'subscribeToProject'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps

./src/lib/ai-clients.ts
4:11  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
5:12  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
6:13  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
15:47  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/lib/supabase.ts
86:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
132:84  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/stores/projects.ts
79:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
114:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
130:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
141:21  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/types/api.ts
18:25  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any

./src/types/index.ts
90:36  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
137:29  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
233:34  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
359:10  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
419:28  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
473:9  Error: Unexpected any. Specify a different type.  @typescript-eslint/no-explicit-any
```