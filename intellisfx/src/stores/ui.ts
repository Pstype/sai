import { create } from 'zustand';

interface UIState {
  toast: {
    message: string;
    type: 'success' | 'error' | 'info';
  } | null;
}

interface UIActions {
  setToast: (toast: UIState['toast']) => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  toast: null,
  setToast: (toast) => set({ toast }),
}));