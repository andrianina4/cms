import { z } from "zod";

export const categorySchema = z.object({
    name: z.string().min(2, "Le nom est requis"),
    slug: z.string().min(2, "Le slug est requis"),
    description: z.string().min(5, "La description est requise"),
    color: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Couleur invalide"),
});

export const updateCategorySchema = categorySchema.partial();
