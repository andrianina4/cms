import { Router } from "express";
import { CategoryController } from "../controllers/category.controller";
import { CategoryService } from "../services/category.service";
import { CategoryRepository } from "../repositories/category.repository";
import { validate } from "../middleware/validation.middleware";
import { categorySchema, updateCategorySchema } from "../validations/category.validation";

const router = Router();
const categoryRepository = new CategoryRepository();
const categoryService = new CategoryService(categoryRepository);
const categoryController = new CategoryController(categoryService);

router.get("/", categoryController.getAll);
router.get("/:id", categoryController.getById);
router.post("/", validate(categorySchema), categoryController.create);
router.put("/:id", validate(updateCategorySchema), categoryController.update);
router.delete("/:id", categoryController.delete);

export default router;
