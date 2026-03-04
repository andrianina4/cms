import { prisma } from "../lib/prisma";
import { NetworkModel } from "../models";

export interface INetworkRepository {
    findAll(): Promise<NetworkModel[]>;
}

export class NetworkRepository implements INetworkRepository {
    async findAll(): Promise<NetworkModel[]> {
        const networks = await prisma.network.findMany({
            orderBy: { name: 'asc' }
        });
        return networks as NetworkModel[];
    }
}
