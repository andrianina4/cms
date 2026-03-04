import { prisma } from "../lib/prisma";
import { NotificationModel } from "../models";

export interface INotificationRepository {
    findAll(): Promise<NotificationModel[]>;
    create(data: Omit<NotificationModel, 'id' | 'sentAt' | 'status'>): Promise<NotificationModel>;
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

    async create(data: Omit<NotificationModel, 'id' | 'sentAt' | 'status'>): Promise<NotificationModel> {
        const notification = await prisma.emailNotification.create({
            data: {
                ...data,
                status: 'sent', // Default to sent for now
            },
            include: {
                article: {
                    select: {
                        title: true
                    }
                }
            }
        });
        return notification as unknown as NotificationModel;
    }
}
