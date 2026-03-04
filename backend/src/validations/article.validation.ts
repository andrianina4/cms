import { z } from "zod";

export const articleSchema = z.object({
    title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
    content: z.string().min(50, "Le contenu doit faire au moins 50 caractères"),
    excerpt: z.string().optional(),
    author: z.string().min(1, "L'auteur est requis"),
    networkId: z.string().min(1, "Veuillez sélectionner un réseau"),
    status: z.enum(["draft", "published", "archived"]).default("draft"),
    featured: z.boolean().optional(),
    categoryIds: z.array(z.string()).min(1, "Veuillez sélectionner au moins une catégorie"),
    publishedAt: z.string().datetime().optional().nullable(),
});

export const updateArticleSchema = articleSchema.partial();

export const updateStatusSchema = z.object({
    status: z.enum(["draft", "published", "archived"], {
        message: "Statut invalide (doit être draft, published ou archived)"
    }),
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
