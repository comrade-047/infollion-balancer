/**
 * Generates a random IP address
 */

export const generateRandomIP = (): string => {
    return Array.from({ length: 4 }, () => Math.floor(Math.random() * 256)).join(".");
};

/**
 * Logs the routing decision to the console
 */

export const identifyNode = (ip: string, selectedNode: string): void => {
    console.log(`Incoming IP: ${ip} Routed to: ${selectedNode}`);
}