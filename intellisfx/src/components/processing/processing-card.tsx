"use client"

import React, { useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { useProcessingStore } from '@/stores/processing'
import { cn } from '@/lib/utils'

interface ProcessingCardProps {
  projectId: string
  className?: string
}

export function ProcessingCard({ projectId, className }: ProcessingCardProps) {
  const { jobs, totalProgress, subscribeToProject, unsubscribeFromProject } = useProcessingStore();

  useEffect(() => {
    subscribeToProject(projectId);
    return () => {
      unsubscribeFromProject();
    }
  }, [projectId, subscribeToProject, unsubscribeFromProject]);

  const getStageProgress = (stage: string) => {
    const stageJobs = jobs.filter(j => j.stage === stage);
    if (stageJobs.length === 0) return 0;
    return stageJobs.reduce((acc, job) => acc + job.progress, 0) / stageJobs.length;
  };

  const stages = ['uploading', 'analyzing', 'generating_music', 'generating_sfx', 'mixing', 'exporting'];

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle>Processing Video</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <p>Overall Progress</p>
            <Progress value={totalProgress} className="w-full" />
          </div>
          {stages.map(stage => (
            <div key={stage}>
              <p className="capitalize">{stage.replace('_', ' ')}</p>
              <Progress value={getStageProgress(stage)} className="w-full" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
