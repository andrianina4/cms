import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";

const router = Router();
const dashboardController = new DashboardController();

// Protect this route with authentication in a real app
router.get("/stats", dashboardController.getStats);

export default router;
