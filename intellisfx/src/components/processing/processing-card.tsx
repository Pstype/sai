"use client"

import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { 
  useProcessingStore, 
  useCurrentJob, 
  useStageProgress, 
  useIsProcessing,
  getStageDisplayInfo,
  calculateEstimatedTotalTime,
  type ProcessingJob 
} from '@/stores/processing'
import { cn } from '@/lib/utils'

interface ProcessingCardProps {
  projectId?: string
  className?: string
  showHeader?: boolean
  compact?: boolean
}

export function ProcessingCard({ 
  projectId, 
  className, 
  showHeader = true, 
  compact = false 
}: ProcessingCardProps) {
  const currentJob = useCurrentJob()
  const stageProgress = useStageProgress()
  const isProcessing = useIsProcessing()
  const jobs = useProcessingStore(state => 
    projectId ? state.getJobsByProject(projectId) : state.jobs
  )

  // Calculate overall progress and estimated time
  const totalProgress = useProcessingStore(state => state.totalProgress)
  const estimatedTimeRemaining = calculateEstimatedTotalTime(
    jobs.filter(job => job.status === 'pending' || job.status === 'processing')
  )

  // Define the processing stages in order
  const stages: Array<{
    key: keyof typeof stageProgress
    stage: ProcessingJob['stage']
  }> = [
    { key: 'uploading', stage: 'uploading' },
    { key: 'analyzing', stage: 'analyzing' },
    { key: 'generating_music', stage: 'generating_music' },
    { key: 'generating_sfx', stage: 'generating_sfx' },
  ]

  // Helper function to get stage status
  const getStageStatus = (stageKey: keyof typeof stageProgress) => {
    const progress = stageProgress[stageKey]
    const hasJobInStage = jobs.some(job => 
      job.stage === stageKey && (job.status === 'processing' || job.status === 'completed')
    )
    const isCurrentStage = currentJob?.stage === stageKey
    const isCompleted = progress >= 100
    const isActive = isCurrentStage && isProcessing
    
    return {
      progress,
      isCompleted,
      isActive,
      hasJobInStage,
      isUpcoming: !hasJobInStage && !isCompleted && !isActive
    }
  }

  // Helper function to get progress variant based on stage
  const getProgressVariant = (stageKey: keyof typeof stageProgress) => {
    const status = getStageStatus(stageKey)
    
    if (status.isCompleted) return 'success'
    if (status.isActive) {
      switch (stageKey) {
        case 'uploading': return 'default'
        case 'analyzing': return 'analyzing'
        case 'generating_music': return 'generating'
        case 'generating_sfx': return 'processing'
        default: return 'default'
      }
    }
    return 'default'
  }

  // Format time remaining
  const formatTimeRemaining = (seconds: number) => {
    if (seconds < 60) return `${Math.round(seconds)}s`
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`
    return `${Math.round(seconds / 3600)}h`
  }

  // Get current stage info for header
  const currentStageInfo = currentJob ? getStageDisplayInfo(currentJob.stage) : null

  if (!isProcessing && jobs.length === 0) {
    return null
  }

  return (
    <Card 
      className={cn(
        'w-full transition-all duration-300',
        isProcessing && 'border-primary/50 shadow-lg shadow-primary/10',
        className
      )}
      variant={isProcessing ? 'elevated' : 'default'}
    >
      {showHeader && (
        <CardHeader className={cn(compact && 'pb-4')}>
          <div className="flex items-center justify-between">
            <CardTitle level={compact ? 4 : 3} className="flex items-center gap-2">
              {currentStageInfo && (
                <span className="text-xl" role="img" aria-label={currentStageInfo.title}>
                  {currentStageInfo.icon}
                </span>
              )}
              {isProcessing ? 'Processing Video' : 'Processing Complete'}
            </CardTitle>
            {isProcessing && estimatedTimeRemaining > 0 && (
              <div className="text-sm text-text-secondary">
                ~{formatTimeRemaining(estimatedTimeRemaining)} remaining
              </div>
            )}
          </div>
          {!compact && isProcessing && currentStageInfo && (
            <p className="text-sm text-text-secondary mt-1">
              {currentStageInfo.description}
            </p>
          )}
        </CardHeader>
      )}

      <CardContent className={cn(showHeader && 'pt-0')}>
        <div className="space-y-6">
          {/* Overall Progress */}
          {isProcessing && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="font-medium text-text-primary">Overall Progress</span>
                <span className="text-text-secondary">{Math.round(totalProgress)}%</span>
              </div>
              <Progress 
                value={totalProgress} 
                variant="default" 
                size={compact ? 'sm' : 'md'}
                className="h-2"
              />
            </div>
          )}

          {/* Individual Stage Progress */}
          <div className={cn('space-y-4', compact && 'space-y-3')}>
            {stages.map(({ key, stage }) => {
              const stageInfo = getStageDisplayInfo(stage)
              const status = getStageStatus(key)
              const variant = getProgressVariant(key)
              
              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span 
                        className={cn(
                          'text-lg transition-all duration-200',
                          status.isActive && 'animate-pulse',
                          status.isCompleted && 'opacity-75',
                          status.isUpcoming && 'opacity-50'
                        )}
                        role="img" 
                        aria-label={stageInfo.title}
                      >
                        {stageInfo.icon}
                      </span>
                      <span 
                        className={cn(
                          'font-medium transition-colors duration-200',
                          status.isActive && 'text-text-primary',
                          status.isCompleted && 'text-success',
                          status.isUpcoming && 'text-text-secondary'
                        )}
                      >
                        {stageInfo.title}
                      </span>
                      {status.isCompleted && (
                        <span className="text-success text-sm">✓</span>
                      )}
                    </div>
                    <div className="text-sm text-text-secondary">
                      {status.isCompleted ? 'Complete' : 
                       status.isActive ? `${Math.round(status.progress)}%` : 
                       status.isUpcoming ? 'Pending' : 'Queued'}
                    </div>
                  </div>
                  
                  {!compact && (
                    <p className="text-xs text-text-secondary ml-7 -mt-1">
                      {stageInfo.description}
                    </p>
                  )}
                  
                  <Progress
                    value={status.progress}
                    variant={variant}
                    size={compact ? 'sm' : 'md'}
                    indeterminate={status.isActive && status.progress === 0}
                    className={cn(
                      'transition-all duration-300',
                      status.isUpcoming && 'opacity-50'
                    )}
                  />
                  
                  {/* Show estimated time for active stage */}
                  {status.isActive && currentJob?.estimatedTimeRemaining && (
                    <div className="text-xs text-text-secondary ml-7">
                      Estimated: {formatTimeRemaining(currentJob.estimatedTimeRemaining)}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Processing Queue Info */}
          {!compact && isProcessing && (
            <div className="pt-4 border-t border-border">
              <div className="flex items-center justify-between text-sm">
                <span className="text-text-secondary">
                  {jobs.filter(job => job.status === 'processing').length} active, {' '}
                  {jobs.filter(job => job.status === 'pending').length} queued
                </span>
                {currentJob && (
                  <span className="text-text-secondary">
                    Job ID: {currentJob.id.slice(-8)}
                  </span>
                )}
              </div>
            </div>
          )}

          {/* Error State */}
          {jobs.some(job => job.status === 'failed') && (
            <div className="pt-4 border-t border-error/20">
              <div className="flex items-center gap-2 text-error text-sm">
                <span>⚠️</span>
                <span>Some processing steps failed. Please try again.</span>
              </div>
              {jobs
                .filter(job => job.status === 'failed')
                .map(job => (
                  <div key={job.id} className="mt-2 text-xs text-error/80 ml-6">
                    {getStageDisplayInfo(job.stage).title}: {job.error || 'Unknown error'}
                  </div>
                ))
              }
            </div>
          )}

          {/* Success State */}
          {!isProcessing && jobs.every(job => job.status === 'completed') && jobs.length > 0 && (
            <div className="pt-4 border-t border-success/20">
              <div className="flex items-center gap-2 text-success text-sm">
                <span>✅</span>
                <span>All processing stages completed successfully!</span>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

// Export additional components for specific use cases
export function CompactProcessingCard(props: Omit<ProcessingCardProps, 'compact'>) {
  return <ProcessingCard {...props} compact={true} />
}

export function ProcessingCardHeader(props: Omit<ProcessingCardProps, 'showHeader'>) {
  return <ProcessingCard {...props} showHeader={false} />
}

export default ProcessingCard