import { z } from "zod";

export const notificationSchema = z.object({
    articleId: z.string().min(1, "L'ID de l'article est requis"),
    recipients: z.string().min(1, "Au moins un destinataire est requis"),
    subject: z.string().min(5, "Le sujet est requis"),
});
