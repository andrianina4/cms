export interface CategoryModel {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
}

export interface CreateCategoryDTO {
    name: string;
    slug: string;
    description: string;
    color: string;
}

export interface UpdateCategoryDTO {
    name?: string;
    slug?: string;
    description?: string;
    color?: string;
}
