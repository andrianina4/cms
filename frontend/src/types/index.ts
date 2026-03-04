// ─── Global Types ────────────────────────────────────────────────────────────

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color: string;
    articleCount?: number;
}

export interface Network {
    id: string;
    name: string;
    description: string;
}

export interface Article {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    status: ArticleStatus;
    featured: boolean;
    categories: Category[];
    networkId: string;
    network: Network;
    author: string;
    createdAt: string;
    updatedAt: string;
}

export interface Notification {
    id: number;
    message: string;
    read: boolean;
    createdAt: string;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: 'admin' | 'editor' | 'viewer';
}

export interface ApiResponse<T> {
    data: T;
    message: string;
    success: boolean;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
    total: number;
    page: number;
    limit: number;
}

export interface DashboardStats {
    kpis: {
        totalArticles: number;
        publishedArticles: number;
        publishedPercentage: number;
        draftArticles: number;
        totalNotifications: number;
    };
    articlesByCategory: {
        name: string;
        count: number;
        color: string;
    }[];
    articlesByNetwork: {
        name: string;
        count: number;
    }[];
    recentArticles: {
        id: string;
        title: string;
        status: string;
        network: string;
        date: string;
    }[];
    recentNotifications: {
        id: string;
        subject: string;
        status: string;
        articleTitle: string;
        date: string;
        recipientsCount: number;
    }[];
}
