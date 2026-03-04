import { z } from "zod";

export const notificationSchema = z.object({
    articleId: z.string().min(1, "Veuillez sélectionner un article"),
    recipients: z.string().min(1, "Veuillez saisir au moins un destinataire"),
    subject: z.string().min(5, "Le sujet doit faire au moins 5 caractères"),
});
