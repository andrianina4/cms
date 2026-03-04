import { INotificationRepository } from "../repositories/notification.repository";
import { NotificationModel } from "../models";

export class NotificationService {
    constructor(private notificationRepository: INotificationRepository) { }

    async getAllNotifications(): Promise<NotificationModel[]> {
        return this.notificationRepository.findAll();
    }
}
