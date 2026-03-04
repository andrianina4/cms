import { prisma } from "../lib/prisma";

export class DashboardService {
    async getStats() {
        // Top KPI Cards
        const totalArticles = await prisma.article.count();
        const publishedArticles = await prisma.article.count({ where: { status: 'published' } });
        const draftArticles = await prisma.article.count({ where: { status: 'draft' } });

        // Let's assume notifications for now is just total sent
        const totalNotifications = await prisma.emailNotification.count();

        // Articles by Category
        const categories = await prisma.category.findMany({
            include: {
                _count: {
                    select: { articles: true }
                }
            }
        });
        const articlesByCategory = categories.map((cat: any) => ({
            name: cat.name,
            count: cat._count.articles,
            color: cat.color
        })).sort((a: any, b: any) => b.count - a.count); // desc by count

        // Articles by Network
        const networks = await prisma.network.findMany({
            include: {
                _count: {
                    select: { articles: true }
                }
            }
        });
        const articlesByNetwork = networks.map((net: any) => ({
            name: net.name,
            count: net._count.articles
        })).sort((a: any, b: any) => b.count - a.count);

        // Recent Articles (Last 5)
        const recentArticles = await prisma.article.findMany({
            take: 5,
            orderBy: { createdAt: 'desc' },
            include: {
                network: { select: { name: true } }
            }
        });

        // Recent Notifications (Last 5)
        const recentNotifications = await prisma.emailNotification.findMany({
            take: 5,
            orderBy: { sentAt: 'desc' },
            include: {
                article: { select: { title: true } }
            }
        });

        return {
            kpis: {
                totalArticles,
                publishedArticles,
                publishedPercentage: totalArticles > 0 ? Math.round((publishedArticles / totalArticles) * 100) : 0,
                draftArticles,
                totalNotifications
            },
            articlesByCategory,
            articlesByNetwork,
            recentArticles: recentArticles.map((a: any) => ({
                id: a.id,
                title: a.title,
                status: a.status,
                network: a.network?.name || 'Inconnu',
                date: a.publishedAt || a.createdAt
            })),
            recentNotifications: recentNotifications.map((n: any) => ({
                id: n.id,
                subject: n.subject,
                status: n.status,
                articleTitle: n.article?.title || 'Article supprimé',
                date: n.sentAt,
                recipientsCount: n.recipients ? n.recipients.split(',').length : 0
            }))
        };
    }
}
