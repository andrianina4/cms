import { api } from './api';
import type { Network, ApiResponse } from '../types';

export const networksService = {
    getAll: async () => {
        const response = await api.get<ApiResponse<Network[]>>('/networks');
        return response.data.data;
    },
    getById: async (id: string) => {
        const response = await api.get<ApiResponse<Network>>(`/networks/${id}`);
        return response.data.data;
    },
    create: async (data: Omit<Network, 'id'>) => {
        const response = await api.post<ApiResponse<Network>>('/networks', data);
        return response.data.data;
    },
    update: async (id: string, data: Partial<Network>) => {
        const response = await api.put<ApiResponse<Network>>(`/networks/${id}`, data);
        return response.data.data;
    },
    delete: async (id: string) => {
        await api.delete(`/networks/${id}`);
    },
};
