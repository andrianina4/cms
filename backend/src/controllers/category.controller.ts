import { Request, Response } from "express";
import { CategoryService } from "../services/category.service";
import { sendSuccess, sendError } from "../utils/response";

export class CategoryController {
    constructor(private categoryService: CategoryService) { }

    getAll = async (_req: Request, res: Response) => {
        try {
            const categories = await this.categoryService.getAllCategories();
            return sendSuccess(res, categories, "Categories retrieved successfully");
        } catch (error: any) {
            return sendError(res, error.message);
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.getCategoryById(req.params.id as string);
            return sendSuccess(res, category);
        } catch (error: any) {
            return sendError(res, error.message, 404);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.createCategory(req.body);
            return sendSuccess(res, category, "Category created successfully", 201);
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const category = await this.categoryService.updateCategory(req.params.id as string, req.body);
            return sendSuccess(res, category, "Category updated successfully");
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.categoryService.deleteCategory(req.params.id as string);
            return sendSuccess(res, null, "Category deleted successfully", 204);
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };
}
