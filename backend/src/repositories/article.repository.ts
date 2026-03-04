import { Prisma } from "@prisma/client";
import { prisma } from "../lib/prisma";
import { ArticleModel, CreateArticleDTO, UpdateArticleDTO } from "../models";

export interface IArticleRepository {
    findAll(params: {
        page?: number;
        limit?: number;
        status?: string;
        network?: string;
        search?: string;
    }): Promise<{ items: ArticleModel[]; total: number }>;
    findById(id: string): Promise<ArticleModel | null>;
    create(data: CreateArticleDTO): Promise<ArticleModel>;
    update(id: string, data: UpdateArticleDTO): Promise<ArticleModel>;
    delete(id: string): Promise<ArticleModel>;
}

export class ArticleRepository implements IArticleRepository {
    private readonly include = {
        categories: true,
        network: true
    };

    async findAll(params: {
        page?: number;
        limit?: number;
        status?: string;
        network?: string;
        search?: string;
    }) {
        const { page = 1, limit = 10, status, network, search } = params;
        const skip = (page - 1) * limit;

        // On utilise un type lâche pour 'where' en cas de soucis de Namespace avec PrismaWhereInput
        const where: any = {};
        if (status) where.status = status;
        if (network) where.networkId = network;
        if (search) {
            where.OR = [
                { title: { contains: search } },
                { content: { contains: search } }
            ];
        }

        const [items, total] = await Promise.all([
            prisma.article.findMany({
                where,
                skip,
                take: limit,
                orderBy: { createdAt: 'desc' },
                include: this.include
            }),
            prisma.article.count({ where })
        ]);

        return { items: items as unknown as ArticleModel[], total };
    }

    async findById(id: string): Promise<ArticleModel | null> {
        const article = await prisma.article.findUnique({
            where: { id },
            include: this.include
        });
        return article as unknown as ArticleModel;
    }

    async create(data: CreateArticleDTO): Promise<ArticleModel> {
        const { categoryIds, ...rest } = data;

        const prismaData: any = {
            ...rest,
            categories: categoryIds ? {
                connect: categoryIds.map(id => ({ id }))
            } : undefined
        };

        const article = await prisma.article.create({
            data: prismaData,
            include: this.include
        });
        return article as unknown as ArticleModel;
    }

    async update(id: string, data: UpdateArticleDTO): Promise<ArticleModel> {
        const { categoryIds, ...rest } = data;

        const prismaData: any = {
            ...rest,
            categories: categoryIds ? {
                set: categoryIds.map(id => ({ id }))
            } : undefined
        };

        const article = await prisma.article.update({
            where: { id },
            data: prismaData,
            include: this.include
        });
        return article as unknown as ArticleModel;
    }

    async delete(id: string): Promise<ArticleModel> {
        const article = await prisma.article.delete({
            where: { id },
            include: this.include
        });
        return article as unknown as ArticleModel;
    }
}
