import { Router } from "express";
import { BalancerController } from "../controllers/balancer.controller.js";

const router = Router();
const controller = new BalancerController();

// route to run the simulation
router.post('/simulate', controller.simulate);

// routes fro node management
router.get('/nodes', controller.getNodes);
router.post('/nodes', controller.addNode);

export default router;;
