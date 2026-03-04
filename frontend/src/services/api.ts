import axios from 'axios';
import { useAuthStore } from '../store';

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const api = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// ─── Request Interceptor ─────────────────────────────────────────────────────
api.interceptors.request.use((config) => {
    // Get token and role from the Zustand store
    const { token, user } = useAuthStore.getState();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    // Requirement: Send the user's role with every request
    if (user?.role) {
        config.headers['x-user-role'] = user.role;
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

// ─── Response Interceptor ────────────────────────────────────────────────────
api.interceptors.response.use(
    (response) => response,
    (error) => {
        // Handle global errors (logout on 401, etc.)
        if (error.response?.status === 401) {
            useAuthStore.getState().logout();
        }
        return Promise.reject(error);
    }
);
