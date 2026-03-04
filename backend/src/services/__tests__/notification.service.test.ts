import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NotificationService } from '../notification.service';
import { INotificationRepository } from '../../repositories/notification.repository';
import { prisma } from '../../lib/prisma';
import { EmailService } from '../email.service';

// Mock Modules
vi.mock('../../lib/prisma', () => ({
    prisma: {
        article: {
            findUnique: vi.fn(),
        },
    },
}));

vi.mock('../email.service');

describe('NotificationService', () => {
    let notificationService: NotificationService;
    let mockNotificationRepository: INotificationRepository;

    beforeEach(() => {
        vi.clearAllMocks();

        mockNotificationRepository = {
            findAll: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
        } as unknown as INotificationRepository;

        notificationService = new NotificationService(mockNotificationRepository);
    });

    describe('createNotification', () => {
        it('should create record, find article, send email and update status', async () => {
            const mockData = {
                articleId: 'art-1',
                recipients: 'test@example.com',
                subject: 'Hello',
            };

            const mockNotification = { id: 'notif-1', ...mockData, status: 'pending' };
            vi.mocked(mockNotificationRepository.create).mockResolvedValue(mockNotification as any);
            vi.mocked(prisma.article.findUnique).mockResolvedValue({ title: 'Test Article' } as any);

            // Spy on EmailService.prototype.sendEmail manually since it's a class
            const sendEmailSpy = vi.spyOn(EmailService.prototype, 'sendEmail').mockResolvedValue(true);

            vi.mocked(mockNotificationRepository.update).mockResolvedValue({
                ...mockNotification,
                status: 'sent'
            } as any);

            const result = await notificationService.createNotification(mockData);

            expect(result.status).toBe('sent');
            expect(mockNotificationRepository.create).toHaveBeenCalledWith(mockData);
        });
    });
});
