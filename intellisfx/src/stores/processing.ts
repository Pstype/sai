import { create } from 'zustand';
import { ProcessingJob } from '@/types';

interface ProcessingState {
  jobs: ProcessingJob[];
  currentJob: ProcessingJob | null;
}

interface ProcessingActions {
  addJob: (job: Omit<ProcessingJob, 'id' | 'status' | 'progress'>) => void;
  updateJobStatus: (id: string, status: ProcessingJob['status'], progress: number) => void;
  removeJob: (id: string) => void;
  setCurrentJob: (job: ProcessingJob | null) => void;
}

export const useProcessingStore = create<ProcessingState & ProcessingActions>((set) => ({
  jobs: [],
  currentJob: null,
  addJob: (job) => {
    const newJob: ProcessingJob = { ...job, id: new Date().toISOString(), status: 'Uploading', progress: 0 };
    set((state) => ({ jobs: [...state.jobs, newJob], currentJob: newJob }));
  },
  updateJobStatus: (id, status, progress) =>
    set((state) => ({
      jobs: state.jobs.map((j) => (j.id === id ? { ...j, status, progress } : j)),
      currentJob: state.currentJob?.id === id ? { ...state.currentJob, status, progress } : state.currentJob,
    })),
  removeJob: (id) => set((state) => ({ jobs: state.jobs.filter((j) => j.id !== id) })),
  setCurrentJob: (job) => set({ currentJob: job }),
}));
