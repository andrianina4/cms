import { prisma } from "../lib/prisma";
import { ArticleRepository } from "../repositories/article.repository";
import { CreateArticleDTO } from "../models";

export class ImportService {
    private articleRepository: ArticleRepository;

    constructor() {
        this.articleRepository = new ArticleRepository();
    }

    async importArticles(articles: any[]) {
        const results = {
            success: 0,
            failed: 0,
            errors: [] as string[]
        };

        for (const data of articles) {
            try {
                // 1. Find Network ID
                const network = await prisma.network.findFirst({
                    where: { name: data.network }
                });

                if (!network) {
                    throw new Error(`Network not found: ${data.network}`);
                }

                // 2. Find Category IDs
                const categoryIds: string[] = [];
                if (data.categories && Array.isArray(data.categories)) {
                    for (const catName of data.categories) {
                        const category = await prisma.category.findFirst({
                            where: { name: catName }
                        });
                        if (category) {
                            categoryIds.push(category.id);
                        } else {
                            results.errors.push(`Category not found: ${catName} for article: ${data.title}`);
                        }
                    }
                }

                // 3. Prepare Article DTO
                const articleDto: CreateArticleDTO = {
                    title: data.title,
                    content: data.content,
                    excerpt: data.excerpt,
                    author: data.author,
                    networkId: network.id,
                    status: data.status,
                    featured: data.featured || false,
                    categoryIds: categoryIds.length > 0 ? categoryIds : undefined
                };

                // 4. Create Article
                await this.articleRepository.create(articleDto);
                results.success++;
            } catch (error: any) {
                results.failed++;
                results.errors.push(`Failed to import "${data.title}": ${error.message}`);
            }
        }

        return results;
    }
}
