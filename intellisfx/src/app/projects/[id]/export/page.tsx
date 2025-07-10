"use client";


import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Download, Share2, ArrowLeft, Check, Play, Pause, Settings, Upload, Copy, ExternalLink } from "lucide-react";

interface ExportSettings {
  format: string;
  quality: string;
  resolution: string;
  audioMix: string;
  frameRate: string;
}

interface ExportProgress {
  stage: string;
  progress: number;
  isExporting: boolean;
  isComplete: boolean;
}

export default function ExportPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [exportSettings, setExportSettings] = useState<ExportSettings>({
    format: "mp4",
    quality: "high",
    resolution: "1920x1080",
    audioMix: "stereo",
    frameRate: "30fps"
  });

  const [exportProgress, setExportProgress] = useState<ExportProgress>({
    stage: "idle",
    progress: 0,
    isExporting: false,
    isComplete: false
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [exportUrl, setExportUrl] = useState<string | null>(null);

  // Mock project data
  const project = {
    id: projectId,
    title: "My Video Project",
    duration: "2:34",
    lastModified: new Date().toISOString()
  };

  const formatOptions = [
    { value: "mp4", label: "MP4 (Recommended)", description: "Best compatibility" },
    { value: "mov", label: "MOV", description: "High quality" },
    { value: "webm", label: "WebM", description: "Web optimized" },
    { value: "avi", label: "AVI", description: "Uncompressed" }
  ];

  const qualityOptions = [
    { value: "low", label: "Low", description: "Smaller file size" },
    { value: "medium", label: "Medium", description: "Balanced" },
    { value: "high", label: "High", description: "Best quality" },
    { value: "ultra", label: "Ultra", description: "Maximum quality" }
  ];

  const resolutionOptions = [
    { value: "1280x720", label: "720p HD" },
    { value: "1920x1080", label: "1080p Full HD" },
    { value: "2560x1440", label: "1440p QHD" },
    { value: "3840x2160", label: "4K UHD" }
  ];

  const audioMixOptions = [
    { value: "mono", label: "Mono" },
    { value: "stereo", label: "Stereo" },
    { value: "surround", label: "5.1 Surround" }
  ];

  const frameRateOptions = [
    { value: "24fps", label: "24 FPS (Cinema)" },
    { value: "30fps", label: "30 FPS (Standard)" },
    { value: "60fps", label: "60 FPS (Smooth)" }
  ];

  const shareOptions = [
    { platform: "YouTube", icon: "🎥", color: "bg-red-500" },
    { platform: "Vimeo", icon: "📹", color: "bg-blue-500" },
    { platform: "Twitter", icon: "🐦", color: "bg-sky-500" },
    { platform: "Instagram", icon: "📷", color: "bg-pink-500" },
    { platform: "TikTok", icon: "🎵", color: "bg-black" },
    { platform: "Facebook", icon: "👥", color: "bg-blue-600" }
  ];

  const handleExport = async () => {
    setExportProgress({
      stage: "preparing",
      progress: 0,
      isExporting: true,
      isComplete: false
    });

    // Simulate export process
    const stages = [
      { name: "preparing", duration: 1000 },
      { name: "rendering", duration: 3000 },
      { name: "encoding", duration: 2000 },
      { name: "finalizing", duration: 1000 }
    ];

    let totalProgress = 0;
    const progressPerStage = 100 / stages.length;

    for (const stage of stages) {
      setExportProgress(prev => ({ ...prev, stage: stage.name }));
      
      
      const endProgress = totalProgress + progressPerStage;
      
      await new Promise(resolve => {
        const interval = setInterval(() => {
          totalProgress += 2;
          if (totalProgress >= endProgress) {
            totalProgress = endProgress;
            clearInterval(interval);
            resolve(void 0);
          }
          setExportProgress(prev => ({ ...prev, progress: totalProgress }));
        }, stage.duration / (progressPerStage / 2));
      });
    }

    // Complete export
    setExportProgress({
      stage: "complete",
      progress: 100,
      isExporting: false,
      isComplete: true
    });

    // Generate mock download URL
    setExportUrl(`/api/download/${projectId}/export.${exportSettings.format}`);
  };

  const handleDownload = () => {
    if (exportUrl) {
      // In a real implementation, this would trigger the actual download
      const link = document.createElement('a');
      link.href = exportUrl;
      link.download = `${project.title}.${exportSettings.format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const handleShare = (platform: string) => {
    // In a real implementation, this would integrate with platform APIs
    console.log(`Sharing to ${platform}`);
  };

  const copyShareLink = () => {
    const shareLink = `https://intellisfx.com/share/${projectId}`;
    navigator.clipboard.writeText(shareLink);
  };

  const getStageDisplayName = (stage: string) => {
    const stageNames: Record<string, string> = {
      idle: "Ready to Export",
      preparing: "Preparing Export",
      rendering: "Rendering Video",
      encoding: "Encoding Audio",
      finalizing: "Finalizing Export",
      complete: "Export Complete"
    };
    return stageNames[stage] || stage;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/projects/${projectId}/edit`)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold">Export & Share</h1>
                <p className="text-muted-foreground">{project.title}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                onClick={() => router.push("/dashboard")}
              >
                Back to Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Export Configuration Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Export Settings
                </CardTitle>
                <CardDescription>
                  Configure your export options and quality settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Format Selection */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Format</label>
                  <div className="grid grid-cols-1 gap-2">
                    {formatOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          exportSettings.format === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setExportSettings(prev => ({ ...prev, format: option.value }))}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-sm text-muted-foreground">{option.description}</div>
                          </div>
                          {exportSettings.format === option.value && (
                            <Check className="h-4 w-4 text-primary" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quality Settings */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Quality</label>
                  <div className="grid grid-cols-2 gap-2">
                    {qualityOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          exportSettings.quality === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setExportSettings(prev => ({ ...prev, quality: option.value }))}
                      >
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">{option.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resolution */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Resolution</label>
                  <div className="grid grid-cols-2 gap-2">
                    {resolutionOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          exportSettings.resolution === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setExportSettings(prev => ({ ...prev, resolution: option.value }))}
                      >
                        <div className="font-medium text-center">{option.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audio Mix */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Audio Mix</label>
                  <div className="grid grid-cols-3 gap-2">
                    {audioMixOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          exportSettings.audioMix === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setExportSettings(prev => ({ ...prev, audioMix: option.value }))}
                      >
                        <div className="font-medium text-center">{option.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Frame Rate */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Frame Rate</label>
                  <div className="grid grid-cols-3 gap-2">
                    {frameRateOptions.map((option) => (
                      <div
                        key={option.value}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          exportSettings.frameRate === option.value
                            ? "border-primary bg-primary/5"
                            : "border-border hover:border-primary/50"
                        }`}
                        onClick={() => setExportSettings(prev => ({ ...prev, frameRate: option.value }))}
                      >
                        <div className="font-medium text-center">{option.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Export Progress */}
            {(exportProgress.isExporting || exportProgress.isComplete) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {exportProgress.isComplete ? (
                      <Check className="h-5 w-5 text-green-500" />
                    ) : (
                      <Upload className="h-5 w-5" />
                    )}
                    Export Progress
                  </CardTitle>
                  <CardDescription>
                    {getStageDisplayName(exportProgress.stage)}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <Progress value={exportProgress.progress} className="w-full" />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{getStageDisplayName(exportProgress.stage)}</span>
                      <span>{Math.round(exportProgress.progress)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Download & Share Actions */}
            {exportProgress.isComplete && (
              <Card>
                <CardHeader>
                  <CardTitle>Download & Share</CardTitle>
                  <CardDescription>
                    Your video is ready! Download or share it directly.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Button onClick={handleDownload} className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowShareOptions(!showShareOptions)}
                    >
                      <Share2 className="h-4 w-4 mr-2" />
                      Share
                    </Button>
                  </div>

                  {showShareOptions && (
                    <div className="space-y-4 pt-4 border-t">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Share Link</label>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={`https://intellisfx.com/share/${projectId}`}
                            readOnly
                            className="flex-1 px-3 py-2 border rounded-md bg-muted text-sm"
                          />
                          <Button variant="outline" size="icon" onClick={copyShareLink}>
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium mb-2 block">Share to Platform</label>
                        <div className="grid grid-cols-3 gap-2">
                          {shareOptions.map((option) => (
                            <Button
                              key={option.platform}
                              variant="outline"
                              className="flex flex-col items-center gap-1 h-auto py-3"
                              onClick={() => handleShare(option.platform)}
                            >
                              <span className="text-lg">{option.icon}</span>
                              <span className="text-xs">{option.platform}</span>
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Preview Panel */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Preview</CardTitle>
                <CardDescription>
                  Preview your final video before exporting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Video Preview */}
                  <div className="aspect-video bg-black rounded-lg relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-6xl mb-4">🎬</div>
                        <div className="text-lg font-medium">{project.title}</div>
                        <div className="text-sm opacity-75">Duration: {project.duration}</div>
                      </div>
                    </div>
                    
                    {/* Play Controls Overlay */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-4 bg-black/50 rounded-lg p-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-white hover:bg-white/20"
                          onClick={() => setIsPlaying(!isPlaying)}
                        >
                          {isPlaying ? (
                            <Pause className="h-4 w-4" />
                          ) : (
                            <Play className="h-4 w-4" />
                          )}
                        </Button>
                        <div className="flex-1">
                          <Progress value={33} className="bg-white/20" />
                        </div>
                        <span className="text-white text-sm">0:45 / {project.duration}</span>
                      </div>
                    </div>
                  </div>

                  {/* Export Summary */}
                  <div className="space-y-3">
                    <h4 className="font-medium">Export Summary</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Format:</span>
                        <span className="ml-2 font-medium">{exportSettings.format.toUpperCase()}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Quality:</span>
                        <span className="ml-2 font-medium capitalize">{exportSettings.quality}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Resolution:</span>
                        <span className="ml-2 font-medium">{exportSettings.resolution}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Frame Rate:</span>
                        <span className="ml-2 font-medium">{exportSettings.frameRate}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Audio:</span>
                        <span className="ml-2 font-medium capitalize">{exportSettings.audioMix}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Est. Size:</span>
                        <span className="ml-2 font-medium">~125 MB</span>
                      </div>
                    </div>
                  </div>

                  {/* Export Button */}
                  {!exportProgress.isExporting && !exportProgress.isComplete && (
                    <Button onClick={handleExport} className="w-full" size="lg">
                      <Upload className="h-4 w-4 mr-2" />
                      Start Export
                    </Button>
                  )}

                  {exportProgress.isComplete && (
                    <div className="text-center py-4">
                      <div className="text-green-500 mb-2">
                        <Check className="h-8 w-8 mx-auto" />
                      </div>
                      <div className="font-medium">Export Complete!</div>
                      <div className="text-sm text-muted-foreground">
                        Your video is ready for download and sharing.
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Project Actions</CardTitle>
                <CardDescription>
                  Additional options for your project
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push(`/projects/${projectId}`)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View Project Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push(`/projects/${projectId}/edit`)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Back to Editor
                </Button>
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => router.push("/dashboard")}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Return to Dashboard
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}