import { Request, Response } from "express";
import { NetworkService } from "../services/network.service";
import { sendSuccess, sendError } from "../utils/response";

export class NetworkController {
    constructor(private networkService: NetworkService) { }

    getAll = async (_req: Request, res: Response) => {
        try {
            const networks = await this.networkService.getAllNetworks();
            return sendSuccess(res, networks, "Networks retrieved successfully");
        } catch (error: any) {
            return sendError(res, error.message);
        }
    };
}
