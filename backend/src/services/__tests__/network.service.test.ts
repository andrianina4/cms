import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NetworkService } from '../network.service';
import { INetworkRepository } from '../../repositories/network.repository';
import { NetworkModel } from '../../models';

describe('NetworkService', () => {
    let networkService: NetworkService;
    let mockNetworkRepository: INetworkRepository;

    const mockNetwork: NetworkModel = {
        id: 'net-1',
        name: 'Global',
        description: 'Global desc',
    };

    beforeEach(() => {
        mockNetworkRepository = {
            findAll: vi.fn(),
            findById: vi.fn(),
            create: vi.fn(),
            update: vi.fn(),
            delete: vi.fn(),
        } as unknown as INetworkRepository;

        networkService = new NetworkService(mockNetworkRepository);
    });

    describe('getAllNetworks', () => {
        it('should return all networks', async () => {
            vi.mocked(mockNetworkRepository.findAll).mockResolvedValue([mockNetwork]);
            const result = await networkService.getAllNetworks();
            expect(result).toEqual([mockNetwork]);
        });
    });

    describe('deleteNetwork', () => {
        it('should delete network if it exists', async () => {
            vi.mocked(mockNetworkRepository.findById).mockResolvedValue(mockNetwork);
            vi.mocked(mockNetworkRepository.delete).mockResolvedValue(mockNetwork);
            const result = await networkService.deleteNetwork('net-1');
            expect(result).toEqual(mockNetwork);
            expect(mockNetworkRepository.delete).toHaveBeenCalledWith('net-1');
        });
    });

    describe('createNetwork', () => {
        it('should call repository.create', async () => {
            vi.mocked(mockNetworkRepository.create).mockResolvedValue(mockNetwork);
            const result = await networkService.createNetwork({ name: 'New' } as any);
            expect(result).toEqual(mockNetwork);
        });
    });

    describe('updateNetwork', () => {
        it('should call repository.update', async () => {
            vi.mocked(mockNetworkRepository.update).mockResolvedValue(mockNetwork);
            const result = await networkService.updateNetwork('net-1', { name: 'Edit' });
            expect(result).toEqual(mockNetwork);
        });
    });
});
