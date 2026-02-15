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

## Scaling & Performance

Use these steps to run the app with multiple worker processes and benchmark throughput.

### Install extras (venv active)
```bash
pip install -r requirements.txt
# (optional) faster HTTP parser
pip install httptools
# On Linux you can also install uvloop for faster event loop
pip install uvloop
```

### Run (development)
- Run directly (single process):
```bash
python main.py
# or
uvicorn main:app --host 0.0.0.0 --port 3003 --reload
```

- Run with multiple worker processes (improves CPU utilization):
```bash
# Using venv python from project root (Windows/Git Bash safe)
"/c/Users/SUNNY KUMAR/OneDrive/Desktop/skills-copilot-codespaces-vscode/.venv/Scripts/python.exe" -m uvicorn main:app --host 0.0.0.0 --port 3003 --workers 4 --http httptools
```

Notes:
- On Windows `uvloop` is not supported; `httptools` speeds HTTP parsing cross-platform.
- Worker count: try `4`, `8`, or `2 * CPU + 1` and benchmark.

### Production (recommended on Linux)
```bash
pip install gunicorn uvicorn[standard]
gunicorn -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:3003 main:app
```

### Benchmarking
Use `wrk` or `hey` to measure RPS against the `/health` endpoint.
```bash
# wrk example
wrk -t4 -c200 -d30s http://localhost:3003/health

# hey example
hey -c 100 -q 10 -z 30s http://localhost:3003/health
```

### Tips
- Ensure endpoints are async (`async def`) and avoid blocking CPU work on request handlers—offload heavy CPU tasks to background workers or separate services.
- Use multiple processes (workers) to utilize all CPU cores; async helps I/O but doesn't bypass CPU limits from Python's GIL.
- Use a reverse proxy (nginx) in front of the workers for TLS, buffering, and connection tuning.


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
