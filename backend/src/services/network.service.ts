import { INetworkRepository } from "../repositories/network.repository";
import { NetworkModel } from "../models";

export class NetworkService {
    constructor(private networkRepository: INetworkRepository) { }

    async getAllNetworks(): Promise<NetworkModel[]> {
        return this.networkRepository.findAll();
    }
}
