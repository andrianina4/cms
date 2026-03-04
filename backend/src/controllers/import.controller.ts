import { Request, Response } from "express";
import { ImportService } from "../services/import.service";
import { sendSuccess, sendError } from "../utils/response";

export class ImportController {
    constructor(private importService: ImportService) { }

    importArticles = async (req: Request, res: Response) => {
        try {
            console.log(`\n[API CALL] POST /api/import/articles - Réception de ${req.body?.length || 0} article(s)`);
            const articles = req.body;
            if (!Array.isArray(articles)) {
                throw new Error("Format invalide: un tableau d'articles est attendu.");
            }

            const results = await this.importService.importArticles(articles);
            console.log(`[API CALL] Importation terminée - Succès: ${results.success}, Échecs: ${results.failed}`);
            return sendSuccess(res, results, "Processus d'importation terminé");
        } catch (error: any) {
            console.error("[API ERROR] Erreur critique lors de l'import:", error);
            return sendError(res, error.message, 500);
        }
    };
}
