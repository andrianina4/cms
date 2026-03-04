import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    slug: z.string().min(2, "Le slug doit faire au moins 2 caractères"),
    description: z.string().optional(),
    color: z.string().regex(/^#[0-9A-Fa-f]{6}$/, "Couleur hexadécimale invalide"),
});

export const updateCategorySchema = categorySchema.partial();
