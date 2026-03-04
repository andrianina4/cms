import { Router } from "express";
import { NotificationController } from "../controllers/notification.controller";
import { NotificationService } from "../services/notification.service";
import { NotificationRepository } from "../repositories/notification.repository";
import { validate } from "../middleware/validation.middleware";
import { notificationSchema } from "../validations/notification.validation";

import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();
const notificationRepository = new NotificationRepository();
const notificationService = new NotificationService(notificationRepository);
const notificationController = new NotificationController(notificationService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Notification:
 *       type: object
 *       required:
 *         - articleId
 *         - recipients
 *         - subject
 *       properties:
 *         id:
 *           type: string
 *         articleId:
 *           type: string
 *         recipients:
 *           type: string
 *           description: Comma separated emails
 *         subject:
 *           type: string
 *         status:
 *           type: string
 *           enum: [pending, sent, failed]
 *         createdAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * tags:
 *   name: Notifications
 *   description: Notification management
 */

/**
 * @swagger
 * /api/notifications:
 *   get:
 *     summary: Returns the list of all notifications
 *     tags: [Notifications]
 *     security:
 *       - roleAuth: []
 *     responses:
 *       200:
 *         description: List of notifications
 */
router.get("/", requireAuth, notificationController.getAll);

/**
 * @swagger
 * /api/notifications:
 *   post:
 *     summary: Send a new notification
 *     tags: [Notifications]
 *     security:
 *       - roleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Notification'
 *     responses:
 *       201:
 *         description: Notification created/sent
 */
router.post("/", requireRole(['admin']), validate(notificationSchema), notificationController.create);


export default router;
