import { Router } from "express";
import { NetworkController } from "../controllers/network.controller";
import { NetworkService } from "../services/network.service";
import { NetworkRepository } from "../repositories/network.repository";

const router = Router();
const networkRepository = new NetworkRepository();
const networkService = new NetworkService(networkRepository);
const networkController = new NetworkController(networkService);

router.get("/", networkController.getAll);

export default router;
