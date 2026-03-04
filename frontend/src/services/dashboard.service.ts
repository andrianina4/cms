import { api } from './api';
import type { ApiResponse, DashboardStats } from '../types';

class DashboardService {
    async getStats(): Promise<ApiResponse<DashboardStats>> {
        const response = await api.get<ApiResponse<DashboardStats>>('/dashboard/stats');
        return response.data;
    }
}

export const dashboardService = new DashboardService();
