"use client"

import React, { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { ProjectGrid } from '@/components/dashboard/project-grid'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { 
  ArrowLeft,
  Plus,
  Download,
  Trash2,
  Archive,
  Share2,
  MoreHorizontal,
  CheckSquare,
  Square,
  Filter,
  SortAsc,
  Search,
  FolderOpen,
  Music,
  Clock,
  Users,
  TrendingUp,
  AlertCircle,
  Star
} from 'lucide-react'
import type { Project, ProjectStatus } from '@/types'
import { useProjectStore, useProjects } from '@/stores/projects'

// Mock data for project analytics
const mockProjectStats = {
  totalProjects: 24,
  activeProjects: 8,
  completedProjects: 12,
  totalDuration: 156.7,
  averageCompletionTime: 2.3,
  successRate: 94
}

const bulkActions = [
  { id: 'export', label: 'Export Selected', icon: Download, variant: 'secondary' as const },
  { id: 'archive', label: 'Archive Selected', icon: Archive, variant: 'secondary' as const },
  { id: 'share', label: 'Share Selected', icon: Share2, variant: 'secondary' as const },
  { id: 'delete', label: 'Delete Selected', icon: Trash2, variant: 'destructive' as const }
]

const quickFilters = [
  { id: 'all', label: 'All Projects', count: 24 },
  { id: 'active', label: 'Active', count: 8 },
  { id: 'completed', label: 'Completed', count: 12 },
  { id: 'starred', label: 'Starred', count: 5 },
  { id: 'recent', label: 'Recent', count: 6 }
]

export default function ProjectsPage() {
  const router = useRouter()
  const projects = useProjects()
  
  // Selection state for bulk actions
  const [selectedProjects, setSelectedProjects] = useState<Set<string>>(new Set())
  const [selectMode, setSelectMode] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const [showBulkActions, setShowBulkActions] = useState(false)

  // Handle project selection
  const handleProjectSelect = useCallback((project: Project) => {
    if (selectMode) {
      setSelectedProjects(prev => {
        const newSet = new Set(prev)
        if (newSet.has(project.id)) {
          newSet.delete(project.id)
        } else {
          newSet.add(project.id)
        }
        return newSet
      })
    } else {
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
    }
  }, [router, selectMode])

  // Handle create new project
  const handleCreateProject = useCallback(() => {
    router.push('/?create=true')
  }, [router])

  // Handle bulk action selection
  const handleBulkAction = useCallback((actionId: string) => {
    const selectedIds = Array.from(selectedProjects)
    console.log(`Performing ${actionId} on projects:`, selectedIds)
    
    // Here you would implement the actual bulk actions
    switch (actionId) {
      case 'export':
        // Implement bulk export
        break
      case 'archive':
        // Implement bulk archive
        break
      case 'share':
        // Implement bulk share
        break
      case 'delete':
        // Implement bulk delete with confirmation
        break
    }
    
    // Clear selection after action
    setSelectedProjects(new Set())
    setSelectMode(false)
    setShowBulkActions(false)
  }, [selectedProjects])

  // Toggle select all
  const handleSelectAll = useCallback(() => {
    if (selectedProjects.size === projects.length) {
      setSelectedProjects(new Set())
    } else {
      setSelectedProjects(new Set(projects.map(p => p.id)))
    }
  }, [projects, selectedProjects.size])

  // Toggle select mode
  const handleToggleSelectMode = useCallback(() => {
    setSelectMode(!selectMode)
    setSelectedProjects(new Set())
    setShowBulkActions(!selectMode)
  }, [selectMode])

  const isAllSelected = selectedProjects.size === projects.length && projects.length > 0
  const isPartiallySelected = selectedProjects.size > 0 && selectedProjects.size < projects.length

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-4">
            {/* Navigation */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.push('/')}
                className="text-text-secondary hover:text-text-primary"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>

            {/* Title and Description */}
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-text-primary">
                Projects
              </h1>
              <p className="text-xl text-text-secondary">
                Manage all your AI-powered audio projects
              </p>
            </div>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2">
              {quickFilters.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setActiveFilter(filter.id)}
                  className="text-sm"
                >
                  {filter.label}
                  <span className="ml-2 text-xs opacity-75">
                    {filter.count}
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {/* Project Analytics Card */}
          <Card className="lg:w-80">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Project Analytics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {mockProjectStats.totalProjects}
                  </div>
                  <div className="text-xs text-text-secondary">Total Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {mockProjectStats.activeProjects}
                  </div>
                  <div className="text-xs text-text-secondary">Active</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {mockProjectStats.totalDuration}h
                  </div>
                  <div className="text-xs text-text-secondary">Total Duration</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-text-primary">
                    {mockProjectStats.successRate}%
                  </div>
                  <div className="text-xs text-text-secondary">Success Rate</div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Completion Rate</span>
                  <span className="text-text-primary font-medium">
                    {Math.round((mockProjectStats.completedProjects / mockProjectStats.totalProjects) * 100)}%
                  </span>
                </div>
                <div className="w-full bg-surface rounded-full h-2">
                  <div 
                    className="bg-primary h-2 rounded-full transition-all duration-300"
                    style={{ 
                      width: `${(mockProjectStats.completedProjects / mockProjectStats.totalProjects) * 100}%` 
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* Create Project Button */}
            <Button
              variant="primary"
              onClick={handleCreateProject}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              New Project
            </Button>

            {/* Select Mode Toggle */}
            <Button
              variant={selectMode ? "primary" : "ghost"}
              onClick={handleToggleSelectMode}
              className="flex items-center gap-2"
            >
              {selectMode ? (
                <CheckSquare className="h-4 w-4" />
              ) : (
                <Square className="h-4 w-4" />
              )}
              Select
            </Button>

            {/* Select All (only visible in select mode) */}
            {selectMode && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSelectAll}
                className="flex items-center gap-2"
              >
                {isAllSelected ? (
                  <CheckSquare className="h-4 w-4" />
                ) : isPartiallySelected ? (
                  <CheckSquare className="h-4 w-4 opacity-50" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                {isAllSelected ? 'Deselect All' : 'Select All'}
              </Button>
            )}

            {/* Selection Count */}
            {selectMode && selectedProjects.size > 0 && (
              <span className="text-sm text-text-secondary">
                {selectedProjects.size} selected
              </span>
            )}
          </div>

          {/* Bulk Actions (only visible when projects are selected) */}
          {showBulkActions && selectedProjects.size > 0 && (
            <div className="flex items-center gap-2">
              {bulkActions.map((action) => {
                const Icon = action.icon
                return (
                  <Button
                    key={action.id}
                    variant={action.variant}
                    size="sm"
                    onClick={() => handleBulkAction(action.id)}
                    className="flex items-center gap-2"
                  >
                    <Icon className="h-4 w-4" />
                    {action.label}
                  </Button>
                )
              })}
            </div>
          )}
        </div>

        {/* Enhanced Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <FolderOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-text-primary">Smart Organization</h3>
              <p className="text-sm text-text-secondary">
                Automatically organize projects by status, date, and content type
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-text-primary">Team Collaboration</h3>
              <p className="text-sm text-text-secondary">
                Share projects and collaborate with team members in real-time
              </p>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="pt-6 text-center space-y-3">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform">
                <Clock className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-text-primary">Version History</h3>
              <p className="text-sm text-text-secondary">
                Track changes and revert to previous versions of your projects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project Grid with Enhanced Features */}
        <section className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-text-primary">
              All Projects
            </h2>
            
            {/* Additional Controls */}
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Filters
              </Button>
              <Button variant="ghost" size="sm">
                <SortAsc className="h-4 w-4 mr-2" />
                Sort Options
              </Button>
            </div>
          </div>

          {/* Enhanced Project Grid */}
          <ProjectGrid
            onCreateProject={handleCreateProject}
            onProjectSelect={handleProjectSelect}
            className="min-h-[600px]"
          />
        </section>

        {/* Recent Activity Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-text-primary">
            Recent Activity
          </h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-4">
                {[
                  {
                    action: "Project completed",
                    project: "Summer Vacation Highlights",
                    time: "2 hours ago",
                    icon: Music,
                    color: "text-green-500"
                  },
                  {
                    action: "Audio generation started",
                    project: "Corporate Presentation",
                    time: "4 hours ago", 
                    icon: Clock,
                    color: "text-blue-500"
                  },
                  {
                    action: "New project created",
                    project: "Wedding Ceremony",
                    time: "1 day ago",
                    icon: Plus,
                    color: "text-purple-500"
                  },
                  {
                    action: "Project shared",
                    project: "Product Demo Video",
                    time: "2 days ago",
                    icon: Share2,
                    color: "text-orange-500"
                  }
                ].map((activity, index) => {
                  const Icon = activity.icon
                  return (
                    <div key={index} className="flex items-center gap-4 p-3 rounded-lg hover:bg-surface transition-colors">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center bg-surface",
                        activity.color.replace('text-', 'bg-').replace('-500', '-100')
                      )}>
                        <Icon className={cn("h-4 w-4", activity.color)} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-text-primary">
                          <span className="font-medium">{activity.action}</span>
                          {' '}for{' '}
                          <span className="font-medium">{activity.project}</span>
                        </p>
                        <p className="text-xs text-text-secondary">{activity.time}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  )
}