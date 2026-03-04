import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { ArticleService } from "../services/article.service";
import { ArticleRepository } from "../repositories/article.repository";
import { validate } from "../middleware/validation.middleware";
import { articleSchema, updateArticleSchema, updateStatusSchema } from "../validations/article.validation";

const router = Router();

// Dependency Injection
const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

// Routes
router.get("/", articleController.getAll);
router.get("/:id", articleController.getById);
router.post("/", validate(articleSchema), articleController.create);
router.put("/:id", validate(updateArticleSchema), articleController.update);
router.delete("/:id", articleController.delete);
router.patch("/:id/status", validate(updateStatusSchema), articleController.updateStatus);
router.post("/:id/notify", articleController.notify);

export default router;
