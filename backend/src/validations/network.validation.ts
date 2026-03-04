import { z } from "zod";

export const networkSchema = z.object({
    name: z.string().min(2, "Le nom est requis"),
    description: z.string().min(5, "La description est requise"),
});

export const updateNetworkSchema = networkSchema.partial();
