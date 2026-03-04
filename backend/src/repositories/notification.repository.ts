import { prisma } from "../lib/prisma";
import { NotificationModel } from "../models";

export interface INotificationRepository {
    findAll(): Promise<NotificationModel[]>;
}

export class NotificationRepository implements INotificationRepository {
    async findAll(): Promise<NotificationModel[]> {
        const notifications = await prisma.emailNotification.findMany({
            orderBy: { sentAt: 'desc' },
            include: {
                article: {
                    select: {
                        title: true
                    }
                }
            }
        });
        return notifications as unknown as NotificationModel[];
    }
}
