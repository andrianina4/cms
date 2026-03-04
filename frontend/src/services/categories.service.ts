import { api } from './api';
import type { Category, ApiResponse } from '../types';

export const categoriesService = {
    getAll: async () => {
        const response = await api.get<ApiResponse<Category[]>>('/categories');
        return response.data.data;
    },
};
