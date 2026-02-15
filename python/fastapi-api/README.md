# FastAPI Demo

A modern, fast Python REST API built with FastAPI that demonstrates CRUD operations.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/{id}` | Get a specific item |
| POST | `/api/items` | Create a new item |
| PATCH | `/api/items/{id}` | Update an item |
| DELETE | `/api/items/{id}` | Delete an item |
| GET | `/health` | Health check |
| GET | `/docs` | Interactive API docs (Swagger UI) |

## Setup & Run

### Prerequisites
- Python 3.8+ installed
- pip

### Installation
```bash
pip install -r requirements.txt
```

### Start Server
```bash
python main.py
```

The server will run on `http://localhost:3003`

Interactive API documentation available at `http://localhost:3003/docs`

## Example Requests

### GET All Items
```bash
curl http://localhost:3003/api/items
```

### GET Single Item
```bash
curl http://localhost:3003/api/items/1
```

### POST - Create Item
```bash
curl -X POST http://localhost:3003/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","description":"Test","price":50}'
```

### PATCH - Update Item
```bash
curl -X PATCH http://localhost:3003/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","price":75}'
```

### DELETE Item
```bash
curl -X DELETE http://localhost:3003/api/items/1
```
