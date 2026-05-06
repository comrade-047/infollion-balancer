import Hashring from 'hashring';
import { BalancerNode, RouteLog } from '../types/node.types.js';
import { identifyNode } from '../utils/traffic.util.js';

class BalancerService {
    private ring: Hashring;
    private nodes: BalancerNode[];

    constructor(initialNodeIds: string[]) {
        // initialize node objects with default weight
        this.nodes = initialNodeIds.map(id => ({ id, weight: 1, isActive: true}));

        // create the consistent hashring
        this.ring = new Hashring(initialNodeIds);
    }

    routeRequest(ip: string): RouteLog {
        const selectedNodeId = this.ring.get(ip);

        // logging the upcoming request
        identifyNode(ip, selectedNodeId);

        return {
            ip,
            node: selectedNodeId,
            timestamp: new Date().toISOString()
        };
    }

    /**
     * Bonus : dynamically adding nodes to the ring
     */

    addNode(nodeId: string): void {
        if(!this.nodes.find(n => n.id === nodeId)) {
            this.nodes.push({id: nodeId, weight: 1, isActive: true});
            this.ring.add(nodeId);
        }
    }

    /**
     * Bonus: remove nodes 
     */
    removeNode(nodeId: string): void {
        this.nodes = this.nodes.filter(n => n.id !== nodeId);
        this.ring.remove(nodeId);
    }

    /**
     * Bonus: toggle the node status
     */
    toggleNodeStatus(nodeId: string, isActive: boolean): void {
        const node = this.nodes.find(n => n.id === nodeId);
        if(!node) return;

        node.isActive = isActive;

        if(isActive) {
            this.ring.add(nodeId);
        }
        else {
            this.ring.remove(nodeId);
        }
    }

    getHealthSummary() {
        const activeNodes = this.nodes.filter(n => n.isActive).map(n => n.id);
        const inactiveNodes = this.nodes.filter(n => !n.isActive).map(n => n.id);

        return {
            status: activeNodes.length > 0 ? 'HEALTHY' : 'DEGRADED',
            totalNodes: this.nodes.length,
            activeCount: activeNodes.length,
            inactiveCount: inactiveNodes.length,
            details: {
                activeNodes,
                inactiveNodes
            }
        };
    }

    getNodes() {
        return this.nodes;
    }
}

export const balancerService = new BalancerService(["Node-A", "Node-B", "Node-C"]);