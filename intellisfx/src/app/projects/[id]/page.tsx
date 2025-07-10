'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjectsStore } from '@/stores/projects';
import { Project, ProjectStatus } from '@/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  Upload, 
  Music, 
  Edit, 
  Download, 
  Play, 
  Calendar, 
  Clock, 
  FileVideo, 
  Waveform,
  CheckCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';

const getStatusColor = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.COMPLETED:
      return 'text-green-600';
    case ProjectStatus.FAILED:
      return 'text-red-600';
    case ProjectStatus.ANALYZING:
    case ProjectStatus.GENERATING:
    case ProjectStatus.EDITING:
    case ProjectStatus.EXPORTING:
      return 'text-blue-600';
    default:
      return 'text-gray-600';
  }
};

const getStatusIcon = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.COMPLETED:
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    case ProjectStatus.FAILED:
      return <AlertCircle className="h-5 w-5 text-red-600" />;
    case ProjectStatus.ANALYZING:
    case ProjectStatus.GENERATING:
    case ProjectStatus.EDITING:
    case ProjectStatus.EXPORTING:
      return <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />;
    default:
      return <Clock className="h-5 w-5 text-gray-600" />;
  }
};

const getWorkflowProgress = (status: ProjectStatus) => {
  switch (status) {
    case ProjectStatus.DRAFT:
      return 0;
    case ProjectStatus.ANALYZING:
      return 25;
    case ProjectStatus.GENERATING:
      return 50;
    case ProjectStatus.EDITING:
      return 75;
    case ProjectStatus.EXPORTING:
    case ProjectStatus.COMPLETED:
      return 100;
    default:
      return 0;
  }
};

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
};

const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

export default function ProjectPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;
  
  const { 
    projects, 
    currentProject, 
    isLoading, 
    error, 
    fetchProjects, 
    setCurrentProject 
  } = useProjectsStore();

  const [project, setProject] = useState<Project | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const loadProject = async () => {
      // First check if we have projects loaded
      if (projects.length === 0) {
        await fetchProjects();
      }

      // Find the project by ID
      const foundProject = projects.find(p => p.id === projectId);
      
      if (foundProject) {
        setProject(foundProject);
        setCurrentProject(foundProject);
        setNotFound(false);
      } else {
        // If projects are loaded but project not found
        if (projects.length > 0) {
          setNotFound(true);
        }
      }
    };

    loadProject();
  }, [projectId, projects, fetchProjects, setCurrentProject]);

  const handleNavigateToPhase = (phase: string) => {
    router.push(`/projects/${projectId}/${phase}`);
  };

  const canAccessPhase = (phase: string, status: ProjectStatus) => {
    switch (phase) {
      case 'upload':
        return true; // Always accessible
      case 'generate':
        return status !== ProjectStatus.DRAFT;
      case 'edit':
        return status === ProjectStatus.EDITING || 
               status === ProjectStatus.EXPORTING || 
               status === ProjectStatus.COMPLETED;
      case 'export':
        return status === ProjectStatus.EXPORTING || 
               status === ProjectStatus.COMPLETED;
      default:
        return false;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading project...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || notFound) {
    return (
      <div className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Project Not Found</h2>
              <p className="text-muted-foreground mb-6">
                The project you're looking for doesn't exist or has been deleted.
              </p>
              <Button onClick={() => router.push('/projects')}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Projects
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!project) {
    return null;
  }

  const workflowProgress = getWorkflowProgress(project.status);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => router.push('/projects')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Projects
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{project.title}</h1>
              {project.description && (
                <p className="text-muted-foreground mt-1">{project.description}</p>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {getStatusIcon(project.status)}
            <span className={`font-medium ${getStatusColor(project.status)}`}>
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
        </div>

        {/* Project Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Project Details */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
              <CardDescription>
                Overview of your project progress and metadata
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Workflow Progress */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Workflow Progress</span>
                  <span className="text-sm text-muted-foreground">{workflowProgress}%</span>
                </div>
                <Progress value={workflowProgress} className="h-2" />
              </div>

              {/* Project Info */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(project.createdAt)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Last Updated</p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(project.updatedAt)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Video Info */}
              {project.videoUrl && (
                <div className="flex items-center space-x-2">
                  <FileVideo className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Video</p>
                    <p className="text-sm text-muted-foreground">
                      {project.videoAnalysis 
                        ? `Duration: ${formatDuration(project.videoAnalysis.duration)}`
                        : 'Uploaded'
                      }
                    </p>
                  </div>
                </div>
              )}

              {/* Audio Assets */}
              {project.audioAssets.length > 0 && (
                <div className="flex items-center space-x-2">
                  <Waveform className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Audio Assets</p>
                    <p className="text-sm text-muted-foreground">
                      {project.audioAssets.length} generated track{project.audioAssets.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>
                Jump to any phase of your workflow
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigateToPhase('upload')}
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload & Analyze
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigateToPhase('generate')}
                disabled={!canAccessPhase('generate', project.status)}
              >
                <Music className="h-4 w-4 mr-2" />
                Generate Audio
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigateToPhase('edit')}
                disabled={!canAccessPhase('edit', project.status)}
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Timeline
              </Button>
              
              <Button
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleNavigateToPhase('export')}
                disabled={!canAccessPhase('export', project.status)}
              >
                <Download className="h-4 w-4 mr-2" />
                Export & Share
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Phases */}
        <Card>
          <CardHeader>
            <CardTitle>Workflow Phases</CardTitle>
            <CardDescription>
              Complete each phase to finish your project
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Upload Phase */}
              <div 
                className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${
                  project.status === ProjectStatus.DRAFT 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-green-500 bg-green-50'
                }`}
                onClick={() => handleNavigateToPhase('upload')}
              >
                <div className="flex items-center justify-between mb-2">
                  <Upload className="h-5 w-5" />
                  {project.videoUrl && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <h3 className="font-medium">Upload & Analyze</h3>
                <p className="text-sm text-muted-foreground">
                  Upload video and analyze content
                </p>
              </div>

              {/* Generate Phase */}
              <div 
                className={`p-4 rounded-lg border-2 transition-colors ${
                  !canAccessPhase('generate', project.status)
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : project.status === ProjectStatus.GENERATING
                    ? 'border-blue-500 bg-blue-50 cursor-pointer'
                    : project.audioAssets.length > 0
                    ? 'border-green-500 bg-green-50 cursor-pointer'
                    : 'border-gray-300 bg-white cursor-pointer'
                }`}
                onClick={() => canAccessPhase('generate', project.status) && handleNavigateToPhase('generate')}
              >
                <div className="flex items-center justify-between mb-2">
                  <Music className="h-5 w-5" />
                  {project.audioAssets.length > 0 && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <h3 className="font-medium">Generate Audio</h3>
                <p className="text-sm text-muted-foreground">
                  Create music and sound effects
                </p>
              </div>

              {/* Edit Phase */}
              <div 
                className={`p-4 rounded-lg border-2 transition-colors ${
                  !canAccessPhase('edit', project.status)
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : project.status === ProjectStatus.EDITING
                    ? 'border-blue-500 bg-blue-50 cursor-pointer'
                    : project.timelineData
                    ? 'border-green-500 bg-green-50 cursor-pointer'
                    : 'border-gray-300 bg-white cursor-pointer'
                }`}
                onClick={() => canAccessPhase('edit', project.status) && handleNavigateToPhase('edit')}
              >
                <div className="flex items-center justify-between mb-2">
                  <Edit className="h-5 w-5" />
                  {project.timelineData && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <h3 className="font-medium">Edit Timeline</h3>
                <p className="text-sm text-muted-foreground">
                  Fine-tune audio placement
                </p>
              </div>

              {/* Export Phase */}
              <div 
                className={`p-4 rounded-lg border-2 transition-colors ${
                  !canAccessPhase('export', project.status)
                    ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                    : project.status === ProjectStatus.EXPORTING
                    ? 'border-blue-500 bg-blue-50 cursor-pointer'
                    : project.status === ProjectStatus.COMPLETED
                    ? 'border-green-500 bg-green-50 cursor-pointer'
                    : 'border-gray-300 bg-white cursor-pointer'
                }`}
                onClick={() => canAccessPhase('export', project.status) && handleNavigateToPhase('export')}
              >
                <div className="flex items-center justify-between mb-2">
                  <Download className="h-5 w-5" />
                  {project.status === ProjectStatus.COMPLETED && <CheckCircle className="h-4 w-4 text-green-600" />}
                </div>
                <h3 className="font-medium">Export & Share</h3>
                <p className="text-sm text-muted-foreground">
                  Download final video
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}