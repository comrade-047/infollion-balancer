import { Router } from "express";
import { BalancerController } from "../controllers/balancer.controller.js";

const router = Router();
const controller = new BalancerController();

// app health check
router.get('/health', controller.getAppHealth);

// route to run the simulation
router.post('/simulate', controller.simulate);

// routes for node management
router.get('/nodes', controller.getNodes);
router.post('/nodes', controller.addNode);
router.patch('/nodes/status', controller.toggleNodeHealth)

export default router;;
