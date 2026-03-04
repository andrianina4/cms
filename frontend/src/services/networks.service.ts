import { api } from './api';
import type { Network, ApiResponse } from '../types';

export const networksService = {
    getAll: async () => {
        const response = await api.get<ApiResponse<Network[]>>('/networks');
        return response.data.data;
    },
};
