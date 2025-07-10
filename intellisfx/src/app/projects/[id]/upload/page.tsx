"use client"

import React, { useState, useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { VideoUploader } from '@/components/upload/video-uploader'
import { ProcessingCard } from '@/components/processing/processing-card'
import { useProjectsStore } from '@/stores/projects'
import { useProcessingStore, useIsProcessing, useCurrentJob } from '@/stores/processing'
import { ProjectStatus } from '@/types'
import { ArrowRight, ArrowLeft, Eye, Brain, Waveform, CheckCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AnalysisVisualizationProps {
  videoUrl: string | null
  isAnalyzing: boolean
  analysisComplete: boolean
}

function AnalysisVisualization({ videoUrl, isAnalyzing, analysisComplete }: AnalysisVisualizationProps) {
  const [activeInsight, setActiveInsight] = useState(0)
  
  const insights = [
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Scene Detection",
      description: "Identifying key scenes and transitions",
      status: analysisComplete ? "complete" : isAnalyzing ? "processing" : "pending"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Emotion Analysis",
      description: "Analyzing emotional content and mood",
      status: analysisComplete ? "complete" : isAnalyzing ? "processing" : "pending"
    },
    {
      icon: <Waveform className="w-5 h-5" />,
      title: "Audio Recommendations",
      description: "Generating music and SFX suggestions",
      status: analysisComplete ? "complete" : isAnalyzing ? "processing" : "pending"
    }
  ]

  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setActiveInsight(prev => (prev + 1) % insights.length)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [isAnalyzing, insights.length])

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-primary" />
          AI Analysis
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Video Preview */}
        <div className="aspect-video bg-surface-dark rounded-lg overflow-hidden border border-border">
          {videoUrl ? (
            <video
              src={videoUrl}
              controls
              className="w-full h-full object-cover"
              poster="/placeholder-video.jpg"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-text-secondary">
              <div className="text-center space-y-2">
                <Eye className="w-8 h-8 mx-auto opacity-50" />
                <p className="text-sm">Video preview will appear here</p>
              </div>
            </div>
          )}
        </div>

        {/* Analysis Insights */}
        <div className="space-y-4">
          <h4 className="font-medium text-text-primary">Analysis Insights</h4>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-3 p-3 rounded-lg border transition-all duration-200",
                  insight.status === "complete" && "border-success/30 bg-success/5",
                  insight.status === "processing" && "border-primary/30 bg-primary/5",
                  insight.status === "pending" && "border-border bg-surface-light",
                  isAnalyzing && index === activeInsight && "ring-2 ring-primary/20"
                )}
              >
                <div className={cn(
                  "flex-shrink-0 p-2 rounded-full",
                  insight.status === "complete" && "bg-success/20 text-success",
                  insight.status === "processing" && "bg-primary/20 text-primary",
                  insight.status === "pending" && "bg-surface text-text-secondary"
                )}>
                  {insight.status === "complete" ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    insight.icon
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-text-primary">{insight.title}</h5>
                  <p className="text-sm text-text-secondary">{insight.description}</p>
                </div>
                {insight.status === "processing" && (
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Analysis Results Preview */}
        {analysisComplete && (
          <div className="space-y-4 pt-4 border-t border-border">
            <h4 className="font-medium text-text-primary">Analysis Results</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <span className="text-text-secondary">Scenes Detected</span>
                <div className="font-medium text-text-primary">8 scenes</div>
              </div>
              <div className="space-y-1">
                <span className="text-text-secondary">Dominant Mood</span>
                <div className="font-medium text-text-primary">Energetic</div>
              </div>
              <div className="space-y-1">
                <span className="text-text-secondary">Music Suggestions</span>
                <div className="font-medium text-text-primary">12 tracks</div>
              </div>
              <div className="space-y-1">
                <span className="text-text-secondary">SFX Suggestions</span>
                <div className="font-medium text-text-primary">24 effects</div>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function UploadPage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const { currentProject, setCurrentProject, updateProject } = useProjectsStore()
  const { jobs, getJobsByProject } = useProcessingStore()
  const isProcessing = useIsProcessing()
  

  const [videoUrl, setVideoUrl] = useState<string | null>(null)
  const [uploadComplete, setUploadComplete] = useState(false)
  const [analysisComplete, setAnalysisComplete] = useState(false)

  // Get project-specific jobs
  const projectJobs = getJobsByProject(projectId)
  const isAnalyzing = projectJobs.some(job => 
    job.stage === 'analyzing' && job.status === 'processing'
  )

  // Load project data
  useEffect(() => {
    // In a real app, this would fetch the project from the API
    // For now, we'll create a mock project if it doesn't exist
    if (!currentProject || currentProject.id !== projectId) {
      const mockProject = {
        id: projectId,
        title: `Project ${projectId.slice(-8)}`,
        description: 'Video upload and analysis project',
        status: ProjectStatus.DRAFT,
        userId: 'user-1',
        audioAssets: [],
        createdAt: new Date(),
        updatedAt: new Date()
      }
      setCurrentProject(mockProject)
    }
  }, [projectId, currentProject, setCurrentProject])

  // Handle upload completion
  const handleUploadComplete = useCallback(async (url: string) => {
    setVideoUrl(url)
    setUploadComplete(true)
    
    // Update project with video URL and status
    if (currentProject) {
      const updatedProject = {
        ...currentProject,
        videoUrl: url,
        status: ProjectStatus.ANALYZING
      }
      await updateProject(updatedProject)
      setCurrentProject(updatedProject)
    }
  }, [currentProject, updateProject, setCurrentProject])

  // Handle proceeding to analysis
  

  // Monitor analysis completion
  useEffect(() => {
    const analysisJob = projectJobs.find(job => job.stage === 'analyzing')
    if (analysisJob && analysisJob.status === 'completed') {
      setAnalysisComplete(true)
      
      // Update project status
      if (currentProject && currentProject.status === ProjectStatus.ANALYZING) {
        const updatedProject = {
          ...currentProject,
          status: ProjectStatus.GENERATING
        }
        updateProject(updatedProject)
        setCurrentProject(updatedProject)
      }
    }
  }, [projectJobs, currentProject, updateProject, setCurrentProject])

  // Navigation handlers
  const handleGoBack = () => {
    router.push(`/projects/${projectId}`)
  }

  const handleProceedToGenerate = () => {
    router.push(`/projects/${projectId}/generate`)
  }

  const canProceed = uploadComplete && analysisComplete && !isProcessing

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-surface">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleGoBack}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Project
              </Button>
              <div className="h-6 w-px bg-border" />
              <div>
                <h1 className="text-xl font-semibold text-text-primary">
                  Upload & Analysis
                </h1>
                <p className="text-sm text-text-secondary">
                  {currentProject?.title || 'Loading project...'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-sm text-text-secondary">
                Phase 1 of 4
              </div>
              <Button
                onClick={handleProceedToGenerate}
                disabled={!canProceed}
                className="gap-2"
              >
                Next: Generate Audio
                <ArrowRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Upload */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-sm font-bold text-primary">1</span>
                  </div>
                  Video Upload
                </CardTitle>
              </CardHeader>
              <CardContent>
                <VideoUploader
                  projectId={projectId}
                  onUploadComplete={handleUploadComplete}
                  onProceed={handleProceedToAnalysis}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Processing Status */}
            {(isProcessing || projectJobs.length > 0) && (
              <ProcessingCard
                projectId={projectId}
                className="w-full"
              />
            )}
          </div>

          {/* Right Column - Analysis Visualization */}
          <div className="space-y-6">
            <AnalysisVisualization
              videoUrl={videoUrl}
              isAnalyzing={isAnalyzing}
              analysisComplete={analysisComplete}
            />

            {/* Next Steps */}
            {analysisComplete && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-success" />
                    Analysis Complete
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-text-secondary">
                    Your video has been successfully analyzed. We have identified scenes, emotions, and generated audio recommendations.
                  </p>
                  <div className="flex items-center gap-3">
                    <Button
                      onClick={handleProceedToGenerate}
                      className="gap-2"
                      size="lg"
                    >
                      Generate Audio
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleGoBack}
                      size="lg"
                    >
                      Review Project
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}