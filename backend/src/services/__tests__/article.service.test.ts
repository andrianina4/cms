import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ArticleService } from '../article.service';
import { IArticleRepository } from '../../repositories/article.repository';
import { ArticleModel } from '../../models';

describe('ArticleService', () => {
    let articleService: ArticleService;
    let mockArticleRepository: IArticleRepository;

    const mockArticle: ArticleModel = {
        id: '1',
        title: 'Test Article',
        excerpt: 'Test excerpt',
        content: 'Test content',
        status: 'published',
        author: 'Test Author',
        networkId: 'net-1',
        featured: false,
        publishedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        categories: []
    };

    beforeEach(() => {
        mockArticleRepository = {
            findAll: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
            updateManyStatus: vi.fn(),
        } as unknown as IArticleRepository;

        articleService = new ArticleService(mockArticleRepository);
    });

    describe('getAllArticles', () => {
        it('should return articles from repository', async () => {
            const mockResult = { items: [mockArticle], total: 1 };
            vi.mocked(mockArticleRepository.findAll).mockResolvedValue(mockResult);

            const result = await articleService.getAllArticles({});

            expect(result).toEqual(mockResult);
        });
    });

    describe('getArticleById', () => {
        it('should return an article if it exists', async () => {
            vi.mocked(mockArticleRepository.findById).mockResolvedValue(mockArticle);

            const result = await articleService.getArticleById('1');

            expect(result).toEqual(mockArticle);
        });

        it('should throw an error if article does not exist', async () => {
            vi.mocked(mockArticleRepository.findById).mockResolvedValue(null);

            await expect(articleService.getArticleById('unknown'))
                .rejects.toThrow('Article not found');
        });
    });

    describe('createArticle', () => {
        it('should call repository.create and return new article', async () => {
            const createDto = {
                title: 'New',
                excerpt: '...',
                content: '...',
                author: '...',
                networkId: '...',
            };
            vi.mocked(mockArticleRepository.create).mockResolvedValue(mockArticle);

            const result = await articleService.createArticle(createDto as any);

            expect(result).toEqual(mockArticle);
        });
    });
});
