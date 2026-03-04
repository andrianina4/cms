import { describe, it, expect, vi, beforeEach } from 'vitest';
import { CategoryService } from '../category.service';
import { ICategoryRepository } from '../../repositories/category.repository';
import { CategoryModel } from '../../models';

describe('CategoryService', () => {
    let categoryService: CategoryService;
    let mockCategoryRepository: ICategoryRepository;

    const mockCategory: CategoryModel = {
        id: 'cat-1',
        name: 'Tech',
        slug: 'tech',
        description: 'Tech desc',
        color: '#000000',
    };

    beforeEach(() => {
        mockCategoryRepository = {
            findAll: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        } as unknown as ICategoryRepository;

        categoryService = new CategoryService(mockCategoryRepository);
    });

    describe('getAllCategories', () => {
        it('should return all categories', async () => {
            vi.mocked(mockCategoryRepository.findAll).mockResolvedValue([mockCategory]);
            const result = await categoryService.getAllCategories();
            expect(result).toEqual([mockCategory]);
        });
    });

    describe('getCategoryById', () => {
        it('should return category if exists', async () => {
            vi.mocked(mockCategoryRepository.findById).mockResolvedValue(mockCategory);
            const result = await categoryService.getCategoryById('cat-1');
            expect(result).toEqual(mockCategory);
        });

        it('should throw error if not found', async () => {
            vi.mocked(mockCategoryRepository.findById).mockResolvedValue(null);
            await expect(categoryService.getCategoryById('none')).rejects.toThrow('Category not found');
        });
    });

    describe('createCategory', () => {
        it('should call repository.create', async () => {
            const dto = { name: 'New', color: '#fff' };
            vi.mocked(mockCategoryRepository.create).mockResolvedValue(mockCategory);
            const result = await categoryService.createCategory(dto as any);
            expect(result).toEqual(mockCategory);
        });
    });

    describe('updateCategory', () => {
        it('should call repository.update', async () => {
            vi.mocked(mockCategoryRepository.update).mockResolvedValue(mockCategory);
            const result = await categoryService.updateCategory('cat-1', { name: 'Edit' });
            expect(result).toEqual(mockCategory);
        });
    });

    describe('deleteCategory', () => {
        it('should call repository.delete', async () => {
            vi.mocked(mockCategoryRepository.delete).mockResolvedValue(mockCategory);
            const result = await categoryService.deleteCategory('cat-1');
            expect(result).toEqual(mockCategory);
        });
    });
});
