import { z } from "zod";

export const articleSchema = z.object({
    title: z.string().min(3, "Le titre doit faire au moins 3 caractères"),
    content: z.string().min(10, "Le contenu doit faire au moins 10 caractères"),
    excerpt: z.string().min(5, "L'extrait doit faire au moins 5 caractères"),
    author: z.string().min(2, "L'auteur est requis"),
    networkId: z.string().min(1, "Le réseau est requis"),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
    featured: z.boolean().optional(),
    categoryIds: z.array(z.string()).optional(),
    publishedAt: z.string().datetime().optional().nullable(),
});

export const updateArticleSchema = articleSchema.partial();

export const updateStatusSchema = z.object({
    status: z.enum(["draft", "published", "archived"]),
});

export const importArticleSchema = z.object({
    title: z.string().min(1, "Le titre est requis"),
    content: z.string().optional(),
    excerpt: z.string().optional(),
    author: z.string().optional(),
    network: z.string().min(1, "Le nom du réseau (network) est requis"),
    status: z.enum(["draft", "published", "archived"]).optional(),
    featured: z.boolean().optional(),
    category: z.string().optional(),
    categories: z.union([z.string(), z.array(z.string())]).optional(),
});
export const bulkStatusSchema = z.object({
    ids: z.array(z.string()).min(1, "Au moins un ID d'article est requis"),
    status: z.enum(["draft", "published", "archived"]),
});
