import { IArticleRepository } from "../repositories/article.repository";
import { ArticleModel, ArticleStatus, CreateArticleDTO, UpdateArticleDTO } from "../models";

export class ArticleService {
    constructor(private articleRepository: IArticleRepository) { }

    async getAllArticles(params: {
        page?: number;
        limit?: number;
        status?: string;
        networkId?: string;
        categoryIds?: string[];
        featured?: boolean;
        search?: string;
    }): Promise<{ items: ArticleModel[]; total: number }> {
        return this.articleRepository.findAll(params);
    }

    async getArticleById(id: string): Promise<ArticleModel> {
        const article = await this.articleRepository.findById(id);
        if (!article) throw new Error("Article not found");
        return article;
    }

    async createArticle(data: CreateArticleDTO): Promise<ArticleModel> {
        return this.articleRepository.create(data);
    }

    async updateArticle(id: string, data: UpdateArticleDTO): Promise<ArticleModel> {
        return this.articleRepository.update(id, data);
    }

    async deleteArticle(id: string): Promise<ArticleModel> {
        return this.articleRepository.delete(id);
    }

    async updateStatus(id: string, status: ArticleStatus): Promise<ArticleModel> {
        return this.articleRepository.update(id, { status });
    }

    async bulkUpdateStatus(ids: string[], status: ArticleStatus): Promise<number> {
        return this.articleRepository.updateManyStatus(ids, status);
    }

    async notifyArticle(id: string) {
        const article = await this.getArticleById(id);
        // Simulation d'envoi de notification
        console.log(`📧 Notification envoyée pour l'article: ${article.title}`);
        return { message: "Notification sent successfully", articleId: id };
    }
}
