import { Request, Response } from "express";
import { NotificationService } from "../services/notification.service";
import { sendSuccess, sendError } from "../utils/response";

export class NotificationController {
    constructor(private notificationService: NotificationService) { }

    getAll = async (_req: Request, res: Response) => {
        try {
            const notifications = await this.notificationService.getAllNotifications();
            return sendSuccess(res, notifications, "Notifications retrieved successfully");
        } catch (error: any) {
            return sendError(res, error.message);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const notification = await this.notificationService.createNotification(req.body);
            return sendSuccess(res, notification, "Notification sent successfully", 201);
        } catch (error: any) {
            return sendError(res, error.message);
        }
    };
}
