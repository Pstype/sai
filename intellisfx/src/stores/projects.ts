import { create } from 'zustand';
import { Project, ProjectFilters } from '@/types';
import { supabase } from '@/lib/supabase';

const defaultFilters: ProjectFilters = {
  search: '',
  status: [],
  sortBy: 'updatedAt',
  sortOrder: 'desc',
  limit: 20,
  offset: 0,
};

interface ProjectsState {
  projects: Project[];
  currentProject: Project | null;
  isLoading: boolean;
  error: string | null;
  filters: ProjectFilters;
  totalCount: number;
  hasMore: boolean;
}

interface ProjectsActions {
  fetchProjects: (newFilters?: ProjectFilters) => Promise<void>;
  loadMore: () => Promise<void>;
  setFilters: (newFilters: Partial<ProjectFilters>) => void;
  clearFilters: () => void;
  clearError: () => void;
  createProject: (project: Omit<Project, 'id' | 'createdAt' | 'updatedAt' | 'userId' | 'audioAssets'>) => Promise<void>;
  updateProject: (project: Partial<Project> & { id: string }) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  setCurrentProject: (project: Project | null) => void;
}

export const useProjectsStore = create<ProjectsState & ProjectsActions>((set, get) => ({
  projects: [],
  currentProject: null,
  isLoading: false,
  error: null,
  filters: defaultFilters,
  totalCount: 0,
  hasMore: false,

  fetchProjects: async (newFilters) => {
    set({ isLoading: true, error: null });
    const state = get();
    const filters = newFilters || state.filters;

    try {
      let query = supabase.from('projects').select('*', { count: 'exact' });

      if (filters.search) {
        query = query.ilike('title', `%${filters.search}%`);
      }
      if (filters.status && filters.status.length > 0) {
        query = query.in('status', filters.status);
      }
      if (filters.sortBy && filters.sortOrder) {
        query = query.order(filters.sortBy, { ascending: filters.sortOrder === 'asc' });
      }
      if (filters.limit) {
        query = query.limit(filters.limit);
      }
      if (filters.offset) {
        query = query.range(filters.offset, filters.offset + filters.limit! - 1);
      }

      const { data, error, count } = await query;

      if (error) throw error;

      set((state) => ({
        projects: filters.offset === 0 ? data || [] : [...state.projects, ...(data || [])],
        totalCount: count || 0,
        hasMore: (count || 0) > (filters.offset || 0) + (data?.length || 0),
        isLoading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  loadMore: async () => {
    const state = get();
    if (!state.isLoading && state.hasMore) {
      const newFilters = { ...state.filters, offset: state.projects.length };
      await state.fetchProjects(newFilters);
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({ filters: { ...state.filters, ...newFilters, offset: 0 } }));
    get().fetchProjects();
  },

  clearFilters: () => {
    set({ filters: defaultFilters });
    get().fetchProjects();
  },

  clearError: () => {
    set({ error: null });
  },

  createProject: async (project) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.from('projects').insert([project]).select();
      if (error) throw error;
      if (data) {
        set((state) => ({ projects: [...state.projects, data[0]], isLoading: false }));
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  updateProject: async (project) => {
    set({ isLoading: true, error: null });
    try {
      const { data, error } = await supabase.from('projects').update(project).eq('id', project.id).select();
      if (error) throw error;
      if (data) {
        set((state) => ({
          projects: state.projects.map((p) => (p.id === project.id ? data[0] : p)),
          isLoading: false,
        }));
      }
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  deleteProject: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) throw error;
      set((state) => ({ projects: state.projects.filter((p) => p.id !== id), isLoading: false }));
    } catch (error: any) {
      set({ error: error.message, isLoading: false });
    }
  },

  setCurrentProject: (project) => set({ currentProject: project }),
}));
