import { api } from './api';
import type { Article, PaginatedResponse } from '../types';

export const articlesService = {
    getAll: async (params?: {
        page?: number;
        limit?: number;
        search?: string;
        status?: string;
        categoryIds?: string[];
        networkId?: string;
        featured?: boolean;
    }) => {
        const response = await api.get<PaginatedResponse<Article>>('/articles', { params });
        return response.data;
    },

    getById: async (id: string) => {
        const response = await api.get<Article>(`/articles/${id}`);
        return response.data;
    },

    create: async (data: Partial<Article>) => {
        const response = await api.post<Article>('/articles', data);
        return response.data;
    },

    update: async (id: string, data: Partial<Article>) => {
        const response = await api.put<Article>(`/articles/${id}`, data);
        return response.data;
    },

    delete: async (id: string) => {
        const response = await api.delete(`/articles/${id}`);
        return response.data;
    },

    bulkUpdateStatus: async (ids: string[], status: string) => {
        const response = await api.patch('/articles/bulk-status', { ids, status });
        return response.data;
    }
};
