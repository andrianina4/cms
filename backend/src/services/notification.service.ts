import { INotificationRepository } from "../repositories/notification.repository";
import { NotificationModel } from "../models";
import { EmailService } from "./email.service";
import { prisma } from "../lib/prisma";

export class NotificationService {
    private emailService: EmailService;

    constructor(private notificationRepository: INotificationRepository) {
        this.emailService = new EmailService();
    }

    async getAllNotifications(): Promise<NotificationModel[]> {
        return this.notificationRepository.findAll();
    }

    async createNotification(data: Omit<NotificationModel, 'id' | 'sentAt' | 'status'>): Promise<NotificationModel> {
        // 1. Create the notification record (status: pending)
        const notification = await this.notificationRepository.create(data);

        // 2. Fetch article title for the email
        const article = await prisma.article.findUnique({
            where: { id: data.articleId },
            select: { title: true }
        });

        // 3. Send the email
        const htmlContent = `
            <h2>Nouvelle publication : ${article?.title || 'Article'}</h2>
            <p>Bonjour,</p>
            <p>Un nouvel article a été publié sur le portail TARAM.</p>
            <p><strong>Sujet :</strong> ${data.subject}</p>
            <br/>
            <p>Cordialement,<br/>L'équipe TARAM</p>
        `;

        const success = await this.emailService.sendEmail(
            data.recipients,
            data.subject,
            htmlContent
        );

        // 4. Update notification status
        return this.notificationRepository.update(notification.id, {
            status: success ? 'sent' : 'failed',
            sentAt: new Date()
        });
    }
}
