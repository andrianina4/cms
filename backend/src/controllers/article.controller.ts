import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { ArticleStatus } from "../models";
import { sendSuccess, sendError } from "../utils/response";

export class ArticleController {
    constructor(private articleService: ArticleService) { }

    getAll = async (req: Request, res: Response) => {
        try {
            console.log("DEBUG: Controller received query:", req.query);
            const { page, limit, status, networkId, search, categoryIds, featured } = req.query;
            const categoryIdsBrackets = req.query['categoryIds[]'];
            const finalCategoryIds = categoryIds || categoryIdsBrackets;

            const pageNum = page ? parseInt(page as string) : 1;
            const limitNum = limit ? parseInt(limit as string) : 10;

            const filterParams = {
                page: pageNum,
                limit: limitNum,
                status: status as string,
                networkId: networkId as string,
                search: search as string,
                categoryIds: Array.isArray(finalCategoryIds) ? finalCategoryIds as string[] : finalCategoryIds ? [finalCategoryIds as string] : undefined,
                featured: featured === 'true' ? true : undefined
            };
            console.log("DEBUG: Final filter params sent to service:", filterParams);

            const result = await this.articleService.getAllArticles(filterParams);

            return sendSuccess(res, result.items, "Articles retrieved successfully", 200, {
                total: result.total,
                page: pageNum,
                limit: limitNum
            });
        } catch (error: any) {
            console.error("Error in ArticleController.getAll:", error);
            return sendError(res, error.message, 500);
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.getArticleById(req.params.id as string);
            return sendSuccess(res, article);
        } catch (error: any) {
            return sendError(res, error.message, 404);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.createArticle(req.body);
            return sendSuccess(res, article, "Article created successfully", 201);
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.updateArticle(req.params.id as string, req.body);
            return sendSuccess(res, article, "Article updated successfully");
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.articleService.deleteArticle(req.params.id as string);
            return sendSuccess(res, null, "Article deleted successfully", 204);
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.updateStatus(req.params.id as string, req.body.status as ArticleStatus);
            return sendSuccess(res, article, "Status updated successfully");
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    notify = async (req: Request, res: Response) => {
        try {
            const result = await this.articleService.notifyArticle(req.params.id as string);
            return sendSuccess(res, result, "Notification sent successfully");
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };
}
