import { api } from './api';
import type { ApiResponse } from '../types';

export interface Notification {
    id: string;
    articleId: string;
    recipients: string;
    subject: string;
    sentAt: string;
    status: 'sent' | 'failed';
    article?: {
        title: string;
    };
}

export const notificationsService = {
    getAll: async () => {
        const response = await api.get<ApiResponse<Notification[]>>('/notifications');
        return response.data;
    },

    create: async (data: any) => {
        const response = await api.post<ApiResponse<Notification>>('/notifications', data);
        return response.data;
    }
};
