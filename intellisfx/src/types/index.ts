// Core Data Models

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
  type: SceneType
  description: string
  confidence: number
}

export interface EmotionData {
  timestamp: number
  emotions: {
    joy: number
    sadness: number
    anger: number
    fear: number
    surprise: number
    neutral: number
  }
  dominantEmotion: string
}

export interface ObjectDetection {
  timestamp: number
  objects: DetectedObject[]
}

export interface DetectedObject {
  name: string
  confidence: number
  boundingBox: {
    x: number
    y: number
    width: number
    height: number
  }
}

export interface AudioRecommendation {
  type: AudioType
  style: string
  mood: string
  energy: number
  confidence: number
  sceneIds: string[]
}

export interface AudioAsset {
  id: string
  type: AudioType
  title: string
  url: string
  duration: number
  waveformData: number[]
  aiModel: AIModel
  generationParams: Record<string, any>
  projectId: string
  createdAt: Date
}

export interface TimelineData {
  tracks: TimelineTrack[]
  duration: number
  currentTime: number
  zoom: number
  selectedElements: string[]
}

export interface TimelineTrack {
  id: string
  type: TrackType
  name: string
  elements: TimelineElement[]
  volume: number
  muted: boolean
  solo: boolean
  color: string
  height: number
}

export interface TimelineElement {
  id: string
  audioAssetId?: string
  startTime: number
  duration: number
  volume: number
  fadeIn: number
  fadeOut: number
  offset: number
  locked: boolean
}

export interface ProcessingJob {
  id: string
  type: ProcessingType
  status: ProcessingStatus
  progress: number
  stage: ProcessingStage
  projectId: string
  createdAt: Date
  completedAt?: Date
  error?: string
  metadata?: Record<string, any>
}

// Enums

export enum SubscriptionType {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}

export enum ProjectStatus {
  DRAFT = 'draft',
  ANALYZING = 'analyzing',
  GENERATING = 'generating',
  EDITING = 'editing',
  EXPORTING = 'exporting',
  COMPLETED = 'completed',
  FAILED = 'failed'
}

export enum ProcessingStatus {
  PENDING = 'pending',
  PROCESSING = 'processing',
  COMPLETED = 'completed',
  FAILED = 'failed',
  CANCELLED = 'cancelled'
}

export enum ProcessingType {
  UPLOAD = 'upload',
  ANALYSIS = 'analysis',
  GENERATION = 'generation',
  EXPORT = 'export'
}

export enum ProcessingStage {
  UPLOADING = 'uploading',
  ANALYZING = 'analyzing',
  GENERATING_MUSIC = 'generating_music',
  GENERATING_SFX = 'generating_sfx',
  MIXING = 'mixing',
  EXPORTING = 'exporting'
}

export enum AudioType {
  MUSIC = 'music',
  SFX = 'sfx',
  AMBIENT = 'ambient',
  VOICE = 'voice'
}

export enum AIModel {
  LYRIA = 'lyria',
  AUDIOGEN = 'audiogen',
  MUSICLM = 'musiclm'
}

export enum SceneType {
  ACTION = 'action',
  DIALOGUE = 'dialogue',
  AMBIENT = 'ambient',
  TRANSITION = 'transition'
}

export enum TrackType {
  VIDEO = 'video',
  MUSIC = 'music',
  SFX = 'sfx',
  AMBIENT = 'ambient',
  VOICE = 'voice'
}

// Generation Parameters

export interface LyriaGenerationParams {
  style: string
  mood: string
  energy: number
  complexity: number
  tempo?: number
  key?: string
  duration: number
  prompt?: string
}

export interface AudioGenGenerationParams {
  category: string
  intensity: number
  duration: number
  prompt: string
  layering?: boolean
}

// API Response Types

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface UploadResponse {
  url: string
  signedUrl?: string
  uploadId: string
  expiresAt: Date
}

export interface GenerationResponse {
  jobId: string
  estimatedDuration: number
  queuePosition: number
}

// Form Data Types

export interface CreateProjectData {
  title: string
  description?: string
}

export interface UpdateProjectData {
  title?: string
  description?: string
  status?: ProjectStatus
}

export interface UploadVideoData {
  file: File
  projectId: string
}

export interface GenerateAudioData {
  projectId: string
  type: AudioType
  model: AIModel
  params: LyriaGenerationParams | AudioGenGenerationParams
  sceneIds?: string[]
}

export interface UpdateTimelineData {
  tracks: TimelineTrack[]
  currentTime?: number
  zoom?: number
}

export interface ExportProjectData {
  projectId: string
  format: ExportFormat
  quality: ExportQuality
  includeStems: boolean
  includeVideo: boolean
}

// Export Types

export enum ExportFormat {
  MP3 = 'mp3',
  WAV = 'wav',
  FLAC = 'flac',
  AAC = 'aac'
}

export enum ExportQuality {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  LOSSLESS = 'lossless'
}

export interface ExportOptions {
  format: ExportFormat
  quality: ExportQuality
  sampleRate: number
  bitRate?: number
  includeStems: boolean
  stemTypes: AudioType[]
}

// Notification Types

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  timestamp: Date
  read: boolean
  actionUrl?: string
}

export enum NotificationType {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
}

// UI State Types

export interface UIState {
  sidebarOpen: boolean
  modals: Record<string, boolean>
  notifications: Notification[]
  theme: 'light' | 'dark'
  loading: boolean
}

export interface ModalState {
  isOpen: boolean
  data?: any
}

// Audio Playback Types

export interface PlaybackState {
  isPlaying: boolean
  currentTime: number
  duration: number
  volume: number
  muted: boolean
  playbackRate: number
}

export interface AudioContext {
  audioAssets: AudioAsset[]
  currentTrack: AudioAsset | null
  playbackState: PlaybackState
  waveformData: Record<string, number[]>
}

// Realtime Types

export interface RealtimeEvent {
  type: string
  payload: unknown
  timestamp: Date
}

export interface ProcessingUpdate {
  jobId: string
  status: ProcessingStatus
  progress: number
  stage: ProcessingStage
  error?: string
}

// Utility Types

export type CreateData<T> = Omit<T, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateData<T> = Partial<Omit<T, 'id' | 'createdAt' | 'updatedAt'>>

export type ProjectWithAssets = Project & {
  audioAssets: AudioAsset[]
  processingJobs: ProcessingJob[]
}

export type TimelineElementWithAsset = TimelineElement & {
  audioAsset?: AudioAsset
}

export type TrackWithElements = TimelineTrack & {
  elements: TimelineElementWithAsset[]
}

// Error Types

export interface AppError {
  code: string
  message: string
  details?: Record<string, any>
  timestamp: Date
}

export interface ValidationError {
  field: string
  message: string
  code: string
}

// Search and Filter Types

export interface ProjectFilters {
  status?: ProjectStatus[]
  dateRange?: {
    start: Date
    end: Date
  }
  audioTypes?: AudioType[]
  search?: string
}

export interface SortOptions {
  field: keyof Project
  direction: 'asc' | 'desc'
}

// Analytics Types

export interface UsageAnalytics {
  creditsUsed: number
  creditsRemaining: number
  projectsCreated: number
  audioGenerated: number
  exportCount: number
  period: 'day' | 'week' | 'month' | 'year'
}

export interface ModelPerformance {
  model: AIModel
  successRate: number
  averageGenerationTime: number
  userSatisfaction: number
  usageCount: number
}

// Webhook Types

export interface WebhookPayload {
  event: string
  data: any
  timestamp: Date
  signature: string
}

export interface ProcessingWebhook {
  jobId: string
  status: ProcessingStatus
  progress: number
  result?: {
    audioUrl?: string
    analysisData?: unknown
    error?: string
  }
}