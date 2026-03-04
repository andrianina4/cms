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
