import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserState {
    user: { id: number; name: string; email: string; role: string } | null;
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
