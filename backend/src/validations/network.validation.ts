import { z } from "zod";

export const networkSchema = z.object({
    name: z.string().min(2, "Le nom doit faire au moins 2 caractères"),
    description: z.string().min(2, "La description doit faire au moins 2 caractères"),
});

export const updateNetworkSchema = networkSchema.partial();
