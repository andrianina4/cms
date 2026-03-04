import { z } from 'zod';

// ─── Article Schema ────────────────────────────────────────────────────────
export const articleSchema = z.object({
    title: z.string().min(3, 'Le titre doit faire au moins 3 caractères').max(100),
    content: z.string().min(10, 'Le contenu doit faire au moins 10 caractères'),
    categoryId: z.number().int().positive(),
});

export type ArticleFormData = z.infer<typeof articleSchema>;

// ─── Category Schema ────────────────────────────────────────────────────────
export const categorySchema = z.object({
    name: z.string().min(2, 'Le nom doit faire au moins 2 caractères'),
    description: z.string().optional(),
});

export type CategoryFormData = z.infer<typeof categorySchema>;
