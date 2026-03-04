import { Router } from "express";
import { ImportController } from "../controllers/import.controller";
import { ImportService } from "../services/import.service";
import { validateArray } from "../middleware/validation.middleware";
import { articleSchema } from "../validations/article.validation";

const router = Router();
const importService = new ImportService();
const importController = new ImportController(importService);

router.post("/articles", validateArray(articleSchema), importController.importArticles);

export default router;
