import { create } from 'zustand';

interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface UIState {
  isSidebarOpen: boolean;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  notifications: Notification[];
  isLoading: boolean;
}

interface UIActions {
  toggleSidebar: () => void;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useUIStore = create<UIState & UIActions>((set) => ({
  isSidebarOpen: true,
  isModalOpen: false,
  modalContent: null,
  notifications: [],
  isLoading: false,
  toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null }),
  addNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, { ...notification, id: new Date().toISOString() }],
    })),
  removeNotification: (id) =>
    set((state) => ({ notifications: state.notifications.filter((n) => n.id !== id) })),
  setLoading: (isLoading) => set({ isLoading }),
}));
