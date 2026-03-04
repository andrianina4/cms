// ─── Global Types ────────────────────────────────────────────────────────────

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string;
    color: string;
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
    authorId: string;
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
    id: number;
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
