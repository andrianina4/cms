export interface NotificationModel {
    id: string;
    articleId: string;
    recipients: string;
    subject: string;
    sentAt: Date;
    status: 'sent' | 'failed';
}
