import { prisma } from "../lib/prisma";
import { CategoryModel, CreateCategoryDTO, UpdateCategoryDTO } from "../models";

export interface ICategoryRepository {
    findAll(): Promise<CategoryModel[]>;
    findById(id: string): Promise<CategoryModel | null>;
    create(data: CreateCategoryDTO): Promise<CategoryModel>;
    update(id: string, data: UpdateCategoryDTO): Promise<CategoryModel>;
    delete(id: string): Promise<CategoryModel>;
}

export class CategoryRepository implements ICategoryRepository {
    async findAll(): Promise<CategoryModel[]> {
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { articles: true }
                }
            },
            orderBy: { name: 'asc' }
        });
        return categories.map(cat => ({
            ...cat,
            articleCount: cat._count.articles
        })) as CategoryModel[];
    }

    async findById(id: string): Promise<CategoryModel | null> {
        const category = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { articles: true }
                }
            }
        });
        if (!category) return null;
        return {
            ...category,
            articleCount: category._count.articles
        } as CategoryModel;
    }

    async create(data: CreateCategoryDTO): Promise<CategoryModel> {
        const category = await prisma.category.create({
            data
        });
        return category as CategoryModel;
    }

    async update(id: string, data: UpdateCategoryDTO): Promise<CategoryModel> {
        const category = await prisma.category.update({
            where: { id },
            data
        });
        return category as CategoryModel;
    }

    async delete(id: string): Promise<CategoryModel> {
        // Check if category is used by any articles
        const categoryWithArticles = await prisma.category.findUnique({
            where: { id },
            include: {
                _count: {
                    select: { articles: true }
                }
            }
        });

        if (categoryWithArticles && categoryWithArticles._count.articles > 0) {
            throw new Error(`Impossible de supprimer cette catégorie car elle est utilisée par ${categoryWithArticles._count.articles} article(s).`);
        }

        const category = await prisma.category.delete({
            where: { id }
        });
        return category as CategoryModel;
    }
}
