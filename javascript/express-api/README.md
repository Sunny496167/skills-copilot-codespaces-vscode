# Express API Demo

A simple REST API built with Express.js that demonstrates CRUD operations with **Cluster Mode enabled for multi-core CPU utilization**.

## Features

- ✅ Full CRUD operations (GET, POST, PATCH, DELETE)
- ✅ **Cluster Mode** - Automatically spawns worker processes for each CPU core
- ✅ Automatic worker restart on crash
- ✅ Load balancing across worker processes
- ✅ Health check endpoint with process info

## Cluster Mode

This server automatically runs in **cluster mode**, which:
- Forks one worker process per available CPU core
- Distributes incoming requests across all workers
- Automatically restarts crashed workers
- Significantly improves performance and throughput
- Provides better resource utilization

### How It Works

1. **Master Process** - Manages worker processes and handles restarts
2. **Worker Processes** - Each worker runs an Express server instance
3. **Load Balancing** - Node.js automatically distributes requests

Example output (on a 4-core system):
```
Master Process ID: 1234
CPU Cores Available: 4

Master 1234 starting worker processes...
Express API Worker 1235 running on http://localhost:3001
Express API Worker 1236 running on http://localhost:3001
Express API Worker 1237 running on http://localhost:3001
Express API Worker 1238 running on http://localhost:3001
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

The server will run on `http://localhost:3001` with worker processes for each CPU core.

### Performance Testing

You can test the performance improvement with load testing tools:

**Using autocannon (if installed globally):**
```bash
autocannon http://localhost:3001/api/items -c 100 -d 10
```

**Using wrk (if installed):**
```bash
wrk -t4 -c100 -d10s http://localhost:3001/api/items
```

Compare performance between:
- Single worker mode (baseline)
- Multi-worker cluster mode (improved throughput)

## Example Requests

### GET All Items
```bash
curl http://localhost:3001/api/items
```

### GET Single Item
```bash
curl http://localhost:3001/api/items/1
```

### GET Health Status
```bash
curl http://localhost:3001/health
```
Returns process ID and environment info:
```json
{
  "status": "OK",
  "server": "Express API",
  "pid": 1235,
  "environment": "cluster-mode"
}
```

### POST - Create Item
```bash
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","description":"Test","price":50}'
```

### PATCH - Update Item
```bash
curl -X PATCH http://localhost:3001/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","price":75}'
```

### DELETE Item
```bash
curl -X DELETE http://localhost:3001/api/items/1
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

## Benefits of Cluster Mode

| Aspect | Single Process | Cluster Mode |
|--------||---|
| CPU Utilization | One core only | All cores |
| Throughput | Baseline | 2-4x improvement |
| Reliability | Single point of failure | Auto-restart on crash |
| Request Distribution | Sequential | Parallel across workers |

## Monitoring

Check which worker is handling a request by looking at the response:
```bash
curl http://localhost:3001/health
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
netstat -ano | findstr :3001
taskkill /PID <PID> /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Checking number of process
```bash
# Linux/Mac
ps aux | grep node

# Windows
tasklist | findstr node
```

