import { create } from 'zustand';
import { ProcessingJob } from '@/types';

interface ProcessingState {
  jobs: ProcessingJob[];
  currentJob: ProcessingJob | null;
  totalProgress: number;
}

interface ProcessingActions {
  addJob: (job: Omit<ProcessingJob, 'id' | 'status' | 'progress'>) => void;
  updateJobStatus: (id: string, status: ProcessingJob['status'], progress: number) => void;
  removeJob: (id: string) => void;
  setCurrentJob: (job: ProcessingJob | null) => void;
  getJobsByProject: (projectId: string) => ProcessingJob[];
}

export const useProcessingStore = create<ProcessingState & ProcessingActions>((set, get) => ({
  jobs: [],
  currentJob: null,
  totalProgress: 0,
  addJob: (job) => {
    const newJob: ProcessingJob = { ...job, id: new Date().toISOString(), status: 'pending', progress: 0, stage: 'uploading' };
    set((state) => ({ jobs: [...state.jobs, newJob], currentJob: newJob }));
  },
  updateJobStatus: (id, status, progress) =>
    set((state) => {
      const updatedJobs = state.jobs.map((j) => (j.id === id ? { ...j, status, progress } : j));
      const updatedCurrentJob = state.currentJob?.id === id ? { ...state.currentJob, status, progress } : state.currentJob;
      
      // Calculate total progress
      const totalProgress = updatedJobs.length > 0 
        ? updatedJobs.reduce((sum, job) => sum + job.progress, 0) / updatedJobs.length 
        : 0;
      
      return {
        jobs: updatedJobs,
        currentJob: updatedCurrentJob,
        totalProgress
      };
    }),
  removeJob: (id) => set((state) => ({ jobs: state.jobs.filter((j) => j.id !== id) })),
  setCurrentJob: (job) => set({ currentJob: job }),
  getJobsByProject: (projectId: string) => {
    return get().jobs.filter(job => job.projectId === projectId);
  },
}));

export const useCurrentJob = () => useProcessingStore((state) => state.currentJob);

export const useIsProcessing = () => useProcessingStore((state) => 
  state.jobs.some(job => job.status === 'processing' || job.status === 'pending')
);

export const useStageProgress = () => {
  const jobs = useProcessingStore((state) => state.jobs);
  
  // Calculate progress for each stage based on jobs
  const stageProgress = {
    uploading: 0,
    analyzing: 0,
    generating_music: 0,
    generating_sfx: 0,
  };
  
  // Find jobs for each stage and calculate their progress
  const uploadingJobs = jobs.filter(job => job.stage === 'uploading');
  const analyzingJobs = jobs.filter(job => job.stage === 'analyzing');
  const musicJobs = jobs.filter(job => job.stage === 'generating_music');
  const sfxJobs = jobs.filter(job => job.stage === 'generating_sfx');
  
  if (uploadingJobs.length > 0) {
    stageProgress.uploading = uploadingJobs.reduce((sum, job) => sum + job.progress, 0) / uploadingJobs.length;
  }
  
  if (analyzingJobs.length > 0) {
    stageProgress.analyzing = analyzingJobs.reduce((sum, job) => sum + job.progress, 0) / analyzingJobs.length;
  }
  
  if (musicJobs.length > 0) {
    stageProgress.generating_music = musicJobs.reduce((sum, job) => sum + job.progress, 0) / musicJobs.length;
  }
  
  if (sfxJobs.length > 0) {
    stageProgress.generating_sfx = sfxJobs.reduce((sum, job) => sum + job.progress, 0) / sfxJobs.length;
  }
  
  return stageProgress;
};

export const getStageDisplayInfo = (stage: string) => {
    const stageInfo = {
        uploading: { 
            title: 'Uploading Video', 
            description: 'Your video is being uploaded to our secure servers.', 
            color: 'bg-blue-500',
            icon: '📤'
        },
        analyzing: { 
            title: 'Analyzing Content', 
            description: 'Our AI is analyzing the video content and audio.', 
            color: 'bg-purple-500',
            icon: '🔍'
        },
        generating_music: { 
            title: 'Generating Music', 
            description: 'Creating new music tracks based on the analysis.', 
            color: 'bg-pink-500',
            icon: '🎵'
        },
        generating_sfx: { 
            title: 'Generating Sound Effects', 
            description: 'Creating sound effects to enhance your video.', 
            color: 'bg-orange-500',
            icon: '🔊'
        },
        editing: { 
            title: 'Preparing Editor', 
            description: 'Getting the timeline editor ready for you.', 
            color: 'bg-yellow-500',
            icon: '✂️'
        },
        exporting: { 
            title: 'Exporting Project', 
            description: 'Finalizing your project and preparing for download.', 
            color: 'bg-green-500',
            icon: '📦'
        },
        completed: { 
            title: 'Completed', 
            description: 'Your project is ready!', 
            color: 'bg-green-500',
            icon: '✅'
        },
        failed: { 
            title: 'Failed', 
            description: 'Something went wrong. Please try again.', 
            color: 'bg-red-500',
            icon: '❌'
        },
    };
    return stageInfo[stage as keyof typeof stageInfo] || stageInfo.failed;
};

export const calculateEstimatedTotalTime = (jobs: ProcessingJob[]) => {
    // This is a mock calculation. In a real app, this would be more sophisticated.
    const stageDurations: Record<string, number> = {
        uploading: 60, // 1 minute
        analyzing: 120, // 2 minutes
        generating_music: 180, // 3 minutes
        generating_sfx: 120, // 2 minutes
        editing: 30, // 30 seconds
        exporting: 90, // 1.5 minutes
    };

    if (!jobs || jobs.length === 0) return 0;

    let totalEstimatedTime = 0;

    jobs.forEach(job => {
        const stageDuration = stageDurations[job.stage] || 60;
        
        if (job.status === 'pending') {
            // Full duration for pending jobs
            totalEstimatedTime += stageDuration;
        } else if (job.status === 'processing') {
            // Remaining time based on progress for active jobs
            const remainingTime = stageDuration * (1 - job.progress / 100);
            totalEstimatedTime += remainingTime;
        }
        // Completed and failed jobs don't add to estimated time
    });

    return totalEstimatedTime;
};
