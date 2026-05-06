# Consistent Hashing Load Balancer

An in-memory Load Balancer built with Node.js, Express, and TypeScript using Consistent Hashing for deterministic request routing.

---

## ✨ Features

- Consistent hashing for stable IP-to-node routing
- Dynamic node addition and removal
- Weighted node routing
- Automatic fallback for inactive nodes
- Health monitoring endpoint
- Traffic simulation support
- In-memory architecture (no database required)
- Dynamic cluster node management
- Detailed node inspection API

---

## 🛠 Tech Stack

- Node.js
- TypeScript
- Express.js
- hashring
- tsx
- dotenv

---

## 📦 Installation

```bash
git clone https://github.com/comrade-047/infollion-balancer.git
cd infollion-balancer
npm install
```

Create a `.env` file:

```env
PORT=3000
```

---

## ▶️ Run the Application

### Development

```bash
npm run dev
```

### Production

```bash
npm run build
npm start
```

---

# API Endpoints

---

## 1. Simulate Traffic

### Endpoint

```http
POST /api/simulate
```

### Description

Simulates incoming traffic and routes requests to nodes using consistent hashing.

### Request Body

```json
{
  "requestCount": 10
}
```

---

## 2. Get Cluster Health

### Endpoint

```http
GET /api/health
```

### Description

Returns the overall health status of the cluster and active nodes.

---

## 3. Get All Nodes

### Endpoint

```http
GET /api/nodes
```

### Description

Retrieves a detailed list of all nodes currently in the cluster, including their weights and health status.

---

## 4. Add New Node

### Endpoint

```http
POST /api/nodes
```

### Description

Dynamically adds a new server node to the load balancer cluster.

### Request Body

```json
{
  "nodeId": "Node-D",
  "weight": 1
}
```

---

## 5. Update Node Status

### Endpoint

```http
PATCH /api/nodes/status
```

### Description

Updates the active/inactive state of a node.

### Request Body

```json
{
  "nodeId": "Node-A",
  "isActive": false
}
```

---

## 6. Update Node Weight

### Endpoint

```http
PATCH /api/nodes/weight
```

### Description

Updates the routing weight of a node dynamically.

### Request Body

```json
{
  "nodeId": "Node-A",
  "weight": 10
}
```

---

## 7. Test Persistent Routing

### Endpoint

```http
GET /api/route?ip=1.2.3.4
```

### Description

Routes a specific IP address to a deterministic node using consistent hashing.

---

# 📂 Project Structure

```text
src/
├── controllers/
├── routes/
├── services/
├── types/
├── utils/
├── app.ts
└── index.ts
```

---

# ⚙️ How Consistent Hashing Works

Consistent hashing distributes requests across nodes in a way that minimizes remapping when nodes are added or removed.

### Benefits

- Stable request routing
- Minimal redistribution of keys
- Efficient scaling
- Fault tolerance
- Better cache consistency

---

# 📝 Notes

- All data is stored in memory
- No external database required
- Nodes can be dynamically added or updated at runtime
- Requests are logged in the format:

```text
Incoming IP: [IP] Routed to: [Node]
```


# 👨‍💻 Author

Developed by [comrade-047](https://github.com/comrade-047)
