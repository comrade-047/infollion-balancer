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

    /**
     * Application current status
     * GET /api/health
     */

    getAppHealth = async(req: Request, res: Response): Promise<void> => {
        const summary = balancerService.getHealthSummary();

        res.status(200).json({
            app: 'Load Balancer API',
            timestamp: new Date().toISOString(),
            ...summary
        });
    }

    /**
     * Toggle Node health
     * PATCH /api/nodes/status
     */

    toggleNodeHealth = async(req: Request, res: Response): Promise<void> => {
        const { nodeId, isActive } = req.body;

        if(!nodeId || typeof isActive !== 'boolean') {
            res.status(400).json({
                error: 'nodeId and isActive are required'
            });
            return;
        }

        balancerService.toggleNodeStatus(nodeId, isActive);
        res.status(200).json({
            message: `Node ${nodeId} is now ${isActive ? 'active': 'inactive'}`
        });

    }

    /**
     * Update Node weight
     * PATCH /api/nodes/weight
     */

    updateWeight = async(req: Request, res: Response): Promise<void> => {
        const { nodeId, weight } = req.body;

        if(!nodeId || typeof weight !== 'number' || weight < 1) {
            res.status(400).json({
                error: 'nodeId and a positive weight are required'
            });
            return;
        }

        balancerService.updateNodeWeight(nodeId, weight);
        res.status(200).json({
            message: `Weight for ${nodeId} updated to ${weight}`,
            nodes: balancerService.getNodes()
        });
    }

    /**
     * Test persistence
     * GET /api/route
     */

    routeSpecificeIp = async(req: Request, res: Response): Promise<void> => {
        const { ip } = req.query;

        if(!ip || typeof ip != 'string') {
            res.status(400).json({
                error: 'A valid IP query parameter is required'
            });
            return;
        }
        const result = balancerService.routeSingleRequest(ip);
        res.status(200).json(result);
    }
}