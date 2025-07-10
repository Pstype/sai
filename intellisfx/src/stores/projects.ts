import { create } from 'zustand';
import { Project } from '@/types';

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
}

interface ProjectsActions {
  fetchProjects: () => Promise<void>;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateProject: (project: Project) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
}

export const useProjectsStore = create<ProjectsState & ProjectsActions>((set) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
  fetchProjects: async () => {
    set({ isLoading: true, error: null });
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set({ projects: [], isLoading: false });
  },
  createProject: async (project) => {
    set({ isLoading: true, error: null });
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newProject: Project = { ...project, id: new Date().toISOString(), createdAt: new Date(), updatedAt: new Date(), videoAnalysis: null, scenes: [], audioAssets: [], timeline: { tracks: [] } };
    set((state) => ({ projects: [...state.projects, newProject], isLoading: false }));
  },
  updateProject: async (project) => {
    set({ isLoading: true, error: null });
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({
      projects: state.projects.map((p) => (p.id === project.id ? project : p)),
      isLoading: false,
    }));
  },
  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    // Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    set((state) => ({ projects: state.projects.filter((p) => p.id !== id), isLoading: false }));
  },
  setCurrentProject: (project) => set({ currentProject: project }),
}));
