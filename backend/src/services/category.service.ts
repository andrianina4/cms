import { ICategoryRepository } from "../repositories/category.repository";
import { CategoryModel, CreateCategoryDTO, UpdateCategoryDTO } from "../models";

export class CategoryService {
    constructor(private categoryRepository: ICategoryRepository) { }

    async getAllCategories(): Promise<CategoryModel[]> {
        return this.categoryRepository.findAll();
    }

    async getCategoryById(id: string): Promise<CategoryModel> {
        const category = await this.categoryRepository.findById(id);
        if (!category) throw new Error("Category not found");
        return category;
    }

    async createCategory(data: CreateCategoryDTO): Promise<CategoryModel> {
        return this.categoryRepository.create(data);
    }

    async updateCategory(id: string, data: UpdateCategoryDTO): Promise<CategoryModel> {
        return this.categoryRepository.update(id, data);
    }

    async deleteCategory(id: string): Promise<CategoryModel> {
        return this.categoryRepository.delete(id);
    }
}
