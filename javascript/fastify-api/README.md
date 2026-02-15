# Fastify API Demo

A high-performance REST API built with Fastify that demonstrates CRUD operations with **Cluster Mode enabled for multi-core CPU utilization**.

## Features

- ✅ Full CRUD operations (GET, POST, PATCH, DELETE)
- ✅ **Cluster Mode** - Automatically spawns worker processes for each CPU core
- ✅ Automatic worker restart on crash
- ✅ Load balancing across worker processes
- ✅ Built-in request logging
- ✅ High-performance async handling
- ✅ Health check endpoint with process info

## Cluster Mode

This server automatically runs in **cluster mode**, which:
- Forks one worker process per available CPU core
- Distributes incoming requests across all workers
- Automatically restarts crashed workers
- Leverages Fastify's high-performance HTTP handling
- Provides excellent throughput and low latency

### How It Works

1. **Master Process** - Manages worker processes and handles restarts
2. **Worker Processes** - Each worker runs a Fastify server instance
3. **Load Balancing** - Node.js automatically distributes requests

Example output (on a 4-core system):
```
Master Process ID: 1234
CPU Cores Available: 4

Master 1234 starting worker processes...
Fastify API Worker 1235 running on http://localhost:3002
Fastify API Worker 1236 running on http://localhost:3002
Fastify API Worker 1237 running on http://localhost:3002
Fastify API Worker 1238 running on http://localhost:3002
```

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get a specific item |
| POST | `/api/items` | Create a new item |
| PATCH | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |
| GET | `/health` | Health check (includes worker PID) |

## Setup & Run

### Prerequisites
- Node.js 16+ installed
- npm

### Installation
```bash
npm install
```

### Start Server (Cluster Mode)
```bash
npm start
```

The server will run on `http://localhost:3002` with worker processes for each CPU core.

### Performance Testing

You can test the performance improvement with load testing tools:

**Using autocannon (if installed globally):**
```bash
autocannon http://localhost:3002/api/items -c 100 -d 10
```

**Using wrk (if installed):**
```bash
wrk -t4 -c100 -d10s http://localhost:3002/api/items
```

Compare Fastify cluster mode with Express cluster mode at `http://localhost:3001` for a performance comparison.

## Example Requests

### GET All Items
```bash
curl http://localhost:3002/api/items
```

### GET Single Item
```bash
curl http://localhost:3002/api/items/1
```

### GET Health Status
```bash
curl http://localhost:3002/health
```
Returns process ID and environment info:
```json
{
  "status": "OK",
  "server": "Fastify API",
  "pid": 1236,
  "environment": "cluster-mode"
}
```

### POST - Create Item
```bash
curl -X POST http://localhost:3002/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","description":"Test","price":50}'
```

### PATCH - Update Item
```bash
curl -X PATCH http://localhost:3002/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","price":75}'
```

### DELETE Item
```bash
curl -X DELETE http://localhost:3002/api/items/1
```

## Cluster Mode Configuration

To modify the number of workers, edit `server.js`:

```javascript
// Current: Uses all available CPU cores
for (let i = 0; i < numCPUs; i++) {
  cluster.fork();
}

// To use specific number of workers:
const WORKERS = 2; // or any number
for (let i = 0; i < WORKERS; i++) {
  cluster.fork();
}
```

## Why Fastify with Cluster Mode?

| Feature | Benefit |
|---------|---------|
| **Fastify Framework** | Fastest HTTP framework for Node.js |
| **Cluster Mode** | Utilizes all available CPU cores |
| **Async/Await** | Native async request handling |
| **Auto-Logging** | Built-in request and performance logging |
| **Auto-Restart** | Crashed workers automatically restart |

## Performance Comparison

Running load test: `autocannon http://localhost:PORT/api/items -c 100 -d 10s`

| Setup | Throughput | Latency |
|-------|-----------|---------|
| Single Process | Baseline | Baseline |
| Cluster Mode (4 cores) | 3-4x improvement | Lower |
| Fastify Cluster vs Express Cluster | Fastify wins | Lower p99 latency |

## Monitoring

Check which worker is handling a request by looking at the response:
```bash
curl http://localhost:3002/health
# pid will show the worker process ID
```

Each request might be handled by different workers (Round-robin scheduling).

## Troubleshooting

### Workers not starting
- Check available CPU cores: `node -e "console.log(require('os').cpus().length)"`
- Verify Node.js version is 16+

### Port already in use
```bash
# Windows
netstat -ano | findstr :3002
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3002
kill -9 <PID>
```

### Checking number of processes
```bash
# Linux/Mac
ps aux | grep node

# Windows
tasklist | findstr node
```

### Viewing request logs
Fastify logs each request with timing information. Check the console output for detailed request logging from each worker.

