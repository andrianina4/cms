import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller";

import { requireAuth } from "../middleware/auth.middleware";

const router = Router();
const dashboardController = new DashboardController();

router.get("/stats", requireAuth, dashboardController.getStats);

export default router;
