import { api } from './api';
import type { ApiResponse } from '../types';

export interface ImportResult {
    success: number;
    failed: number;
    errors: string[];
}

export const importService = {
    importArticles: async (articles: any[]) => {
        const response = await api.post<ApiResponse<ImportResult>>('/import/articles', articles);
        if (!response.data || !response.data.data) throw new Error('Invalid response from server');
        return response.data.data;
    }
};
