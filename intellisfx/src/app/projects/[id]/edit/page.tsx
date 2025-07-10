"use client";


import { useParams, useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Square, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Scissors, 
  Copy, 
  Trash2, 
  Undo, 
  Redo, 
  ZoomIn, 
  ZoomOut, 
  MessageSquare, 
  Send, 
  Download, 
  ArrowLeft,
  Music,
  Waveform,
  Settings
} from "lucide-react";

interface Track {
  id: string;
  name: string;
  type: "video" | "audio" | "music" | "sfx";
  duration: number;
  volume: number;
  muted: boolean;
  solo: boolean;
  color: string;
}

interface TimelineMarker {
  id: string;
  time: number;
  label: string;
  type: "cut" | "marker" | "chapter";
}

export default function EditPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  // Playback state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(120); // 2 minutes mock duration
  const [volume, setVolume] = useState(80);

  // Timeline state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [timelinePosition, setTimelinePosition] = useState(0);

  // AI Chat state
  const [chatMessages, setChatMessages] = useState([
    { id: "1", type: "ai", content: "Hi! I'm here to help you edit your video. What would you like to do?" },
  ]);
  const [chatInput, setChatInput] = useState("");
  const [showChat, setShowChat] = useState(false);

  // Mock tracks data
  const [tracks, setTracks] = useState<Track[]>([
    {
      id: "video-1",
      name: "Main Video",
      type: "video",
      duration: 120,
      volume: 100,
      muted: false,
      solo: false,
      color: "#3b82f6"
    },
    {
      id: "audio-1", 
      name: "Original Audio",
      type: "audio",
      duration: 120,
      volume: 80,
      muted: false,
      solo: false,
      color: "#10b981"
    },
    {
      id: "music-1",
      name: "Background Music",
      type: "music", 
      duration: 120,
      volume: 60,
      muted: false,
      solo: false,
      color: "#8b5cf6"
    },
    {
      id: "sfx-1",
      name: "Sound Effects",
      type: "sfx",
      duration: 45,
      volume: 70,
      muted: false,
      solo: false,
      color: "#f59e0b"
    }
  ]);

  // Mock timeline markers
  const [markers, setMarkers] = useState<TimelineMarker[]>([
    { id: "1", time: 15, label: "Intro", type: "chapter" },
    { id: "2", time: 45, label: "Main Content", type: "chapter" },
    { id: "3", time: 90, label: "Outro", type: "chapter" },
  ]);

  // Playback controls
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleSeek = (time: number) => {
    setCurrentTime(time);
  };

  // Timeline controls
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 10));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.1));
  };

  // Track controls
  const toggleTrackMute = (trackId: string) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, muted: !track.muted } : track
    ));
  };

  const toggleTrackSolo = (trackId: string) => {
    setTracks(prev => prev.map(track => 
      track.id === trackId ? { ...track, solo: !track.solo } : track
    ));
  };

  

  // AI Chat
  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    
    const newMessage = {
      id: Date.now().toString(),
      type: "user" as const,
      content: chatInput
    };
    
    setChatMessages(prev => [...prev, newMessage]);
    setChatInput("");
    
    // Mock AI response
    setTimeout(() => {
      const aiResponse = {
        id: (Date.now() + 1).toString(),
        type: "ai" as const,
        content: "I understand you want to edit that section. Let me help you with that!"
      };
      setChatMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  // Navigation
  const handleExportPhase = () => {
    router.push(`/projects/${projectId}/export`);
  };

  const handleBackToProject = () => {
    router.push(`/projects/${projectId}`);
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Mock playback simulation
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying && currentTime < duration) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= duration) {
            setIsPlaying(false);
            return duration;
          }
          return prev + 0.1;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="border-b border-gray-800 bg-gray-950 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToProject}
              className="text-gray-400 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Project
            </Button>
            <h1 className="text-xl font-semibold">Timeline Editor</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowChat(!showChat)}
              className="text-gray-400 hover:text-white"
            >
              <MessageSquare className="h-4 w-4 mr-2" />
              AI Assistant
            </Button>
            <Button onClick={handleExportPhase} className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </div>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Main Editor Area */}
        <div className="flex-1 flex flex-col">
          {/* Transport Controls */}
          <div className="border-b border-gray-800 bg-gray-950 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                {/* Playback Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSeek(Math.max(0, currentTime - 10))}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handlePlayPause}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleStop}
                  >
                    <Square className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSeek(Math.min(duration, currentTime + 10))}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>
                </div>

                {/* Time Display */}
                <div className="flex items-center gap-2 text-sm">
                  <span>{formatTime(currentTime)}</span>
                  <span className="text-gray-500">/</span>
                  <span>{formatTime(duration)}</span>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <Volume2 className="h-4 w-4" />
                  <div className="w-20">
                    <Progress value={volume} className="h-2" />
                  </div>
                  <span className="text-xs text-gray-400">{volume}%</span>
                </div>
              </div>

              {/* Edit Tools */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm">
                  <Undo className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Redo className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-700 mx-2" />
                <Button variant="ghost" size="sm">
                  <Scissors className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
                <div className="w-px h-6 bg-gray-700 mx-2" />
                <Button variant="ghost" size="sm" onClick={handleZoomOut}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleZoomIn}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Timeline Area */}
          <div className="flex-1 flex">
            {/* Track List */}
            <div className="w-64 border-r border-gray-800 bg-gray-950">
              <div className="p-4 border-b border-gray-800">
                <h3 className="font-medium text-sm">Tracks</h3>
              </div>
              <div className="space-y-1 p-2">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className={`p-3 rounded cursor-pointer transition-colors ${
                      selectedTrack === track.id ? 'bg-gray-700' : 'hover:bg-gray-800'
                    }`}
                    onClick={() => setSelectedTrack(track.id)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {track.type === 'video' && <Waveform className="h-4 w-4" style={{ color: track.color }} />}
                        {track.type === 'audio' && <Volume2 className="h-4 w-4" style={{ color: track.color }} />}
                        {track.type === 'music' && <Music className="h-4 w-4" style={{ color: track.color }} />}
                        {track.type === 'sfx' && <Settings className="h-4 w-4" style={{ color: track.color }} />}
                        <span className="text-sm font-medium">{track.name}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 px-2 text-xs ${track.muted ? 'bg-red-600' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTrackMute(track.id);
                        }}
                      >
                        M
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`h-6 px-2 text-xs ${track.solo ? 'bg-yellow-600' : ''}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleTrackSolo(track.id);
                        }}
                      >
                        S
                      </Button>
                      <div className="flex-1">
                        <Progress value={track.volume} className="h-1" />
                      </div>
                      <span className="text-xs text-gray-400">{track.volume}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Canvas */}
            <div className="flex-1 bg-gray-900 relative overflow-hidden">
              {/* Timeline Header */}
              <div className="h-12 border-b border-gray-800 bg-gray-950 flex items-center px-4">
                <div className="flex-1 relative">
                  {/* Time Ruler */}
                  <div className="flex items-center h-full">
                    {Array.from({ length: Math.ceil(duration / 10) + 1 }, (_, i) => (
                      <div key={i} className="flex-shrink-0" style={{ width: `${100 * zoomLevel}px` }}>
                        <div className="text-xs text-gray-400">{formatTime(i * 10)}</div>
                        <div className="w-px h-2 bg-gray-600 mt-1" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Playhead */}
                  <div
                    className="absolute top-0 bottom-0 w-px bg-red-500 z-10"
                    style={{ left: `${(currentTime / duration) * 100 * zoomLevel}%` }}
                  >
                    <div className="w-3 h-3 bg-red-500 rounded-full -ml-1.5 -mt-1" />
                  </div>
                </div>
              </div>

              {/* Track Timeline */}
              <div className="flex-1 relative">
                {tracks.map((track) => (
                  <div
                    key={track.id}
                    className="h-16 border-b border-gray-800 relative flex items-center px-4"
                    style={{ backgroundColor: selectedTrack === track.id ? 'rgba(59, 130, 246, 0.1)' : 'transparent' }}
                  >
                    {/* Track Content Block */}
                    <div
                      className="h-10 rounded relative"
                      style={{
                        backgroundColor: track.color + '40',
                        border: `1px solid ${track.color}`,
                        width: `${(track.duration / duration) * 100 * zoomLevel}%`,
                        opacity: track.muted ? 0.5 : 1
                      }}
                    >
                      {/* Mock Waveform */}
                      <div className="absolute inset-1 flex items-center justify-center">
                        <div className="flex items-end gap-px h-6 overflow-hidden">
                          {Array.from({ length: 50 }, (_, i) => (
                            <div
                              key={i}
                              className="w-px bg-current opacity-60"
                              style={{ height: `${Math.random() * 100}%` }}
                            />
                          ))}
                        </div>
                      </div>
                      
                      {/* Track Label */}
                      <div className="absolute inset-0 flex items-center px-2">
                        <span className="text-xs font-medium text-white drop-shadow">
                          {track.name}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Timeline Markers */}
                {markers.map((marker) => (
                  <div
                    key={marker.id}
                    className="absolute top-0 bottom-0 flex flex-col items-center z-20"
                    style={{ left: `${(marker.time / duration) * 100 * zoomLevel}%` }}
                  >
                    <div className="w-px bg-yellow-500 flex-1" />
                    <div className="bg-yellow-500 text-black text-xs px-1 rounded mt-1">
                      {marker.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Properties Panel */}
          <div className="h-48 border-t border-gray-800 bg-gray-950 p-4">
            <Card className="h-full bg-gray-900 border-gray-700">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">
                  {selectedTrack ? `Properties - ${tracks.find(t => t.id === selectedTrack)?.name}` : 'Properties'}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {selectedTrack ? (
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <label className="text-gray-400">Volume</label>
                      <div className="mt-1">
                        <Progress value={tracks.find(t => t.id === selectedTrack)?.volume || 0} className="h-2" />
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400">Duration</label>
                      <div className="mt-1 text-white">
                        {formatTime(tracks.find(t => t.id === selectedTrack)?.duration || 0)}
                      </div>
                    </div>
                    <div>
                      <label className="text-gray-400">Type</label>
                      <div className="mt-1 text-white capitalize">
                        {tracks.find(t => t.id === selectedTrack)?.type}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400 text-sm">
                    Select a track to view its properties
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* AI Chat Panel */}
        {showChat && (
          <div className="w-80 border-l border-gray-800 bg-gray-950 flex flex-col">
            <div className="p-4 border-b border-gray-800">
              <h3 className="font-medium">AI Assistant</h3>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {chatMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-lg text-sm ${
                      message.type === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-800 text-gray-100'
                    }`}
                  >
                    {message.content}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-4 border-t border-gray-800">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Ask me anything about editing..."
                  className="flex-1 bg-gray-800 border border-gray-700 rounded px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                />
                <Button
                  size="sm"
                  onClick={handleSendMessage}
                  disabled={!chatInput.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}