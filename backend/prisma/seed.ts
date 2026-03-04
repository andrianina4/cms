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
                content: 'Antigravity is the latest agentic AI model designed to revolutionize coding by providing a powerful, autonomous assistant that can handle complex tasks with ease. It integrates seamlessly into existing workflows and offers unprecedented productivity gains.',
                excerpt: 'The future of agentic coding is here with Antigravity AI.',
                author: admin.email,
                networkId: netGlobal.id,
                status: 'published',
                featured: true,
                publishedAt: new Date(),
            },
            {
                title: 'Designing for the Modern Web',
                content: 'Modern web design focuses on responsiveness, accessibility, and high aesthetics. Using curated color palettes, typography like Inter or Roboto, and smooth animations creates a premium user experience that wows visitors from the first glance.',
                excerpt: 'Best practices for stunning UIs in 2026.',
                author: editor.email,
                networkId: netEurope.id,
                status: 'published',
                featured: false,
                publishedAt: new Date(),
            },
            {
                title: 'The Rise of SQLite in Modern Backends',
                content: 'SQLite is becoming a go-to choice for many production scenarios thanks to its simplicity, zero-configuration nature, and incredible performance for read-heavy workloads. With tools like Prisma, using SQLite has never been easier.',
                excerpt: 'Why SQLite is more than just a local database.',
                author: admin.email,
                networkId: netGlobal.id,
                status: 'published',
                featured: false,
                publishedAt: new Date(),
            },
            {
                title: 'Workspace Organization for Developers',
                content: 'Efficient coding starts with a well-organized digital workspace. Drafting strategies to keep your editor layouts, terminal tabs, and file structures clean can significantly reduce cognitive load and improve focus.',
                excerpt: 'Efficiency starts with daily digital organization.',
                author: editor.email,
                networkId: netEurope.id,
                status: 'draft',
                featured: false,
                publishedAt: null,
            },
            {
                title: 'Introduction to Prisma 7',
                content: 'Prisma 7 brings powerful new configuration options through prisma.config.ts, making database management even more intuitive. Learn how to leverage the new features to speed up your development cycle.',
                excerpt: 'Mastering the latest ORM changes in Prisma 7.',
                author: admin.email,
                networkId: netGlobal.id,
                status: 'archived',
                featured: false,
                publishedAt: new Date('2025-01-01'),
            },
            {
                title: 'The Evolution of React Server Components',
                content: 'React Server Components have changed the way we think about data fetching and component rendering. By moving logic to the server, we can reduce bundle sizes and improve performance for end-users.',
                excerpt: 'Understanding RSCs and their impact on web architecture.',
                author: admin.email,
                networkId: netGlobal.id,
                status: 'published',
                featured: true,
                publishedAt: new Date(),
            },
            {
                title: 'Cybersecurity Best Practices for 2026',
                content: 'In an increasingly digital world, staying secure is paramount. This article covers the latest trends in threat mitigation, multi-factor authentication, and safe coding practices to protect user data.',
                excerpt: 'Protecting your application from modern cyber threats.',
                author: editor.email,
                networkId: netGlobal.id,
                status: 'published',
                featured: false,
                publishedAt: new Date(),
            },
            {
                title: 'Healthy Coding Habits',
                content: 'Developing long-term success as a software engineer requires more than just technical skills. Maintaining physical and mental health through ergonomic setups, regular breaks, and mindful working is crucial.',
                excerpt: 'Practical advice for a sustainable career in tech.',
                author: editor.email,
                networkId: netEurope.id,
                status: 'published',
                featured: false,
                publishedAt: new Date(),
            },
            {
                title: 'Scaling Node.js Applications',
                content: 'When your user base grows, your infrastructure must adapt. We explore horizontal scaling, clustering, and load balancing techniques to keep your Node.js backend fast and reliable under pressure.',
                excerpt: 'Techniques for building high-concurrency systems.',
                author: admin.email,
                networkId: netGlobal.id,
                status: 'draft',
                featured: false,
                publishedAt: null,
            },
            {
                title: 'AI-Driven Development Flow',
                content: 'Integrating AI tools into your daily coding routine can boost productivity by handling boilerplate and providing instant documentation. Learn how to use these agents effectively as pair programmers.',
                excerpt: 'Leveraging AI agents in your development workflow.',
                author: admin.email,
                networkId: netGlobal.id,
                status: 'published',
                featured: false,
                publishedAt: new Date(),
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
                    {
                        articleId: firstArticle.id,
                        recipients: 'marketing@taram.com',
                        subject: 'Promotion ready: ' + firstArticle.title,
                        status: 'failed',
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
