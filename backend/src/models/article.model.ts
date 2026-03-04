import { CategoryModel } from "./category.model";
import { NetworkModel } from "./network.model";

export type ArticleStatus = 'draft' | 'published' | 'archived';

export interface ArticleModel {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    author: string;
    categories?: CategoryModel[];
    networkId: string;
    network?: NetworkModel;
    status: ArticleStatus;
    featured: boolean;
    publishedAt: Date | null;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateArticleDTO {
    title: string;
    content: string;
    excerpt: string;
    author: string;
    networkId: string;
    status?: ArticleStatus;
    featured?: boolean;
    categoryIds?: string[];
}

export interface UpdateArticleDTO {
    title?: string;
    content?: string;
    excerpt?: string;
    status?: ArticleStatus;
    featured?: boolean;
    categoryIds?: string[];
    networkId?: string;
}
