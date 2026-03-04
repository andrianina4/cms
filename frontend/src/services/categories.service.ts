import { api } from './api';
import type { Category } from '../types';

export const categoriesService = {
    getAll: async () => {
        const response = await api.get<Category[]>('/categories');
        return response.data;
    },
};
