import { Router } from "express";
import { NetworkController } from "../controllers/network.controller";
import { NetworkService } from "../services/network.service";
import { NetworkRepository } from "../repositories/network.repository";
import { validate } from "../middleware/validation.middleware";
import { networkSchema, updateNetworkSchema } from "../validations/network.validation";

const router = Router();
const networkRepository = new NetworkRepository();
const networkService = new NetworkService(networkRepository);
const networkController = new NetworkController(networkService);

router.get("/", networkController.getAll);
router.get("/:id", networkController.getById);
router.post("/", validate(networkSchema), networkController.create);
router.put("/:id", validate(updateNetworkSchema), networkController.update);
router.delete("/:id", networkController.delete);

export default router;
