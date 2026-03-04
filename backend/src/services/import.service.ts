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
                if (!data.network) {
                    throw new Error("Le réseau (network) est requis.");
                }

                const network = await prisma.network.findFirst({
                    where: { name: data.network }
                });

                if (!network) {
                    throw new Error(`Réseau non trouvé: ${data.network}`);
                }

                if (!data.title) {
                    throw new Error("Le titre (title) est requis.");
                }

                // 2. Find Category IDs
                const categoryIds: string[] = [];
                const catArray = data.categories ? (Array.isArray(data.categories) ? data.categories : [data.categories])
                    : (data.category ? [data.category] : []);

                for (const catName of catArray) {
                    const category = await prisma.category.findFirst({
                        where: { name: catName }
                    });
                    if (category) {
                        categoryIds.push(category.id);
                    } else {
                        results.errors.push(`Catégorie non trouvée: ${catName} pour l'article: ${data.title}`);
                    }
                }

                // 3. Prepare Article DTO
                const articleDto: CreateArticleDTO = {
                    title: data.title,
                    content: data.content || "",
                    excerpt: data.excerpt || "",
                    author: data.author || "Anonyme",
                    networkId: network.id,
                    status: data.status || "draft",
                    featured: data.featured || false,
                    categoryIds: categoryIds.length > 0 ? categoryIds : undefined
                };

                // 4. Create Article
                await this.articleRepository.create(articleDto);
                results.success++;
            } catch (error: any) {
                results.failed++;
                results.errors.push(`Erreur pour "${data.title || 'Article inconnu'}": ${error.message}`);
            }
        }

        return results;
    }
}
