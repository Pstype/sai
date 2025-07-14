# Updated IntelliSFX Refactoring Plan

Based on codebase analysis, this revised plan addresses existing implementations while fixing core issues. The 5-phase structure remains, but tasks are adjusted to account for current state.

---

## Phase 1: Database Schema Improvements

### Task 1: Enhance Existing Tables
- **Files**: 
  - `supabase/migrations/20250710_add_processing_jobs_and_indexes.sql`
  - `supabase/migrations/20250710_add_rls_policies.sql`
- **Changes**:
  1. Add missing `owner_id` to projects table:
     ```sql
     ALTER TABLE projects ADD COLUMN owner_id UUID REFERENCES auth.users(id);
     ```
  2. Add `status` field to `audio_layers`:
     ```sql
     ALTER TABLE audio_layers ADD COLUMN status TEXT CHECK (status IN ('pending', 'generated'));
     ```
  3. Add foreign key to `videos`:
     ```sql
     ALTER TABLE videos ADD CONSTRAINT fk_project 
       FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE;
     ```
- **Why**: Current schema lacks critical relationships and state tracking.

### Task 2: Update RLS Policies
- **File**: `supabase/migrations/20250710_add_rls_policies.sql`
- **Changes**:
  ```sql
  -- Add owner-based access to audio_layers
  CREATE POLICY "User access to own audio layers" ON audio_layers
    FOR ALL USING (
      project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid())
    );
  
  -- Fix video access policy
  DROP POLICY "Enable access for project owners" ON videos;
  CREATE POLICY "User access to own videos" ON videos
    FOR ALL USING (
      project_id IN (SELECT id FROM projects WHERE owner_id = auth.uid())
    );
  ```
- **Why**: Current policies are incomplete and incorrectly named.

---

## Phase 2: Type Generation & Configuration

### Task 3: Generate Supabase Types
- **Command**:
  ```bash
  supabase gen types typescript --local > intellisfx/src/types/supabase.ts
  ```
- **Verification**: Ensure generated types include:
  - `projects.owner_id`
  - `audio_layers.status`
  - Correct foreign key relationships

### Task 4: Centralize Environment Handling
- **File**: `intellisfx/src/config/env.ts` (new file)
- **Content**:
  ```typescript
  const envSchema = {
    SUPABASE_URL: process.env.SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  };

  for (const [key, value] of Object.entries(envSchema)) {
    if (!value) throw new Error(`Missing environment variable: ${key}`);
  }

  export const env = envSchema as Record<keyof typeof envSchema, string>;
  ```

---

## Phase 3: Client Standardization

### Task 5: Fix Server-Side Client
- **File**: `intellisfx/src/lib/supabase-server.ts`
- **Changes**:
  ```typescript
  import { createClient as createSupabaseClient } from '@supabase/supabase-js';
  import type { Database } from '@/types/supabase'; // Updated import
  import { env } from '@/config/env'; // New import

  export const supabase = createSupabaseClient<Database>(
    env.SUPABASE_URL,
    env.SUPABASE_SERVICE_ROLE_KEY
  );
  ```

### Task 6: Standardize Client-Side Helpers
- **File**: `intellisfx/src/lib/supabase.ts`
- **Changes**:
  1. Replace all `process.env` references with `env` import
  2. Update types to use new `Database` interface
  3. Add error handling for missing bucket configs

---

## Phase 4: API Route Refactoring

### Task 7: Fix Music Generation Route
- **File**: `intellisfx/src/app/api/generate-music/route.ts`
- **Changes**:
  ```typescript
  import { createClient } from '@/lib/supabase-server';
  import { NextResponse } from 'next/server';

  export async function POST(request: Request) {
    const { projectId } = await request.json();
    const supabase = createClient();

    const { error } = await supabase
      .from('audio_layers')
      .insert({ 
        project_id: projectId, 
        type: 'music',
        status: 'pending' // Added status field
      });

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ status: 'started' });
  }
  ```

### Task 8: Audit All API Routes
- **Files**: All files in `intellisfx/src/app/api/`
- **Checklist**:
  - Use centralized `createClient`
  - Verify table/column names match updated schema
  - Add consistent error handling
  - Include status fields where missing

---

## Phase 5: Final Integration

### Task 9: Update Environment Example
- **File**: `intellisfx/.env.local.example`
- **Add**:
  ```
  # Server-side
  SUPABASE_URL=
  SUPABASE_SERVICE_ROLE_KEY=
  
  # Client-side
  NEXT_PUBLIC_SUPABASE_URL=
  NEXT_PUBLIC_SUPABASE_ANON_KEY=
  ```

### Task 10: Add Project Documentation
- **File**: `doc/database_schema.md` (new)
- **Content**: Entity-Relationship diagram of final schema
  ```mermaid
  erDiagram
    PROJECTS ||--o{ VIDEOS : contains
    PROJECTS ||--o{ AUDIO_LAYERS : contains
    PROJECTS {
      uuid id
      uuid owner_id
      string status
    }
    VIDEOS {
      uuid id
      uuid project_id
      string url
    }
    AUDIO_LAYERS {
      uuid id
      uuid project_id
      string type
      string status
    }
  ```

---

## Implementation Notes

1. **Order of Operations**:
   - Run database migrations first (Phase 1)
   - Generate types immediately after schema changes
   - Update environment configuration before client fixes

2. **Verification Steps**:
   - After Phase 1: Run `supabase db reset` and verify table structure
   - After Phase 2: Check type definitions include new fields
   - After Phase 4: Test API endpoints with Postman

3. **Risk Mitigation**:
   - Create database backups before migrations
   - Use feature flags for client changes
   - Implement unit tests for new helper functions
