import { Request, Response } from "express";
import { ArticleService } from "../services/article.service";
import { ArticleStatus } from "../models";

export class ArticleController {
    constructor(private articleService: ArticleService) { }

    getAll = async (req: Request, res: Response) => {
        try {
            const { page, limit, status, network, search } = req.query;
            const articles = await this.articleService.getAllArticles({
                page: page ? parseInt(page as string) : undefined,
                limit: limit ? parseInt(limit as string) : undefined,
                status: status as string,
                network: network as string,
                search: search as string,
            });
            res.json(articles);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    };

    getById = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.getArticleById(req.params.id as string);
            res.json(article);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.createArticle(req.body);
            res.status(201).json(article);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.updateArticle(req.params.id as string, req.body);
            res.json(article);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.articleService.deleteArticle(req.params.id as string);
            res.status(204).send();
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    updateStatus = async (req: Request, res: Response) => {
        try {
            const article = await this.articleService.updateStatus(req.params.id as string, req.body.status as ArticleStatus);
            res.json(article);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };

    notify = async (req: Request, res: Response) => {
        try {
            const result = await this.articleService.notifyArticle(req.params.id as string);
            res.json(result);
        } catch (error: any) {
            res.status(400).json({ error: error.message });
        }
    };
}
