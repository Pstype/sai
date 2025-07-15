"use client"

import React from 'react'
import Image from 'next/image'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn, formatDuration, formatRelativeTime, truncateText } from '@/lib/utils'
import { Project, ProjectStatus } from '@/types'
import { 
  Play, 
  Pause, 
  Edit3, 
  Download, 
  MoreHorizontal,
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  Loader2,
  Music,
  Volume2,
  Eye
} from 'lucide-react'

interface ProjectCardProps {
  project: Project
  onPlay?: (project: Project) => void
  onEdit?: (project: Project) => void
  onExport?: (project: Project) => void
  onPreview?: (project: Project) => void
  isPlaying?: boolean
  className?: string
}

// Status configuration with colors and icons
const statusConfig = {
  [ProjectStatus.DRAFT]: {
    label: 'Draft',
    icon: Edit3,
    color: 'text-gray-400',
    bgColor: 'bg-gray-100',
    borderColor: 'border-gray-200'
  },
  [ProjectStatus.ANALYZING]: {
    label: 'Analyzing',
    icon: Loader2,
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    borderColor: 'border-blue-200',
    animate: true
  },
  [ProjectStatus.GENERATING]: {
    label: 'Generating',
    icon: Music,
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    borderColor: 'border-purple-200',
    animate: true
  },
  [ProjectStatus.EDITING]: {
    label: 'Editing',
    icon: Edit3,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-200'
  },
  [ProjectStatus.EXPORTING]: {
    label: 'Exporting',
    icon: Download,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    animate: true
  },
  [ProjectStatus.COMPLETED]: {
    label: 'Completed',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  [ProjectStatus.FAILED]: {
    label: 'Failed',
    icon: AlertCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-200'
  }
}

export function ProjectCard({ 
  project, 
  onPlay, 
  onEdit, 
  onExport, 
  onPreview,
  isPlaying = false,
  className 
}: ProjectCardProps) {
  const status = statusConfig[project.status]
  const StatusIcon = status.icon
  
  // Calculate project duration from video analysis or audio assets
  const duration = project.videoAnalysis?.duration || 
    project.audioAssets.reduce((max, asset) => Math.max(max, asset.duration), 0) || 0

  // Get thumbnail URL (placeholder for now)
  const thumbnailUrl = project.videoUrl ? 
    `${project.videoUrl}?thumbnail=true` : 
    '/placeholder-thumbnail.jpg'

  // Check if project has audio assets
  const hasAudio = project.audioAssets.length > 0
  const audioCount = project.audioAssets.length

  return (
    <Card 
      className={cn(
        "group relative overflow-hidden transition-all duration-300",
        "hover:shadow-lg hover:-translate-y-1",
        "cursor-pointer",
        status.borderColor,
        className
      )}
      hover="lift"
    >
      {/* Thumbnail Section */}
      <div className="relative aspect-video overflow-hidden bg-surface-light">
        {project.videoUrl ? (
          <Image
            src={thumbnailUrl}
            alt={project.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-surface-light">
            <Music className="h-12 w-12 text-text-secondary" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className={cn(
          "absolute top-2 left-2 flex items-center gap-1 rounded-full px-2 py-1 text-xs font-medium",
          status.bgColor,
          status.color
        )}>
          <StatusIcon className={cn(
            "h-3 w-3",
            status.animate && "animate-spin"
          )} />
          {status.label}
        </div>

        {/* Duration Badge */}
        {duration > 0 && (
          <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
            <Clock className="h-3 w-3" />
            {formatDuration(duration)}
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/20" />
        
        {/* Play Button Overlay */}
        {hasAudio && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            <Button
              size="lg"
              variant="primary"
              className="rounded-full shadow-lg"
              onClick={(e) => {
                e.stopPropagation()
                onPlay?.(project)
              }}
            >
              {isPlaying ? (
                <Pause className="h-6 w-6" />
              ) : (
                <Play className="h-6 w-6 ml-1" />
              )}
            </Button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-text-primary leading-tight">
              {truncateText(project.title, 40)}
            </h3>
            {project.description && (
              <p className="mt-1 text-sm text-text-secondary leading-relaxed">
                {truncateText(project.description, 80)}
              </p>
            )}
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            className="shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
            onClick={(e) => {
              e.stopPropagation()
              // Handle more options menu
            }}
          >
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        {/* Project Metadata */}
        <div className="flex items-center gap-4 text-xs text-text-secondary">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {formatRelativeTime(new Date(project.updatedAt))}
          </div>
          
          {audioCount > 0 && (
            <div className="flex items-center gap-1">
              <Volume2 className="h-3 w-3" />
              {audioCount} track{audioCount !== 1 ? 's' : ''}
            </div>
          )}
        </div>

        {/* Processing Progress (if applicable) */}
        {(project.status === ProjectStatus.ANALYZING || 
          project.status === ProjectStatus.GENERATING || 
          project.status === ProjectStatus.EXPORTING) && (
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-text-secondary mb-1">
              <span>Processing...</span>
              <span>75%</span>
            </div>
            <div className="h-1 bg-surface-light rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500 rounded-full",
                  project.status === ProjectStatus.ANALYZING && "bg-blue-500",
                  project.status === ProjectStatus.GENERATING && "bg-purple-500",
                  project.status === ProjectStatus.EXPORTING && "bg-indigo-500"
                )}
                style={{ width: '75%' }}
              />
            </div>
          </div>
        )}
      </CardContent>

      {/* Action Buttons */}
      <CardFooter className="pt-2">
        <div className="flex w-full gap-2">
          {project.status === ProjectStatus.COMPLETED ? (
            <>
              <Button
                variant="secondary"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onEdit?.(project)
                }}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="flex-1"
                onClick={(e) => {
                  e.stopPropagation()
                  onExport?.(project)
                }}
              >
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </>
          ) : project.status === ProjectStatus.DRAFT ? (
            <Button
              variant="primary"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onEdit?.(project)
              }}
            >
              <Edit3 className="h-4 w-4 mr-2" />
              Continue Editing
            </Button>
          ) : project.status === ProjectStatus.FAILED ? (
            <Button
              variant="secondary"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                // Handle retry logic
              }}
            >
              <AlertCircle className="h-4 w-4 mr-2" />
              Retry
            </Button>
          ) : (
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={(e) => {
                e.stopPropagation()
                onPreview?.(project)
              }}
            >
              <Eye className="h-4 w-4 mr-2" />
              View Progress
            </Button>
          )}
        </div>
      </CardFooter>
    </Card>
  )
}