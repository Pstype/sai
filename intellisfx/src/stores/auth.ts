import { create } from 'zustand';
import { User } from '@/types';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
}

interface AuthActions {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      set({ error: error.message, isLoading: false });
    } else if (data.user) {
      set({ user: data.user as User, isLoading: false });
    }
  },
  logout: async () => {
    set({ isLoading: true, error: null });
    await supabase.auth.signOut();
    set({ user: null, isLoading: false });
  },
  checkAuth: async () => {
    set({ isLoading: true, error: null });
    const { data: { session } } = await supabase.auth.getSession();
    if (session?.user) {
      set({ user: session.user as User, isLoading: false });
    } else {
      set({ user: null, isLoading: false });
    }
  },
  import { useUIStore } from './ui';

// ... (rest of the file)

  signUp: async (email, password) => {
    set({ isLoading: true, error: null });
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    if (error) {
      set({ error: error.message, isLoading: false });
    } else if (data.user) {
      set({ user: data.user as User, isLoading: false });
      useUIStore.getState().setToast({ message: 'Check your email for a confirmation link.', type: 'success' });
    }
  },
}));
