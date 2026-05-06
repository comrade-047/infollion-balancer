export interface BalancerNode {
    id: string;
    weight: number;
    isActive: boolean;
}

export interface RouteLog {
    ip: string;
    node: string;
    timestamp: string;
}