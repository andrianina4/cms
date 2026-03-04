import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    user: { id: string; name: string; email: string; role: string } | null;
    token: string | null;
    setUser: (user: UserState['user'], token: string | null) => void;
    logout: () => void;
}

export const useAuthStore = create<UserState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user, token) => set({ user, token }),
            logout: () => set({ user: null, token: null }),
        }),
        {
            name: 'auth-storage',
        }
    )
);

interface UIState {
    isSidebarOpen: boolean;
    toggleSidebar: (force?: boolean) => void;
}

export const useUIStore = create<UIState>((set) => ({
    isSidebarOpen: true,
    toggleSidebar: (force) =>
        set((state) => ({ isSidebarOpen: force ?? !state.isSidebarOpen })),
}));

export interface Toast {
    id: string;
    message: string;
    type: 'success' | 'error' | 'info';
}

interface ToastState {
    toasts: Toast[];
    addToast: (message: string, type: Toast['type']) => void;
    removeToast: (id: string) => void;
}

export const useToastStore = create<ToastState>((set) => ({
    toasts: [],
    addToast: (message, type) => {
        const id = Math.random().toString(36).substring(2, 9);
        set((state) => ({
            toasts: [...state.toasts, { id, message, type }],
        }));
        setTimeout(() => {
            set((state) => ({
                toasts: state.toasts.filter((t) => t.id !== id),
            }));
        }, 5000);
    },
    removeToast: (id) =>
        set((state) => ({
            toasts: state.toasts.filter((t) => t.id !== id),
        })),
}));

