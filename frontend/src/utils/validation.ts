import { z } from 'zod';

// ─── Article Schema ────────────────────────────────────────────────────────
export const articleSchema = z.object({
    title: z.string().min(5, "Le titre doit faire au moins 5 caractères"),
    excerpt: z.string().optional(),
    content: z.string().min(50, "Le contenu doit faire au moins 50 caractères"),
    author: z.string().min(1, "L'auteur est requis"),
    networkId: z.string().min(1, "Veuillez sélectionner un réseau"),
    categoryIds: z.array(z.string()).min(1, "Veuillez sélectionner au moins une catégorie"),
    status: z.enum(['draft', 'published', 'archived']),
    featured: z.boolean().default(false),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

// ─── Category Schema ────────────────────────────────────────────────────────
export const categorySchema = z.object({
    name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
    description: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
