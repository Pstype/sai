import { create } from 'zustand';

interface UIState {
  isUploaderVisible: boolean;
  toggleUploader: () => void;
}

export const useUIStore = create<UIState>((set) => ({
  isUploaderVisible: true,
  toggleUploader: () =>
    set((state) => ({ isUploaderVisible: !state.isUploaderVisible })),
}));
