import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { ArticleService } from "../services/article.service";
import { ArticleRepository } from "../repositories/article.repository";
import { validate } from "../middleware/validation.middleware";
import { articleSchema, updateArticleSchema, updateStatusSchema, bulkStatusSchema } from "../validations/article.validation";

import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();

// Dependency Injection
const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Article:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - excerpt
 *         - author
 *         - networkId
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the article
 *         title:
 *           type: string
 *         content:
 *           type: string
 *         excerpt:
 *           type: string
 *         author:
 *           type: string
 *         networkId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [draft, published, archived]
 *         featured:
 *           type: boolean
 *         categoryIds:
 *           type: array
 *           items:
 *             type: string
 *         publishedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Articles
 *   description: The articles managing API
 */

// Routes
/**
 * @swagger
 * /api/articles:
 *   get:
 *     summary: Returns the list of all the articles
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *         description: Search query
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [draft, published, archived]
 *       - in: query
 *         name: networkId
 *         schema:
 *           type: string
 *       - in: query
 *         name: categoryIds
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *       - in: query
 *         name: featured
 *         schema:
 *           type: boolean
 *     responses:
 *       200:
 *         description: The list of the articles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Article'
 */
router.get("/", requireAuth, articleController.getAll);

/**
 * @swagger
 * /api/articles/{id}:
 *   get:
 *     summary: Get the article by id
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The article id
 *     responses:
 *       200:
 *         description: The article description by id
 *         contents:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       404:
 *         description: The article was not found
 */
router.get("/:id", requireAuth, articleController.getById);

/**
 * @swagger
 * /api/articles:
 *   post:
 *     summary: Create a new article
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       201:
 *         description: The article was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Article'
 *       400:
 *         description: Validation failed
 */
router.post("/", requireAuth, validate(articleSchema), articleController.create);

/**
 * @swagger
 * /api/articles/{id}:
 *   put:
 *     summary: Update the article by id
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The article id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Article'
 *     responses:
 *       200:
 *         description: The article was updated
 *       404:
 *         description: The article was not found
 */
router.put("/:id", requireAuth, validate(updateArticleSchema), articleController.update);

/**
 * @swagger
 * /api/articles/{id}:
 *   delete:
 *     summary: Remove the article by id
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The article id
 *     responses:
 *       200:
 *         description: The article was deleted
 *       404:
 *         description: The article was not found
 */
router.delete("/:id", requireRole(['admin']), articleController.delete);

/**
 * @swagger
 * /api/articles/{id}/status:
 *   patch:
 *     summary: Update article status
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 */
router.patch("/:id/status", requireAuth, validate(updateStatusSchema), articleController.updateStatus);

/**
 * @swagger
 * /api/articles/{id}/notify:
 *   post:
 *     summary: Notify about an article
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 */
router.post("/:id/notify", requireRole(['admin']), articleController.notify);

/**
 * @swagger
 * /api/articles/bulk-status:
 *   patch:
 *     summary: Update multiple articles status
 *     tags: [Articles]
 *     security:
 *       - roleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ids
 *               - status
 *             properties:
 *               ids:
 *                 type: array
 *                 items:
 *                   type: string
 *               status:
 *                 type: string
 *                 enum: [draft, published, archived]
 *     responses:
 *       200:
 *         description: Success message with count of updated articles
 */
router.patch("/bulk-status", requireAuth, validate(bulkStatusSchema), articleController.bulkUpdateStatus);

export default router;
