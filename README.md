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

## Run the Application

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

## API Endpoints

### 1. Simulate Traffic

```http
POST /api/simulate
```

Request Body:

```json
{
  "requestCount": 10
}
```

---

### 2. Get Cluster Health

```http
GET /api/health
```

---

### 3. Update Node Status

```http
PATCH /api/nodes/status
```

Request Body:

```json
{
  "nodeId": "Node-A",
  "isActive": false
}
```

---

### 4. Update Node Weight

```http
PATCH /api/nodes/weight
```

Request Body:

```json
{
  "nodeId": "Node-A",
  "weight": 10
}
```

---

### 5. Test Persistent Routing

```http
GET /api/route?ip=1.2.3.4
```

---

## 📂 Project Structure

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

## 📝 Notes

- All data is stored in memory
- No external database required
- Requests are logged in the format:

```text
Incoming IP: [IP] Routed to: [Node]
```