# Fastify API Demo

A high-performance REST API built with Fastify that demonstrates CRUD operations.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/:id` | Get a specific item |
| POST | `/api/items` | Create a new item |
| PATCH | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |
| GET | `/health` | Health check |

## Setup & Run

### Prerequisites
- Node.js 16+ installed
- npm

### Installation
```bash
npm install
```

### Start Server
```bash
npm start
```

The server will run on `http://localhost:3002`

## Example Requests

### GET All Items
```bash
curl http://localhost:3002/api/items
```

### GET Single Item
```bash
curl http://localhost:3002/api/items/1
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
