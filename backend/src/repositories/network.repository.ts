import { prisma } from "../lib/prisma";
import { NetworkModel, CreateNetworkDTO, UpdateNetworkDTO } from "../models";

export interface INetworkRepository {
    findAll(): Promise<NetworkModel[]>;
    findById(id: string): Promise<NetworkModel | null>;
    create(data: CreateNetworkDTO): Promise<NetworkModel>;
    update(id: string, data: UpdateNetworkDTO): Promise<NetworkModel>;
    delete(id: string): Promise<NetworkModel>;
}

export class NetworkRepository implements INetworkRepository {
    async findAll(): Promise<NetworkModel[]> {
        const networks = await prisma.network.findMany({
            orderBy: { name: 'asc' }
        });
        return networks as NetworkModel[];
    }

    async findById(id: string): Promise<NetworkModel | null> {
        const network = await prisma.network.findUnique({
            where: { id }
        });
        return network as NetworkModel | null;
    }

    async create(data: CreateNetworkDTO): Promise<NetworkModel> {
        const network = await prisma.network.create({
            data
        });
        return network as NetworkModel;
    }

    async update(id: string, data: UpdateNetworkDTO): Promise<NetworkModel> {
        const network = await prisma.network.update({
            where: { id },
            data
        });
        return network as NetworkModel;
    }

    async delete(id: string): Promise<NetworkModel> {
        const network = await prisma.network.delete({
            where: { id }
        });
        return network as NetworkModel;
    }
}
