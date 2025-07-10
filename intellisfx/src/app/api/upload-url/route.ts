import { NextRequest, NextResponse } from 'next/server'
import { getSignedUploadUrl, STORAGE_BUCKETS } from '@/lib/supabase'
import { z } from 'zod'

// Request validation schema
const uploadUrlRequestSchema = z.object({
  fileName: z.string().min(1, 'File name is required'),
  fileType: z.string().min(1, 'File type is required'),
  fileSize: z.number().positive('File size must be positive'),
  bucket: z.enum(['videos', 'audio', 'thumbnails']).optional().default('videos')
})

// Response types
interface UploadUrlResponse {
  signedUrl: string
  token: string
  path: string
  expiresIn: number
}

interface ErrorResponse {
  error: string
  message: string
}

// File validation constants
const MAX_FILE_SIZE = 1024 * 1024 * 1024 // 1GB
const MAX_VIDEO_DURATION = 10 * 60 // 10 minutes in seconds
const ALLOWED_VIDEO_TYPES = [
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-msvideo',
  'video/avi'
]
const ALLOWED_AUDIO_TYPES = [
  'audio/mpeg',
  'audio/wav',
  'audio/mp3',
  'audio/ogg',
  'audio/aac'
]

// Helper function to validate file type
function validateFileType(fileType: string, bucket: string): boolean {
  switch (bucket) {
    case 'videos':
      return ALLOWED_VIDEO_TYPES.includes(fileType)
    case 'audio':
      return ALLOWED_AUDIO_TYPES.includes(fileType)
    case 'thumbnails':
      return fileType.startsWith('image/')
    default:
      return false
  }
}

// Helper function to generate unique file path
function generateFilePath(fileName: string, bucket: string): string {
  const timestamp = Date.now()
  const randomId = Math.random().toString(36).substring(2, 15)
  const fileExtension = fileName.split('.').pop()
  const sanitizedName = fileName
    .replace(/[^a-zA-Z0-9.-]/g, '_')
    .substring(0, 100) // Limit filename length
  
  return `${bucket}/${timestamp}_${randomId}_${sanitizedName}`
}

export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json()
    const validatedData = uploadUrlRequestSchema.parse(body)
    
    const { fileName, fileType, fileSize, bucket } = validatedData

    // Validate file size
    if (fileSize > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error: 'FILE_TOO_LARGE',
          message: `File size exceeds maximum limit of ${MAX_FILE_SIZE / (1024 * 1024 * 1024)}GB`
        } as ErrorResponse,
        { status: 400 }
      )
    }

    // Validate file type
    if (!validateFileType(fileType, bucket)) {
      return NextResponse.json(
        {
          error: 'INVALID_FILE_TYPE',
          message: `File type ${fileType} is not allowed for bucket ${bucket}`
        } as ErrorResponse,
        { status: 400 }
      )
    }

    // Generate unique file path
    const filePath = generateFilePath(fileName, bucket)

    // Generate signed upload URL
    const signedUrlData = await getSignedUploadUrl(bucket, filePath, {
      expiresIn: 3600, // 1 hour
      upsert: false
    })

    // Prepare response
    const response: UploadUrlResponse = {
      signedUrl: signedUrlData.signedUrl,
      token: signedUrlData.token,
      path: signedUrlData.path,
      expiresIn: 3600
    }

    return NextResponse.json(response, { status: 200 })

  } catch (error) {
    console.error('Error generating signed upload URL:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'VALIDATION_ERROR',
          message: error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')
        } as ErrorResponse,
        { status: 400 }
      )
    }

    // Handle Supabase errors
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: 'SUPABASE_ERROR',
          message: error.message
        } as ErrorResponse,
        { status: 500 }
      )
    }

    // Handle unknown errors
    return NextResponse.json(
      {
        error: 'INTERNAL_SERVER_ERROR',
        message: 'An unexpected error occurred while generating upload URL'
      } as ErrorResponse,
      { status: 500 }
    )
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    {
      error: 'METHOD_NOT_ALLOWED',
      message: 'GET method is not supported for this endpoint'
    } as ErrorResponse,
    { status: 405 }
  )
}

export async function PUT() {
  return NextResponse.json(
    {
      error: 'METHOD_NOT_ALLOWED',
      message: 'PUT method is not supported for this endpoint'
    } as ErrorResponse,
    { status: 405 }
  )
}

export async function DELETE() {
  return NextResponse.json(
    {
      error: 'METHOD_NOT_ALLOWED',
      message: 'DELETE method is not supported for this endpoint'
    } as ErrorResponse,
    { status: 405 }
  )
}