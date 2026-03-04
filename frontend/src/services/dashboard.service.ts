import { api } from './api';
import type { ApiResponse, DashboardStats } from '../types';

class DashboardService {
    async getStats(): Promise<ApiResponse<DashboardStats>> {
        const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
        if (!response.data || !response.data.data) throw new Error('Invalid response from server');
        return response.data;
    }
}

export const dashboardService = new DashboardService();
