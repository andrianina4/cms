import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Start seeding...');

    // 1. Users
    const admin = await prisma.user.upsert({
        where: { email: 'admin@taram.com' },
        update: {},
        create: {
            email: 'admin@taram.com',
            password: 'admin_password_hash', // In a real app, use hashed passwords
            role: 'admin',
        },
    });

    const editor = await prisma.user.upsert({
        where: { email: 'editor@taram.com' },
        update: {},
        create: {
            email: 'editor@taram.com',
            password: 'editor_password_hash',
            role: 'editor',
        },
    });

    console.log('✅ Users created');

    // 2. Categories
    const catTech = await prisma.category.upsert({
        where: { slug: 'technology' },
        update: {},
        create: {
            name: 'Technology',
            slug: 'technology',
            description: 'Latest in tech and gadgets',
            color: '#3b82f6',
        },
    });

    const catDesign = await prisma.category.upsert({
        where: { slug: 'design' },
        update: {},
        create: {
            name: 'Design',
            slug: 'design',
            description: 'Creative and UI/UX design trends',
            color: '#ec4899',
        },
    });

    const catSociety = await prisma.category.upsert({
        where: { slug: 'society' },
        update: {},
        create: {
            name: 'Society',
            slug: 'society',
            description: 'Social and cultural analysis',
            color: '#10b981',
        },
    });

    console.log('✅ Categories created');

    // 3. Networks
    const netEurope = await prisma.network.upsert({
        where: { id: 'net-europe' },
        update: {},
        create: {
            id: 'net-europe',
            name: 'Europe Network',
            description: 'Coverage across European regions',
        },
    });

    const netGlobal = await prisma.network.upsert({
        where: { id: 'net-global' },
        update: {},
        create: {
            id: 'net-global',
            name: 'Global Network',
            description: 'Worldwide audience and contributors',
        },
    });

    console.log('✅ Networks created');

    // 4. Articles (Checking count to avoid spamming if partially ran)
    const articleCount = await prisma.article.count();
    if (articleCount === 0) {
        const articlesData = [
            {
                title: 'DeepMind introduces Antigravity AI',
                content: 'Antigravity is the latest agentic AI model designed to revolutionize coding...',
                excerpt: 'The future of agentic coding is here.',
                authorId: admin.id,
                networkId: netGlobal.id,
                status: 'published',
                featured: true,
                publishedAt: new Date(),
            },
            {
                title: 'Designing for the Modern Web',
                content: 'Modern web design focuses on responsiveness, accessibility, and high aesthetics...',
                excerpt: 'Best practices for stunning UIs.',
                authorId: editor.id,
                networkId: netEurope.id,
                status: 'published',
                featured: false,
                publishedAt: new Date(),
            },
            {
                title: 'The Rise of SQLite in Modern Backends',
                content: 'SQLite is becoming a go-to choice for many production scenarios thanks to its simplicity...',
                excerpt: 'Why SQLite is more than just a local DB.',
                authorId: admin.id,
                networkId: netGlobal.id,
                status: 'published',
                featured: false,
                publishedAt: new Date(),
            },
            {
                title: 'Workspace Organization for Developers',
                content: 'Drafting strategies to keep your digital workspace clean and efficient...',
                excerpt: 'Efficiency starts with organization.',
                authorId: editor.id,
                networkId: netEurope.id,
                status: 'draft',
                featured: false,
                publishedAt: null,
            },
            {
                title: 'Introduction to Prisma 7',
                content: 'Prisma 7 brings powerful new configuration options through prisma.config.ts...',
                excerpt: 'Mastering the latest ORM changes.',
                authorId: admin.id,
                networkId: netGlobal.id,
                status: 'archived',
                featured: false,
                publishedAt: new Date('2025-01-01'),
            },
        ];

        for (const art of articlesData) {
            await prisma.article.create({
                data: {
                    ...art,
                    categories: {
                        connect: [{ id: catTech.id }]
                    }
                }
            });
        }
        console.log('✅ Demo articles created');
    } else {
        console.log('⏭️ Articles already exist, skipping article creation');
    }

    // 5. Notifications
    const firstArticle = await prisma.article.findFirst();
    if (firstArticle) {
        const notifCount = await prisma.emailNotification.count();
        if (notifCount === 0) {
            await prisma.emailNotification.createMany({
                data: [
                    {
                        articleId: firstArticle.id,
                        recipients: 'user1@example.com,user2@example.com',
                        subject: 'New Article Published: ' + firstArticle.title,
                        status: 'sent',
                    },
                    {
                        articleId: firstArticle.id,
                        recipients: 'admin@taram.com',
                        subject: 'Draft review requested: ' + firstArticle.title,
                        status: 'sent',
                    },
                ],
            });
            console.log('✅ Sample notifications created');
        }
    }

    console.log('🌳 Seeding finished.');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
