import { Router } from "express";
import { ArticleController } from "../controllers/article.controller";
import { ArticleService } from "../services/article.service";
import { ArticleRepository } from "../repositories/article.repository";

const router = Router();

// Dependency Injection
const articleRepository = new ArticleRepository();
const articleService = new ArticleService(articleRepository);
const articleController = new ArticleController(articleService);

// Routes
router.get("/", articleController.getAll);
router.get("/:id", articleController.getById);
router.post("/", articleController.create);
router.put("/:id", articleController.update);
router.delete("/:id", articleController.delete);
router.patch("/:id/status", articleController.updateStatus);
router.post("/:id/notify", articleController.notify);

export default router;
