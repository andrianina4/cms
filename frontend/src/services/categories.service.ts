import { api } from './api';
import type { Category, ApiResponse } from '../types';

export const categoriesService = {
    getAll: async () => {
        const response = await api.get<ApiResponse<Category[]>>('/categories');
        return response.data.data;
    },
    getById: async (id: string) => {
        const response = await api.get<ApiResponse<Category>>(`/categories/${id}`);
        return response.data.data;
    },
    create: async (data: Omit<Category, 'id'>) => {
        const response = await api.post<ApiResponse<Category>>('/categories', data);
        return response.data.data;
    },
    update: async (id: string, data: Partial<Category>) => {
        const response = await api.put<ApiResponse<Category>>(`/categories/${id}`, data);
        return response.data.data;
    },
    delete: async (id: string) => {
        await api.delete(`/categories/${id}`);
    },
};
