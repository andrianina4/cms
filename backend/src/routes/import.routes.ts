import { Router } from "express";
import { ImportController } from "../controllers/import.controller";
import { ImportService } from "../services/import.service";
import { validateArray } from "../middleware/validation.middleware";
import { importArticleSchema } from "../validations/article.validation";

import { requireRole } from "../middleware/auth.middleware";

const router = Router();
const importService = new ImportService();
const importController = new ImportController(importService);

/**
 * @swagger
 * tags:
 *   name: Import
 *   description: Bulk data import
 */

/**
 * @swagger
 * /api/import/articles:
 *   post:
 *     summary: Import articles in bulk
 *     tags: [Import]
 *     security:
 *       - roleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: Import results
 */
router.post("/articles", requireRole(['admin']), validateArray(importArticleSchema), importController.importArticles);

export default router;
