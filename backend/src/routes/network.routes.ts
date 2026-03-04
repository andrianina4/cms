import { Router } from "express";
import { NetworkController } from "../controllers/network.controller";
import { NetworkService } from "../services/network.service";
import { NetworkRepository } from "../repositories/network.repository";
import { validate } from "../middleware/validation.middleware";
import { networkSchema, updateNetworkSchema } from "../validations/network.validation";

import { requireAuth, requireRole } from "../middleware/auth.middleware";

const router = Router();
const networkRepository = new NetworkRepository();
const networkService = new NetworkService(networkRepository);
const networkController = new NetworkController(networkService);

/**
 * @swagger
 * components:
 *   schemas:
 *     Network:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 *         description:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   name: Networks
 *   description: Network management
 */

/**
 * @swagger
 * /api/networks:
 *   get:
 *     summary: Returns the list of all networks
 *     tags: [Networks]
 *     security:
 *       - roleAuth: []
 *     responses:
 *       200:
 *         description: List of networks
 */
router.get("/", requireAuth, networkController.getAll);

/**
 * @swagger
 * /api/networks/{id}:
 *   get:
 *     summary: Get network by id
 *     tags: [Networks]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Network details
 */
router.get("/:id", requireAuth, networkController.getById);

/**
 * @swagger
 * /api/networks:
 *   post:
 *     summary: Create a new network
 *     tags: [Networks]
 *     security:
 *       - roleAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Network'
 *     responses:
 *       201:
 *         description: Network created
 */
router.post("/", requireRole(['admin']), validate(networkSchema), networkController.create);

/**
 * @swagger
 * /api/networks/{id}:
 *   put:
 *     summary: Update network
 *     tags: [Networks]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Network'
 *     responses:
 *       200:
 *         description: Network updated
 */
router.put("/:id", requireRole(['admin']), validate(updateNetworkSchema), networkController.update);

/**
 * @swagger
 * /api/networks/{id}:
 *   delete:
 *     summary: Delete network
 *     tags: [Networks]
 *     security:
 *       - roleAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Network deleted
 */
router.delete("/:id", requireRole(['admin']), networkController.delete);

export default router;
