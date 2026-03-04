// ─── Global Types ────────────────────────────────────────────────────────────

export interface Article {
    id: number;
    title: string;
    content: string;
    categoryId: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Category {
    id: number;
    name: string;
    description?: string;
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
