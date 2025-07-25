---
description: for working on frontend
globs: 
alwaysApply: false
---
# IntelliSFX - UI/UX Architecture & Design System (Next.js)

## Design Philosophy

**"Instant First Draft, Infinite Refinements"**

The interface should provide an immediate, fully-formed audio draft, making the user feel like they are collaborating with an AI partner from the very start. The complexity of the backend is hidden, but the creative process is transparent and highly controllable through intuitive tools and conversational AI.

---

## Core UX Principles

1.  **Instant Gratification**: Deliver a complete, synchronized audio draft immediately after processing.
2.  **Process Transparency**: Clearly visualize the multi-stage AI process (Analyzing, Generating Music, etc.) to keep the user engaged and informed.
3.  **Conversational Control**: Allow users to refine the AI's work through natural language chat, in addition to traditional timeline editing.
4.  **Progressive Disclosure**: Start with the complete draft, then allow users to dive into the details of each track and element as needed.

---

## Information Architecture

```
┌─ Authentication (/auth)
├─ Dashboard (/) - Project Overview
├─ Upload & Analysis (/projects/[id]/upload)
│   ├─ Video Upload
│   ├─ Scene Analysis Visualization
│   └─ Processing Queue
├─ Audio Generation (/projects/[id]/generate)
│   ├─ Model Selection & Configuration  
│   ├─ Generation Results
│   └─ A/B Testing Interface
├─ Timeline Editor (/projects/[id]/edit)
│   ├─ Multi-track Audio Editor
│   ├─ Synchronization Tools
│   └─ Real-time Preview
├─ Export & Sharing (/projects/[id]/export)
│   ├─ Format Selection
│   ├─ Stem Separation
│   └─ Project Sharing
└─ Account & Settings (/settings)
    ├─ Usage Analytics
    ├─ Billing & Credits
    └─ Preferences
```

---

## Next.js App Router Structure

```
app/
├─ layout.tsx                    # Root layout with providers
├─ page.tsx                      # Dashboard
├─ globals.css                   # Global styles with CSS variables
├─ loading.tsx                   # Global loading UI
├─ error.tsx                     # Global error boundary
├─ not-found.tsx                 # 404 page
├─ auth/
│   ├─ login/
│   │   └─ page.tsx             # Login page
│   └─ register/
│       └─ page.tsx             # Registration page
├─ projects/
│   ├─ page.tsx                 # Projects overview
│   └─ [id]/
│       ├─ layout.tsx           # Project-specific layout
│       ├─ page.tsx             # Project dashboard
│       ├─ upload/
│       │   ├─ page.tsx         # Upload & analysis
│       │   └─ loading.tsx      # Upload loading state
│       ├─ generate/
│       │   ├─ page.tsx         # Audio generation
│       │   └─ loading.tsx      # Generation loading state
│       ├─ edit/
│       │   └─ page.tsx         # Timeline editor
│       └─ export/
│           └─ page.tsx         # Export options
├─ settings/
│   ├─ page.tsx                 # Account settings
│   ├─ billing/
│   │   └─ page.tsx             # Billing management
│   └─ preferences/
│       └─ page.tsx             # User preferences
└─ api/
    ├─ auth/
    │   └─ route.ts             # Authentication endpoints
    ├─ projects/
    │   ├─ route.ts             # Project CRUD
    │   └─ [id]/
    │       ├─ upload/
    │       │   └─ route.ts     # File upload handling
    │       ├─ generate/
    │       │   └─ route.ts     # AI generation triggers
    │       └─ export/
    │           └─ route.ts     # Export processing
    ├─ ai/
    │   ├─ lyria/
    │   │   └─ route.ts         # Lyria API integration
    │   └─ audiogen/
    │       └─ route.ts         # AudioGen API integration
    └─ webhooks/
        └─ processing/
            └─ route.ts         # AI processing webhooks
```

---

## Page-by-Page UX Architecture

### 1. Dashboard - Project Command Center (`/`)

**Layout**: Card-based project grid with smart filtering
**Key Elements**:
- **Quick Upload CTA**: Prominent drag-drop zone
- **Project Cards**: Visual thumbnails, processing status, last modified
- **Smart Filters**: By status, date, duration, audio type
- **Usage Meter**: Credits/processing time remaining
- **Recent Activity**: AI model performance, successful exports

**Micro-interactions**:
- Hover previews of generated audio
- Processing status animations
- Drag-to-reorder project priority

```
╭─────────────────────────────────────╮
│ [IntelliSFX] [Credits: 2.5hrs] [👤] │
├─────────────────────────────────────┤
│ 📤 Drop video or click to upload    │
├─────────────────────────────────────┤
│ ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐     │
│ │▶️ ⏳│ │✅ 🎵│ │❌ 🔄│ │📝 📊│     │
│ │Video│ │Done │ │Retry│ │Draft│     │
│ └─────┘ └─────┘ └─────┘ └─────┘     │
╰─────────────────────────────────────╯
```

### 2. Upload & Analysis - The Intelligence Phase (`/projects/[id]/upload`)

**Layout**: Three-column progressive flow
**Left**: Video preview with playback controls
**Center**: AI analysis visualization (live updating)
**Right**: Processing queue and model selection

**AI Analysis Visualization**:
- **Scene Timeline**: Color-coded segments (action, dialogue, ambient)
- **Emotion Graph**: Mood detection over time
- **Object Detection**: Key visual elements with confidence scores
- **Audio Suggestions**: Recommended music style and SFX categories

**Processing States**:
```
1. Uploading     [████████████████████] 100%
2. Analyzing     [██████░░░░░░░░░░░░░░░░] 30% (Gemini Vision)
3. Generating    [░░░░░░░░░░░░░░░░░░░░░░]  0% (Queued)
4. Mixing        [░░░░░░░░░░░░░░░░░░░░░░]  0% (Pending)
```

### 3. Audio Generation - The Creative Laboratory (`/projects/[id]/generate`)

**Layout**: Tabbed interface for each AI model + unified control panel

**Lyria Music Tab**:
- Style selection (orchestral, electronic, ambient, etc.)
- Mood sliders (energy, emotion, complexity)
- Generated variations with waveform previews
- Tempo and key suggestions based on video analysis

**AudioGen SFX Tab**:
- Scene-specific sound categories
- Intensity controls per scene segment  
- Layering options (background, foreground, accent)
- Custom prompt refinement

**Unified Control Panel**:
- **Generation Queue**: Batch processing multiple variations
- **A/B Testing**: Side-by-side comparison with video sync
- **Quick Regenerate**: One-click variations with different parameters
- **Save to Library**: Personal sound asset collection

```
╭─ Lyria Music ─┬─ AudioGen SFX ─┬─ Controls ─╮
│ Style: Cinematic              │ ⚡ Generate │
│ ●●●○○ Energy                  │ 🔄 Variants │
│ ●●●●○ Emotion                 │ 💾 Save All │
│ ~~~∿∿~~~∿∿~~~ [▶️] 0:45       │ 📊 A/B Test │
╰───────────────────────────────┴─────────────╯
```

### 4. Timeline Editor - Professional Control & AI Collaboration (`/projects/[id]/edit`)

**Layout**: Familiar DAW-style interface with an integrated AI chat panel.
**Video Track**: Top timeline with scene markers.
**Audio Tracks**: Layered music, SFX, ambient with individual controls.
**Inspector Panel**: Selected element properties and AI insights.
**AI Chat Panel**: A conversational interface to Gemini for making adjustments.

**Key Features**:
- **Magnetic Timeline**: AI-suggested sync points.
- **Smart Crossfades**: Automatic transitions between segments.
- **Volume Automation**: Scene-based level adjustments.
- **AI Coaching & Chat**: Get contextual suggestions and use natural language to make changes (e.g., "Make the music in this scene more dramatic", "add a whoosh sound when the car passes").

**Timeline Tools**:
- Razor tool for splitting segments
- Time-stretch for duration adjustments
- Fade handles for smooth transitions
- Marker system for key video moments

### 5. Export & Sharing - Professional Delivery (`/projects/[id]/export`)

**Layout**: Two-panel export configuration
**Left**: Format and quality settings
**Right**: Real-time export preview with estimated processing time

**Export Options**:
- **Stems**: Separate music, SFX, and ambient tracks
- **Mixed**: Final composite audio
- **Sync Files**: Exported with video file metadata
- **Project Files**: Native format for future editing

**Sharing Features**:
- **Preview Links**: Password-protected client review
- **Collaboration**: Shared editing with team members
- **Integration**: Direct export to Premiere, DaVinci, etc.

---

## Next.js Component Architecture

### Core Layout Components
```typescript
// app/layout.tsx - Root layout with providers
// components/layout/
├── AppHeader.tsx (navigation, user menu, credits display)
├── AppSidebar.tsx (contextual tools based on current page) 
├── AppFooter.tsx (processing status, system notifications)
├── AppModalProvider.tsx (global modal management)
└── AppToastProvider.tsx (notification system)
```

### Page-Specific Components
```typescript
// Dashboard Components
// components/dashboard/
├── ProjectGrid.tsx (masonry layout with infinite scroll)
├── ProjectCard.tsx (thumbnail, status, quick actions)
├── QuickUpload.tsx (drag-drop with progress)
└── UsageAnalytics.tsx (credit usage, model performance)

// Processing Components
// components/processing/
├── VideoPlayer.tsx (custom player with analysis overlay)
├── AnalysisVisualizer.tsx (scene timeline, mood graph)
├── ProcessingQueue.tsx (job status, error handling)
└── ModelSelector.tsx (AI model configuration)

// Generation Components
// components/generation/
├── LyriaInterface.tsx (music generation controls)
├── AudioGenInterface.tsx (SFX generation controls)
├── WaveformPreview.tsx (audio visualization)
└── ABTestingPanel.tsx (comparison interface)

// Timeline Components
// components/timeline/
├── TimelineContainer.tsx (main editing interface)
├── VideoTrack.tsx (video preview with markers)
├── AudioTrack.tsx (individual audio layer)
├── InspectorPanel.tsx (selected element properties)
└── PlaybackControls.tsx (transport controls)
```

### Shared UI Components
```typescript
// components/ui/ (shadcn/ui compatible)
├── Button.tsx (variants: primary, secondary, ghost, danger)
├── Input.tsx (with validation states and icons)
├── Dialog.tsx (modal system with compound components)
├── Toast.tsx (notification system)
├── Progress.tsx (determinate and indeterminate)
├── Slider.tsx (for audio controls and parameters)
├── WaveformDisplay.tsx (reusable audio visualization)
├── StatusIndicator.tsx (processing states, health checks)
├── Card.tsx (project cards and content containers)
└── Tabs.tsx (tabbed interfaces for generation tools)
```

---

## State Management with Zustand

### Store Architecture
```typescript
// stores/auth.ts - User authentication and profile
interface AuthStore {
  user: User | null
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
}

// stores/projects.ts - Project CRUD operations
interface ProjectStore {
  projects: Project[]
  currentProject: Project | null
  isLoading: boolean
  fetchProjects: () => Promise<void>
  createProject: (data: CreateProjectData) => Promise<Project>
  updateProject: (id: string, data: Partial<Project>) => Promise<void>
  deleteProject: (id: string) => Promise<void>
}

// stores/processing.ts - AI model orchestration state
interface ProcessingStore {
  jobs: ProcessingJob[]
  isProcessing: boolean
  addJob: (job: ProcessingJob) => void
  updateJobStatus: (id: string, status: JobStatus) => void
  removeJob: (id: string) => void
}

// stores/audio.ts - Generated audio assets and playback
interface AudioStore {
  audioAssets: AudioAsset[]
  currentTrack: AudioAsset | null
  isPlaying: boolean
  volume: number
  playAudio: (asset: AudioAsset) => void
  pauseAudio: () => void
  setVolume: (volume: number) => void
}

// stores/timeline.ts - Timeline editor state
interface TimelineStore {
  tracks: TimelineTrack[]
  currentTime: number
  duration: number
  selectedElements: string[]
  addTrack: (track: TimelineTrack) => void
  updateTrack: (id: string, updates: Partial<TimelineTrack>) => void
  setCurrentTime: (time: number) => void
}

// stores/ui.ts - Global UI state
interface UIStore {
  sidebarOpen: boolean
  modals: Record<string, boolean>
  notifications: Notification[]
  toggleSidebar: () => void
  openModal: (modalId: string) => void
  closeModal: (modalId: string) => void
  addNotification: (notification: Notification) => void
}
```

### Real-time Data with Supabase
```typescript
// hooks/useRealtime.ts
export function useRealtime(projectId: string) {
  const updateJobStatus = useProcessingStore(state => state.updateJobStatus)
  
  useEffect(() => {
    const channel = supabase.channel(`project-${projectId}`)
    channel
      .on('postgres_changes', { event: '*', schema: 'public', table: 'jobs', filter: `project_id=eq.${projectId}` }, payload => {
        const updatedJob = payload.new as ProcessingJob
        updateJobStatus(updatedJob.id, updatedJob.status)
      })
      .subscribe()
    
    return () => {
      supabase.removeChannel(channel)
    }
  }, [projectId, updateJobStatus])
}
```

---

## API Routes & Server Actions

### API Route Structure
```typescript
// app/api/projects/route.ts
export async function GET(request: Request) {
  // Fetch user projects
}

export async function POST(request: Request) {
  // Create new project
}

// app/api/projects/[id]/upload/route.ts
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Handle file upload and trigger AI analysis
}

// app/api/projects/[id]/generate/route.ts
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  // Trigger AI audio generation
}

// app/api/ai/lyria/route.ts
export async function POST(request: Request) {
  // Interface with Lyria API
}

// app/api/ai/audiogen/route.ts
export async function POST(request: Request) {
  // Interface with AudioGen API
}
```

### Server Actions for Forms
```typescript
// actions/projects.ts
'use server'

export async function createProject(formData: FormData) {
  const title = formData.get('title') as string
  const description = formData.get('description') as string
  
  // Validate input
  const validation = projectSchema.safeParse({ title, description })
  if (!validation.success) {
    return { error: 'Invalid input' }
  }
  
  // Create project in database
  const project = await db.projects.create({
    data: validation.data
  })
  
  revalidatePath('/projects')
  redirect(`/projects/${project.id}`)
}

export async function uploadVideo(projectId: string, formData: FormData) {
  // Handle video upload and trigger analysis
}
```

---

## Design System with Tailwind CSS

### CSS Variables Setup
```css
/* app/globals.css */
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    /* Primary Brand Colors */
    --color-primary: 139 92 246;        /* #8B5CF6 */
    --color-primary-dark: 91 33 182;    /* #5B21B6 */
    --color-primary-light: 196 181 253; /* #C4B5FD */
    
    /* Semantic Colors */
    --color-success: 16 185 129;        /* #10B981 */
    --color-warning: 245 158 11;        /* #F59E0B */
    --color-error: 239 68 68;           /* #EF4444 */
    --color-info: 59 130 246;           /* #3B82F6 */
    
    /* Interface Colors */
    --color-background: 15 15 35;       /* #0F0F23 */
    --color-surface: 30 30 63;          /* #1E1E3F */
    --color-surface-light: 45 45 95;    /* #2D2D5F */
    --color-text-primary: 248 250 252;  /* #F8FAFC */
    --color-text-secondary: 148 163 184; /* #94A3B8 */
    --color-border: 51 65 85;           /* #334155 */
  }
}
```

### Tailwind Configuration
```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'rgb(var(--color-primary) / <alpha-value>)',
          dark: 'rgb(var(--color-primary-dark) / <alpha-value>)',
          light: 'rgb(var(--color-primary-light) / <alpha-value>)',
        },
        success: 'rgb(var(--color-success) / <alpha-value>)',
        warning: 'rgb(var(--color-warning) / <alpha-value>)',
        error: 'rgb(var(--color-error) / <alpha-value>)',
        info: 'rgb(var(--color-info) / <alpha-value>)',
        background: 'rgb(var(--color-background) / <alpha-value>)',
        surface: {
          DEFAULT: 'rgb(var(--color-surface) / <alpha-value>)',
          light: 'rgb(var(--color-surface-light) / <alpha-value>)',
        },
        text: {
          primary: 'rgb(var(--color-text-primary) / <alpha-value>)',
          secondary: 'rgb(var(--color-text-secondary) / <alpha-value>)',
        },
        border: 'rgb(var(--color-border) / <alpha-value>)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'waveform': 'waveform 2s ease-in-out infinite',
        'processing': 'processing 1.5s linear infinite',
      },
      keyframes: {
        waveform: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(1.5)' },
        },
        processing: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
  ],
}

export default config
```

---

## TypeScript Interfaces

### Core Data Models
```typescript
// types/index.ts
export interface User {
  id: string
  email: string
  name: string
  credits: number
  subscription: SubscriptionType
  createdAt: Date
  updatedAt: Date
}

export interface Project {
  id: string
  title: string
  description?: string
  videoUrl?: string
  videoAnalysis?: VideoAnalysis
  audioAssets: AudioAsset[]
  timelineData?: TimelineData
  status: ProjectStatus
  userId: string
  createdAt: Date
  updatedAt: Date
}

export interface VideoAnalysis {
  duration: number
  scenes: Scene[]
  emotions: EmotionData[]
  objects: ObjectDetection[]
  audioRecommendations: AudioRecommendation[]
}

export interface Scene {
  id: string
  startTime: number
  endTime: number
  type: 'action' | 'dialogue' | 'ambient' | 'transition'
  description: string
  confidence: number
}

export interface AudioAsset {
  id: string
  type: 'music' | 'sfx' | 'ambient'
  title: string
  url: string
  duration: number
  waveformData: number[]
  aiModel: 'lyria' | 'audiogen'
  generationParams: Record<string, any>
  projectId: string
}

export interface TimelineTrack {
  id: string
  type: 'video' | 'music' | 'sfx' | 'ambient'
  elements: TimelineElement[]
  volume: number
  muted: boolean
  solo: boolean
}

export interface TimelineElement {
  id: string
  audioAssetId?: string
  startTime: number
  duration: number
  volume: number
  fadeIn: number
  fadeOut: number
}

export interface ProcessingJob {
  id: string
  type: 'analysis' | 'generation' | 'export'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number
  projectId: string
  createdAt: Date
  completedAt?: Date
  error?: string
}

export type ProjectStatus = 'draft' | 'analyzing' | 'generating' | 'editing' | 'exporting' | 'completed'
export type SubscriptionType = 'free' | 'pro' | 'enterprise'
```

---

## Performance Optimizations

### Next.js Specific Optimizations
```typescript
// Dynamic imports for heavy components
const TimelineEditor = dynamic(() => import('@/components/timeline/TimelineContainer'), {
  loading: () => <TimelineEditorSkeleton />,
  ssr: false
})

// Image optimization
import Image from 'next/image'
<Image
  src={project.thumbnailUrl}
  alt={project.title}
  width={300}
  height={200}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>

// Font optimization
import { Inter, JetBrains_Mono } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'] })
```

### Audio Performance
```typescript
// Audio streaming and caching
const useAudioStreaming = (audioUrl: string) => {
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  
  useEffect(() => {
    if (!audioUrl) return
    
    const audioContext = new AudioContext()
    setIsLoading(true)
    
    fetch(audioUrl)
      .then(response => response.arrayBuffer())
      .then(data => audioContext.decodeAudioData(data))
      .then(buffer => {
        setAudioBuffer(buffer)
        setIsLoading(false)
      })
      .catch(console.error)
  }, [audioUrl])
  
  return { audioBuffer, isLoading }
}
```

---

## Deployment Configuration

### Next.js Configuration
```typescript
// next.config.js
const nextConfig = {
  experimental: {
    serverActions: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/intellisfx-assets/**',
      },
    ],
  },
  webpack: (config) => {
    // Audio file handling
    config.module.rules.push({
      test: /\.(mp3|wav|ogg)$/,
      use: {
        loader: 'file-loader',
        options: {
          publicPath: '/_next/static/audio/',
          outputPath: 'static/audio/',
        },
      },
    })
    
    return config
  },
}

module.exports = nextConfig
```

### Environment Variables
```bash
# .env.local
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key

DATABASE_URL=postgresql://user:password@localhost:5432/intellisfx

LYRIA_API_KEY=your-lyria-api-key
AUDIOGEN_API_KEY=your-audiogen-api-key

GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_STORAGE_BUCKET=intellisfx-assets

STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

This Next.js architecture maintains all the excellent UX principles from the original Vue.js design while leveraging Next.js's strengths in server-side rendering, API routes, and full-stack development capabilities. The App Router structure provides excellent organization and performance optimization opportunities.