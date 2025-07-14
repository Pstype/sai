import { create } from 'zustand';
import { ProcessingJob } from '@/types';
import { supabase } from '@/lib/supabase';
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
  handleRealtimeUpdate: (payload: { new: ProcessingJob }) => void;
  subscribeToProject: (projectId: string) => void;
  unsubscribeFromProject: () => void;
  getJobsByProject: (projectId: string) => ProcessingJob[];
}

export const useProcessingStore = create<ProcessingState & ProcessingActions>((set, get) => ({
  jobs: [],
  currentJob: null,
  totalProgress: 0,
  connectionStatus: 'disconnected',
  lastSyncTime: null,
  channel: null,

  syncJobsFromDatabase: async (projectId: string) => {
    try {
      const { data, error } = await supabase
        .from('processing_jobs')
        .select('*')
        .eq('project_id', projectId);
      if (error) throw error;
      set({ jobs: data || [], lastSyncTime: new Date() });
    } catch (error) {
      console.error("Error syncing jobs:", error);
    }
  },

  handleRealtimeUpdate: (payload: { new: ProcessingJob }) => {
    const { new: newJob } = payload;
    set((state: ProcessingState) => {
      const jobs = [...state.jobs];
      const jobIndex = jobs.findIndex(j => j.id === newJob.id);
      if (jobIndex !== -1) {
        jobs[jobIndex] = newJob;
      } else {
        jobs.push(newJob);
      }
      // Recalculate total progress
      const totalProgress = jobs.length > 0
        ? jobs.reduce((acc, job) => acc + job.progress, 0) / jobs.length
        : 0;
      return { jobs, totalProgress };
    });
  },

  subscribeToProject: (projectId: string) => {
    const currentChannel = get().channel;
    if (currentChannel && currentChannel.topic === `realtime:public:processing_jobs:project_id=eq.${projectId}`) {
      // Already subscribed to the correct channel
      return;
    }

    // If there's an existing channel, unsubscribe from it before creating a new one.
    get().unsubscribeFromProject();

    const newChannel = supabase.channel(`project-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'processing_jobs',
          filter: `project_id=eq.${projectId}`
        },
        (payload) => {
          if (payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') {
            get().handleRealtimeUpdate({ new: payload.new as ProcessingJob });
          }
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          set({ connectionStatus: 'connected' });
          // Sync initial state once subscribed
          get().syncJobsFromDatabase(projectId);
        } else if (status === 'CHANNEL_ERROR') {
          set({ connectionStatus: 'disconnected' });
        } else {
          set({ connectionStatus: 'reconnecting' });
        }
      });

    set({ channel: newChannel });
  },

  unsubscribeFromProject: () => {
    get().channel?.unsubscribe();
    set({ channel: null, connectionStatus: 'disconnected' });
  },

  getJobsByProject: (projectId) => {
    return get().jobs.filter(job => job.projectId === projectId);
  },
}));

export const useIsProcessing = () => useProcessingStore(state =>
  state.jobs.some(job => job.status === 'processing' || job.status === 'pending')
);
