import { INetworkRepository } from "../repositories/network.repository";
import { NetworkModel, CreateNetworkDTO, UpdateNetworkDTO } from "../models";

export class NetworkService {
    constructor(private networkRepository: INetworkRepository) { }

    async getAllNetworks(): Promise<NetworkModel[]> {
        return this.networkRepository.findAll();
    }

    async getNetworkById(id: string): Promise<NetworkModel> {
        const network = await this.networkRepository.findById(id);
        if (!network) throw new Error("Network not found");
        return network;
    }

    async createNetwork(data: CreateNetworkDTO): Promise<NetworkModel> {
        return this.networkRepository.create(data);
    }

    async updateNetwork(id: string, data: UpdateNetworkDTO): Promise<NetworkModel> {
        return this.networkRepository.update(id, data);
    }

    async deleteNetwork(id: string): Promise<NetworkModel> {
        return this.networkRepository.delete(id);
    }
}
