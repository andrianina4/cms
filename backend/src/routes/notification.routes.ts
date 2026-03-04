import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { NotificationService } from "../services/notification.service";
import { NotificationRepository } from "../repositories/notification.repository";
import { validate } from "../middleware/validation.middleware";
import { notificationSchema } from "../validations/notification.validation";

const router = Router();
const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

router.get("/", notificationController.getAll);
router.post("/", validate(notificationSchema), notificationController.create);


export default router;
