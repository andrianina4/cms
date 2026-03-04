import { api } from './api';
import type { Network } from '../types';

export const networksService = {
    getAll: async () => {
        const response = await api.get<Network[]>('/networks');
        return response.data;
    },
};
