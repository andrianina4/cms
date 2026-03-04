import { Request, Response } from "express";
import { DashboardService } from "../services/dashboard.service";
import { sendSuccess, sendError } from "../utils/response";

export class DashboardController {
    private dashboardService: DashboardService;

    constructor() {
        this.dashboardService = new DashboardService();
    }

    getStats = async (req: Request, res: Response): Promise<void> => {
        try {
            const stats = await this.dashboardService.getStats();
            sendSuccess(res, stats, "Dashboard stats fetched successfully");
        } catch (error) {
            console.error("Error fetching dashboard stats:", error);
            sendError(res, "Failed to fetch dashboard stats", 500);
        }
    };
}
