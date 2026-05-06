import { Request, Response } from "express";
import { balancerService } from "../services/balancer.service.js";
import { generateRandomIP } from "../utils/traffic.util.js";

export class BalancerController {
    /**
     * Handles the traffic simulation request
     * POST /api/simulate
     */

    simulate = async(req: Request, res: Response): Promise<void> => {
        const { requestCount = 5 } = req.body;
        const results = [];

        for(let i = 0; i < requestCount; i++) {
            const ip = generateRandomIP();
            const log = balancerService.routeRequest(ip);
            results.push(log);
        }

        res.status(200).json({
            message: `Successfully simulated ${requestCount} requests`,
            data: results
        });
    }

    /**
     * Returs the current state of nodes
     * GET /api/nodes
     */

    getNodes = async(req: Request, res: Response): Promise<void> => {
        const nodes = balancerService.getNodes();
        res.status(200).json(nodes);
    }

    /**
     * Dynamically add a node
     * POST /api/nodes
     */

    addNode = async(req: Request, res: Response): Promise<void> => {
        const { nodeId } = req.body;
        if(!nodeId) {
            res.status(400).json({error: 'nodeId is required'});
            return;
        }

        balancerService.addNode(nodeId);
        res.status(201).json({
            message: `Node ${nodeId} added successfully`
        });
    }
}