"use client"

import React, { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { ProcessingCard } from '@/components/processing/processing-card'
import { cn } from '@/lib/utils'
import { ArrowLeft, Play, Pause, Download, RefreshCw, Wand2, Music, Volume2 } from 'lucide-react'

interface GenerationParams {
  prompt: string
  duration: number
  style: string
  mood: string
  tempo: number
  key: string
}

interface GeneratedAudio {
  id: string
  type: 'music' | 'sfx'
  prompt: string
  url: string
  duration: number
  status: 'generating' | 'completed' | 'failed'
  progress: number
  createdAt: Date
}

export default function GeneratePage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  // State management
  const [activeTab, setActiveTab] = useState<'music' | 'sfx'>('music')
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAudios, setGeneratedAudios] = useState<GeneratedAudio[]>([])
  const [playingAudio, setPlayingAudio] = useState<string | null>(null)

  // Generation parameters
  const [musicParams, setMusicParams] = useState<GenerationParams>({
    prompt: '',
    duration: 30,
    style: 'cinematic',
    mood: 'uplifting',
    tempo: 120,
    key: 'C major'
  })

  const [sfxParams, setSfxParams] = useState<GenerationParams>({
    prompt: '',
    duration: 5,
    style: 'realistic',
    mood: 'neutral',
    tempo: 0,
    key: ''
  })

  // Mock data for demonstration
  useEffect(() => {
    // Simulate some existing generated audio
    setGeneratedAudios([
      {
        id: '1',
        type: 'music',
        prompt: 'Uplifting cinematic orchestral piece',
        url: '/mock-audio-1.mp3',
        duration: 30,
        status: 'completed',
        progress: 100,
        createdAt: new Date(Date.now() - 1000 * 60 * 5)
      },
      {
        id: '2',
        type: 'sfx',
        prompt: 'Footsteps on gravel',
        url: '/mock-audio-2.mp3',
        duration: 3,
        status: 'completed',
        progress: 100,
        createdAt: new Date(Date.now() - 1000 * 60 * 2)
      }
    ])
  }, [])

  // Tab configuration
  const tabs = [
    {
      id: 'music' as const,
      label: 'Lyria Music',
      icon: Music,
      description: 'Generate background music and soundtracks'
    },
    {
      id: 'sfx' as const,
      label: 'AudioGen SFX',
      icon: Volume2,
      description: 'Create sound effects and ambient audio'
    }
  ]

  // Style options
  const musicStyles = ['cinematic', 'ambient', 'electronic', 'orchestral', 'rock', 'jazz', 'classical']
  const sfxStyles = ['realistic', 'stylized', 'retro', 'futuristic', 'organic', 'mechanical']
  const moods = ['uplifting', 'dramatic', 'peaceful', 'energetic', 'mysterious', 'romantic', 'tense']

  // Handlers
  const handleGenerate = async () => {
    const params = activeTab === 'music' ? musicParams : sfxParams
    
    if (!params.prompt.trim()) {
      alert('Please enter a prompt for generation')
      return
    }

    setIsGenerating(true)

    // Create new audio entry
    const newAudio: GeneratedAudio = {
      id: Date.now().toString(),
      type: activeTab,
      prompt: params.prompt,
      url: '',
      duration: params.duration,
      status: 'generating',
      progress: 0,
      createdAt: new Date()
    }

    setGeneratedAudios(prev => [newAudio, ...prev])

    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGeneratedAudios(prev => 
        prev.map(audio => 
          audio.id === newAudio.id 
            ? { ...audio, progress: Math.min(audio.progress + 10, 100) }
            : audio
        )
      )
    }, 500)

    // Simulate completion after 5 seconds
    setTimeout(() => {
      clearInterval(progressInterval)
      setGeneratedAudios(prev => 
        prev.map(audio => 
          audio.id === newAudio.id 
            ? { 
                ...audio, 
                status: 'completed', 
                progress: 100,
                url: `/mock-generated-${activeTab}-${Date.now()}.mp3`
              }
            : audio
        )
      )
      setIsGenerating(false)
    }, 5000)
  }

  const handlePlayPause = (audioId: string) => {
    if (playingAudio === audioId) {
      setPlayingAudio(null)
    } else {
      setPlayingAudio(audioId)
      // In a real implementation, this would control actual audio playback
      setTimeout(() => setPlayingAudio(null), 3000) // Auto-stop after 3s for demo
    }
  }

  const handleContinueToEdit = () => {
    router.push(`/projects/${projectId}/edit`)
  }

  const currentParams = activeTab === 'music' ? musicParams : sfxParams
  const setCurrentParams = activeTab === 'music' ? setMusicParams : setSfxParams
  const currentStyles = activeTab === 'music' ? musicStyles : sfxStyles

  const filteredAudios = generatedAudios.filter(audio => audio.type === activeTab)
  const hasCompletedAudio = generatedAudios.some(audio => audio.status === 'completed')

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => router.push(`/projects/${projectId}`)}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Audio Generation</h1>
                <p className="text-sm text-muted-foreground">
                  Generate music and sound effects for your project
                </p>
              </div>
            </div>
            {hasCompletedAudio && (
              <Button onClick={handleContinueToEdit} className="gap-2">
                Continue to Edit
                <ArrowLeft className="h-4 w-4 rotate-180" />
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Generation Panel */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tab Navigation */}
            <div className="flex space-x-1 bg-muted p-1 rounded-lg">
              {tabs.map((tab) => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-md text-sm font-medium transition-all",
                      activeTab === tab.id
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {tab.label}
                  </button>
                )
              })}
            </div>

            {/* Tab Content */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {activeTab === 'music' ? (
                    <Music className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                  {tabs.find(tab => tab.id === activeTab)?.label}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  {tabs.find(tab => tab.id === activeTab)?.description}
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Prompt Input */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    Generation Prompt
                  </label>
                  <textarea
                    value={currentParams.prompt}
                    onChange={(e) => setCurrentParams(prev => ({ ...prev, prompt: e.target.value }))}
                    placeholder={
                      activeTab === 'music' 
                        ? "Describe the music you want to generate (e.g., 'Uplifting orchestral piece with strings and piano')"
                        : "Describe the sound effect you want to generate (e.g., 'Footsteps on wooden floor')"
                    }
                    className="w-full min-h-[100px] p-3 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                {/* Parameters Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Duration */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Duration (seconds)
                    </label>
                    <input
                      type="number"
                      value={currentParams.duration}
                      onChange={(e) => setCurrentParams(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
                      min={activeTab === 'music' ? 10 : 1}
                      max={activeTab === 'music' ? 180 : 30}
                      className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>

                  {/* Style */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Style</label>
                    <select
                      value={currentParams.style}
                      onChange={(e) => setCurrentParams(prev => ({ ...prev, style: e.target.value }))}
                      className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {currentStyles.map(style => (
                        <option key={style} value={style}>
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Mood */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Mood</label>
                    <select
                      value={currentParams.mood}
                      onChange={(e) => setCurrentParams(prev => ({ ...prev, mood: e.target.value }))}
                      className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {moods.map(mood => (
                        <option key={mood} value={mood}>
                          {mood.charAt(0).toUpperCase() + mood.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Music-specific parameters */}
                  {activeTab === 'music' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Tempo (BPM)</label>
                        <input
                          type="number"
                          value={currentParams.tempo}
                          onChange={(e) => setCurrentParams(prev => ({ ...prev, tempo: parseInt(e.target.value) || 0 }))}
                          min={60}
                          max={200}
                          className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-foreground">Key</label>
                        <select
                          value={currentParams.key}
                          onChange={(e) => setCurrentParams(prev => ({ ...prev, key: e.target.value }))}
                          className="w-full p-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                        >
                          {['C major', 'G major', 'D major', 'A major', 'E major', 'F major', 'Bb major', 'Eb major', 'A minor', 'E minor', 'B minor', 'F# minor'].map(key => (
                            <option key={key} value={key}>{key}</option>
                          ))}
                        </select>
                      </div>
                    </>
                  )}
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || !currentParams.prompt.trim()}
                  className="w-full gap-2"
                  size="lg"
                >
                  {isGenerating ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Wand2 className="h-4 w-4" />
                      Generate {activeTab === 'music' ? 'Music' : 'Sound Effect'}
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Generated Audio List */}
            {filteredAudios.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Generated {activeTab === 'music' ? 'Music' : 'Sound Effects'}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAudios.map((audio) => (
                      <div
                        key={audio.id}
                        className="flex items-center gap-4 p-4 border border-border rounded-lg bg-card"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-foreground truncate">
                            {audio.prompt}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {audio.duration}s • {audio.createdAt.toLocaleTimeString()}
                          </p>
                          {audio.status === 'generating' && (
                            <div className="mt-2">
                              <Progress value={audio.progress} className="h-2" />
                              <p className="text-xs text-muted-foreground mt-1">
                                Generating... {audio.progress}%
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {audio.status === 'completed' && (
                            <>
                              <Button
                                variant="outline"
                                size="icon"
                                onClick={() => handlePlayPause(audio.id)}
                              >
                                {playingAudio === audio.id ? (
                                  <Pause className="h-4 w-4" />
                                ) : (
                                  <Play className="h-4 w-4" />
                                )}
                              </Button>
                              <Button variant="outline" size="icon">
                                <Download className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                          {audio.status === 'generating' && (
                            <div className="w-16 h-8 flex items-center justify-center">
                              <RefreshCw className="h-4 w-4 animate-spin text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Processing Status */}
            {isGenerating && (
              <ProcessingCard
                projectId={projectId}
                compact={true}
                className="sticky top-6"
              />
            )}

            {/* Tips Card */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Generation Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                {activeTab === 'music' ? (
                  <>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Music Prompts</h4>
                      <p className="text-muted-foreground">
                        Be specific about instruments, genre, and emotion. 
                        Example: &quot;Gentle piano melody with soft strings, peaceful and contemplative&quot;
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Duration</h4>
                      <p className="text-muted-foreground">
                        Longer durations (30-60s) work better for background music. 
                        Shorter clips (10-20s) are good for transitions.
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">SFX Prompts</h4>
                      <p className="text-muted-foreground">
                        Describe the action and environment clearly. 
                        Example: &quot;Heavy footsteps on wooden stairs, echoing&quot;
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Duration</h4>
                      <p className="text-muted-foreground">
                        Most sound effects work best at 1-10 seconds. 
                        Ambient sounds can be longer (10-30s).
                      </p>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            {/* Project Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Project Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Music tracks:</span>
                  <span className="font-medium">
                    {generatedAudios.filter(a => a.type === 'music' && a.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Sound effects:</span>
                  <span className="font-medium">
                    {generatedAudios.filter(a => a.type === 'sfx' && a.status === 'completed').length}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Total duration:</span>
                  <span className="font-medium">
                    {generatedAudios
                      .filter(a => a.status === 'completed')
                      .reduce((sum, a) => sum + a.duration, 0)}s
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}