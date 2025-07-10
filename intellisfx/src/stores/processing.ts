import { create } from 'zustand';
import { ProcessingJob } from '@/types';
import { subscribeToProject, unsubscribeFromProject, fetchProcessingJobs } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';

interface ProcessingState {
  jobs: ProcessingJob[];
  currentJob: ProcessingJob | null;
  totalProgress: number;
  connectionStatus: 'connected' | 'disconnected' | 'reconnecting';
  lastSyncTime: Date | null;
  channel: RealtimeChannel | null;
}

interface ProcessingActions {
  syncJobsFromDatabase: (projectId: string) => Promise<void>;
  handleRealtimeUpdate: (payload: any) => void;
  subscribeToProject: (projectId: string) => void;
  unsubscribeFromProject: () => void;
  startVideoProcessing: (projectId: string, videoUrl: string) => Promise<void>;
  retryFailedJob: (jobId: string) => Promise<void>;
  cancelProcessing: (projectId: string) => Promise<void>;
}

export const useProcessingStore = create<ProcessingState & ProcessingActions>((set, get) => ({
  jobs: [],
  currentJob: null,
  totalProgress: 0,
  connectionStatus: 'disconnected',
  lastSyncTime: null,
  channel: null,

  syncJobsFromDatabase: async (projectId) => {
    try {
      const jobs = await fetchProcessingJobs(projectId);
      set({ jobs, lastSyncTime: new Date() });
    } catch (error) {
      console.error("Error syncing jobs:", error);
    }
  },

  handleRealtimeUpdate: (payload) => {
    const { new: newJob } = payload;
    set((state) => {
      const jobs = [...state.jobs];
      const jobIndex = jobs.findIndex(j => j.id === newJob.id);
      if (jobIndex !== -1) {
        jobs[jobIndex] = newJob;
      } else {
        jobs.push(newJob);
      }
      return { jobs };
    });
  },

  subscribeToProject: (projectId) => {
    const channel = subscribeToProject(projectId, get().handleRealtimeUpdate);
    set({ channel, connectionStatus: 'connected' });
  },

  unsubscribeFromProject: () => {
    unsubscribeFromProject();
    set({ channel: null, connectionStatus: 'disconnected' });
  },

  

  

  
}));
