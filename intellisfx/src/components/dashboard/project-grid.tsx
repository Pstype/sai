"use client"

import React, { useEffect, useState, useMemo } from 'react'

import { ProjectCard } from './project-card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { 
  Search, 
  Filter, 
  SortAsc, 
  SortDesc, 
  Grid3X3, 
  List, 
  RefreshCw,
  Plus,
  Music,
  Clock,
  Calendar,
  AlertCircle,
  Loader2
} from 'lucide-react'
import { Project, ProjectStatus, ProjectFilters, SortOptions } from '@/types'

interface ProjectGridProps {
  className?: string
  onCreateProject?: () => void
  onProjectSelect?: (project: Project) => void
}

type ViewMode = 'grid' | 'list'
type GridSize = 'small' | 'medium' | 'large'

const statusOptions = [
  { value: ProjectStatus.DRAFT, label: 'Draft', color: 'text-gray-500' },
  { value: ProjectStatus.ANALYZING, label: 'Analyzing', color: 'text-blue-500' },
  { value: ProjectStatus.GENERATING, label: 'Generating', color: 'text-purple-500' },
  { value: ProjectStatus.EDITING, label: 'Editing', color: 'text-orange-500' },
  { value: ProjectStatus.EXPORTING, label: 'Exporting', color: 'text-indigo-500' },
  { value: ProjectStatus.COMPLETED, label: 'Completed', color: 'text-green-500' },
  { value: ProjectStatus.FAILED, label: 'Failed', color: 'text-red-500' }
]

const sortOptions = [
  { field: 'updatedAt' as keyof Project, label: 'Last Modified', icon: Calendar },
  { field: 'createdAt' as keyof Project, label: 'Date Created', icon: Calendar },
  { field: 'title' as keyof Project, label: 'Title', icon: SortAsc },
  { field: 'duration' as keyof Project, label: 'Duration', icon: Clock }
]

export function ProjectGrid({ className, onCreateProject, onProjectSelect }: ProjectGridProps) {
  const projects = useProjects()
  const isLoading = useProjectLoading()
  const error = useProjectError()
  
  

  // Local UI state
  const [viewMode, setViewMode] = useState<ViewMode>('grid')
  const [gridSize, setGridSize] = useState<GridSize>('medium')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedStatuses, setSelectedStatuses] = useState<ProjectStatus[]>([])
  const [sortBy, setSortBy] = useState<SortOptions>({ field: 'updatedAt', direction: 'desc' })
  const [showFilters, setShowFilters] = useState(false)

  // Initialize projects on mount
  useEffect(() => {
    fetchProjects()
  }, [fetchProjects])

  // Apply filters when they change
  useEffect(() => {
    const newFilters: ProjectFilters = {
      search: searchQuery || undefined,
      status: selectedStatuses.length > 0 ? selectedStatuses : undefined,
      sortBy: sortBy.field,
      sortOrder: sortBy.direction,
      limit: 20,
      offset: 0
    }
    
    setFilters(newFilters)
    fetchProjects(newFilters)
  }, [searchQuery, selectedStatuses, sortBy])

  // Filtered and sorted projects
  const filteredProjects = useMemo(() => {
    let result = [...projects]
    
    // Client-side search (backup for server-side search)
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(project => 
        project.title.toLowerCase().includes(query) ||
        project.description?.toLowerCase().includes(query)
      )
    }
    
    return result
  }, [projects, searchQuery])

  // Grid layout classes based on size
  const gridClasses = {
    small: 'grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8',
    medium: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    large: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3'
  }

  const handleStatusToggle = (status: ProjectStatus) => {
    setSelectedStatuses(prev => 
      prev.includes(status) 
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  const handleSortChange = (field: keyof Project) => {
    setSortBy(prev => ({
      field,
      direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
    }))
  }

  const handleClearFilters = () => {
    setSearchQuery('')
    setSelectedStatuses([])
    setSortBy({ field: 'updatedAt', direction: 'desc' })
    clearFilters()
  }

  const handleRefresh = () => {
    clearError()
    fetchProjects()
  }

  const handleLoadMore = () => {
    if (!isLoading && hasMore) {
      loadMore()
    }
  }

  // Loading skeleton
  const LoadingSkeleton = () => (
    <div className={cn('grid gap-6', gridClasses[gridSize])}>
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="overflow-hidden">
          <div className="aspect-video bg-surface animate-pulse" />
          <div className="p-4 space-y-3">
            <div className="h-4 bg-surface rounded animate-pulse" />
            <div className="h-3 bg-surface rounded w-2/3 animate-pulse" />
            <div className="flex gap-2">
              <div className="h-8 bg-surface rounded flex-1 animate-pulse" />
              <div className="h-8 bg-surface rounded flex-1 animate-pulse" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  )

  // Empty state
  const EmptyState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-surface p-6 mb-6">
        <Music className="h-12 w-12 text-text-secondary" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        {searchQuery || selectedStatuses.length > 0 ? 'No projects found' : 'No projects yet'}
      </h3>
      <p className="text-text-secondary mb-6 max-w-md">
        {searchQuery || selectedStatuses.length > 0 
          ? 'Try adjusting your search or filters to find what you\'re looking for.'
          : 'Create your first project to get started with AI-powered audio generation.'
        }
      </p>
      {searchQuery || selectedStatuses.length > 0 ? (
        <Button variant="secondary" onClick={handleClearFilters}>
          Clear Filters
        </Button>
      ) : (
        <Button variant="primary" onClick={onCreateProject}>
          <Plus className="h-4 w-4 mr-2" />
          Create Project
        </Button>
      )}
    </div>
  )

  // Error state
  const ErrorState = () => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="rounded-full bg-red-100 p-6 mb-6">
        <AlertCircle className="h-12 w-12 text-red-500" />
      </div>
      <h3 className="text-xl font-semibold text-text-primary mb-2">
        Failed to load projects
      </h3>
      <p className="text-text-secondary mb-6 max-w-md">
        {error || 'Something went wrong while loading your projects. Please try again.'}
      </p>
      <Button variant="secondary" onClick={handleRefresh}>
        <RefreshCw className="h-4 w-4 mr-2" />
        Try Again
      </Button>
    </div>
  )

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header with Search and Controls */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary" />
            <Input
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {/* Filter Toggle */}
          <Button
            variant={showFilters ? "primary" : "ghost"}
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="h-4 w-4 mr-2" />
            Filters
            {(selectedStatuses.length > 0) && (
              <span className="ml-2 rounded-full bg-primary-light text-primary-dark px-2 py-0.5 text-xs">
                {selectedStatuses.length}
              </span>
            )}
          </Button>

          {/* View Mode Toggle */}
          <div className="flex rounded-lg border border-border overflow-hidden">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-none border-0"
            >
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-none border-0"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>

          {/* Refresh */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={cn('h-4 w-4', isLoading && 'animate-spin')} />
          </Button>
        </div>
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <Card>
          <CardContent className="p-4">
            <div className="space-y-4">
              {/* Status Filters */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Status</h4>
                <div className="flex flex-wrap gap-2">
                  {statusOptions.map((status) => (
                    <Button
                      key={status.value}
                      variant={selectedStatuses.includes(status.value) ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => handleStatusToggle(status.value)}
                      className="text-xs"
                    >
                      <span className={cn('w-2 h-2 rounded-full mr-2', status.color.replace('text-', 'bg-'))} />
                      {status.label}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Sort Options */}
              <div>
                <h4 className="text-sm font-medium text-text-primary mb-3">Sort by</h4>
                <div className="flex flex-wrap gap-2">
                  {sortOptions.map((option) => {
                    const Icon = option.icon
                    const isActive = sortBy.field === option.field
                    return (
                      <Button
                        key={option.field}
                        variant={isActive ? "primary" : "ghost"}
                        size="sm"
                        onClick={() => handleSortChange(option.field)}
                        className="text-xs"
                      >
                        <Icon className="h-3 w-3 mr-2" />
                        {option.label}
                        {isActive && (
                          sortBy.direction === 'asc' ? 
                            <SortAsc className="h-3 w-3 ml-2" /> : 
                            <SortDesc className="h-3 w-3 ml-2" />
                        )}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Clear Filters */}
              {(selectedStatuses.length > 0 || searchQuery) && (
                <div className="pt-2 border-t border-border">
                  <Button variant="ghost" size="sm" onClick={handleClearFilters}>
                    Clear all filters
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Summary */}
      {!isLoading && !error && (
        <div className="flex items-center justify-between text-sm text-text-secondary">
          <span>
            {filteredProjects.length} of {totalCount} projects
            {(searchQuery || selectedStatuses.length > 0) && ' (filtered)'}
          </span>
          
          {viewMode === 'grid' && (
            <div className="flex items-center gap-2">
              <span>Size:</span>
              <div className="flex rounded border border-border overflow-hidden">
                {(['small', 'medium', 'large'] as GridSize[]).map((size) => (
                  <Button
                    key={size}
                    variant={gridSize === size ? 'primary' : 'ghost'}
                    size="sm"
                    onClick={() => setGridSize(size)}
                    className="rounded-none border-0 px-3 py-1 text-xs capitalize"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      {error ? (
        <ErrorState />
      ) : isLoading && projects.length === 0 ? (
        <LoadingSkeleton />
      ) : filteredProjects.length === 0 ? (
        <EmptyState />
      ) : (
        <>
          {/* Projects Grid/List */}
          <div className={cn(
            viewMode === 'grid' ? `grid gap-6 ${gridClasses[gridSize]}` : 'space-y-4'
          )}>
            {filteredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onEdit={() => onProjectSelect?.(project)}
                onPreview={() => onProjectSelect?.(project)}
                className={viewMode === 'list' ? 'flex-row' : undefined}
              />
            ))}
          </div>

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-8">
              <Button
                variant="secondary"
                onClick={handleLoadMore}
                disabled={isLoading}
                className="min-w-32"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Loading...
                  </>
                ) : (
                  'Load More'
                )}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}