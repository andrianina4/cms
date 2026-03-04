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
        return response.data.data;
    }
};
