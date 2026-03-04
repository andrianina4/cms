import { Request, Response } from "express";
import { ImportService } from "../services/import.service";
import { sendSuccess, sendError } from "../utils/response";

export class ImportController {
    constructor(private importService: ImportService) { }

    importArticles = async (req: Request, res: Response) => {
        try {
            const articles = req.body;
            if (!Array.isArray(articles)) {
                throw new Error("Invalid format: expected an array of articles");
            }

            const results = await this.importService.importArticles(articles);
            return sendSuccess(res, results, "Import process completed");
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };
}
