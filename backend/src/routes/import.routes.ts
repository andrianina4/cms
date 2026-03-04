import { Router } from "express";
import { ImportController } from "../controllers/import.controller";
import { ImportService } from "../services/import.service";

const router = Router();
const importService = new ImportService();
const importController = new ImportController(importService);

router.post("/articles", importController.importArticles);

export default router;
