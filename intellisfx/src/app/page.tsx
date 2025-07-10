"use client"

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { QuickUpload } from '@/components/dashboard/quick-upload'
import { ProjectGrid } from '@/components/dashboard/project-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  Sparkles, 
  Zap, 
  Music, 
  Volume2, 
  Clock, 
  TrendingUp,
  Plus,
  ArrowRight,
  Play,
  Users,
  Award
} from 'lucide-react'
import type { Project } from '@/types'

// Mock data for usage analytics (will be replaced with real data from stores)
const mockUsageStats = {
  creditsRemaining: 2.5,
  totalCredits: 5.0,
  projectsCompleted: 12,
  hoursProcessed: 8.3,
  successRate: 94
}

const features = [
  {
    icon: Sparkles,
    title: "AI Video Analysis",
    description: "Advanced scene detection and emotion mapping",
    color: "text-blue-500"
  },
  {
    icon: Music,
    title: "Lyria Music Generation",
    description: "Professional-grade music composition",
    color: "text-purple-500"
  },
  {
    icon: Volume2,
    title: "AudioGen Sound Effects",
    description: "Realistic and immersive audio effects",
    color: "text-green-500"
  },
  {
    icon: Zap,
    title: "Instant First Draft",
    description: "Complete audio track in minutes",
    color: "text-orange-500"
  }
]

export default function Dashboard() {
  const router = useRouter()
  const [showQuickUpload, setShowQuickUpload] = useState(true)

  // Handle project creation from QuickUpload
  const handleProjectCreated = useCallback((projectId: string) => {
    // Navigate to the project's upload page
    router.push(`/projects/${projectId}/upload`)
  }, [router])

  // Handle project selection from ProjectGrid
  const handleProjectSelect = useCallback((project: Project) => {
    // Navigate based on project status
    switch (project.status) {
      case 'draft':
        router.push(`/projects/${project.id}/upload`)
        break
      case 'analyzing':
      case 'generating':
        router.push(`/projects/${project.id}/generate`)
        break
      case 'editing':
      case 'completed':
        router.push(`/projects/${project.id}/edit`)
        break
      default:
        router.push(`/projects/${project.id}`)
    }
  }, [router])

  // Handle create new project
  const handleCreateProject = useCallback(() => {
    setShowQuickUpload(true)
    // Scroll to quick upload section
    document.getElementById('quick-upload')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    })
  }, [])

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-text-primary">
              Welcome to IntelliSFX
            </h1>
            <p className="text-xl text-text-secondary">
              Transform your videos with AI-powered audio generation
            </p>
          </div>

          {/* Usage Analytics Card */}
          <Card className="lg:w-80">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Your Usage
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Credits */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Credits</span>
                  <span className="text-text-primary font-medium">
                    {mockUsageStats.creditsRemaining}h / {mockUsageStats.totalCredits}h
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(mockUsageStats.creditsRemaining / mockUsageStats.totalCredits) * 100}%` 
                    }}
                  />
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {mockUsageStats.projectsCompleted}
                  </div>
                  <div className="text-xs text-text-secondary">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {mockUsageStats.successRate}%
                  </div>
                  <div className="text-xs text-text-secondary">Success Rate</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Upload Section */}
        {showQuickUpload && (
          <section id="quick-upload" className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-text-primary">
                Start Creating
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowQuickUpload(false)}
                className="text-text-secondary hover:text-text-primary"
              >
                Hide
              </Button>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Quick Upload Component */}
              <div className="lg:col-span-2">
                <QuickUpload 
                  onProjectCreated={handleProjectCreated}
                  className="h-full"
                />
              </div>

              {/* Features Overview */}
              <div className="space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg">AI-Powered Features</CardTitle>
                    <CardDescription>
                      Everything you need for professional audio
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {features.map((feature, index) => {
                      const Icon = feature.icon
                      return (
                        <div key={index} className="flex items-start gap-3">
                          <div className={cn(
                            "rounded-lg p-2 bg-surface",
                            "flex items-center justify-center flex-shrink-0"
                          )}>
                            <Icon className={cn("h-4 w-4", feature.color)} />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-medium text-text-primary">
                              {feature.title}
                            </h4>
                            <p className="text-xs text-text-secondary">
                              {feature.description}
                            </p>
                          </div>
                        </div>
                      )
                    })}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <div className="space-y-3">
                  <Button 
                    variant="secondary" 
                    className="w-full justify-between"
                    onClick={() => router.push('/projects')}
                  >
                    <span className="flex items-center gap-2">
                      <Users className="h-4 w-4" />
                      Browse Templates
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                  
                  <Button 
                    variant="ghost" 
                    className="w-full justify-between"
                    onClick={() => router.push('/settings')}
                  >
                    <span className="flex items-center gap-2">
                      <Award className="h-4 w-4" />
                      View Tutorials
                    </span>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Projects Section */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-2xl font-semibold text-text-primary">
                Your Projects
              </h2>
              <p className="text-text-secondary">
                Manage and continue working on your audio projects
              </p>
            </div>
            
            {!showQuickUpload && (
              <Button 
                variant="primary"
                onClick={handleCreateProject}
                className="flex items-center gap-2"
              >
                <Plus className="h-4 w-4" />
                New Project
              </Button>
            )}
          </div>

          {/* Project Grid */}
          <ProjectGrid
            onCreateProject={handleCreateProject}
            onProjectSelect={handleProjectSelect}
            className="min-h-[400px]"
          />
        </section>

        {/* Process Preview Section */}
        <section className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-semibold text-text-primary">
              How It Works
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Our AI-powered pipeline transforms your videos into professional audio experiences
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Upload Video",
                description: "Drag and drop your video file",
                icon: Play,
                color: "bg-blue-500"
              },
              {
                step: "2", 
                title: "AI Analysis",
                description: "Scene detection and emotion mapping",
                icon: Sparkles,
                color: "bg-purple-500"
              },
              {
                step: "3",
                title: "Generate Audio",
                description: "Music and sound effects creation",
                icon: Music,
                color: "bg-green-500"
              },
              {
                step: "4",
                title: "Perfect Sync",
                description: "Timeline editing and export",
                icon: Zap,
                color: "bg-orange-500"
              }
            ].map((process, index) => {
              const Icon = process.icon
              return (
                <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
                  <CardContent className="pt-6 space-y-4">
                    <div className="mx-auto relative">
                      <div className={cn(
                        "w-16 h-16 rounded-full flex items-center justify-center text-white",
                        "group-hover:scale-110 transition-transform duration-300",
                        process.color
                      )}>
                        <Icon className="h-8 w-8" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-surface border-2 border-background rounded-full flex items-center justify-center">
                        <span className="text-xs font-bold text-text-primary">
                          {process.step}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h3 className="font-semibold text-text-primary">
                        {process.title}
                      </h3>
                      <p className="text-sm text-text-secondary">
                        {process.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </section>
      </div>
    </main>
  )
}
