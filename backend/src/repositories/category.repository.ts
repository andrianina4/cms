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
            orderBy: { name: 'asc' }
        });
        return categories as CategoryModel[];
    }

    async findById(id: string): Promise<CategoryModel | null> {
        const category = await prisma.category.findUnique({
            where: { id }
        });
        return category as CategoryModel | null;
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
        const category = await prisma.category.delete({
            where: { id }
        });
        return category as CategoryModel;
    }
}
