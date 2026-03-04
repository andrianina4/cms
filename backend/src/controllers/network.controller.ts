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

    getById = async (req: Request, res: Response) => {
        try {
            const network = await this.networkService.getNetworkById(req.params.id as string);
            return sendSuccess(res, network);
        } catch (error: any) {
            return sendError(res, error.message, 404);
        }
    };

    create = async (req: Request, res: Response) => {
        try {
            const network = await this.networkService.createNetwork(req.body);
            return sendSuccess(res, network, "Network created successfully", 201);
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    update = async (req: Request, res: Response) => {
        try {
            const network = await this.networkService.updateNetwork(req.params.id as string, req.body);
            return sendSuccess(res, network, "Network updated successfully");
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };

    delete = async (req: Request, res: Response) => {
        try {
            await this.networkService.deleteNetwork(req.params.id as string);
            return sendSuccess(res, null, "Network deleted successfully", 204);
        } catch (error: any) {
            return sendError(res, error.message, 400);
        }
    };
}
