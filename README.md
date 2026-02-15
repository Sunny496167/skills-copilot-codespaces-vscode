# Multi-Language API Demo Servers

A comprehensive collection of REST API servers built with different programming languages and frameworks, all implementing the same CRUD operations (GET, POST, PATCH, DELETE).

## 📁 Project Structure

```
├── javascript/
│   ├── express-api/      # Express.js server (Port 3001)
│   └── fastify-api/      # Fastify server (Port 3002)
├── python/
│   └── fastapi-api/      # FastAPI server (Port 3003)
├── java/
│   └── spring-api/       # Spring Boot server (Port 3004)
└── c/
    └── api-server/       # C HTTP server (Port 3005)
```

## 🚀 Quick Start

### JavaScript Servers (Node.js)

#### Express API
```bash
cd javascript/express-api
npm install
npm start
# Server running on http://localhost:3001
```

#### Fastify API
```bash
cd javascript/fastify-api
npm install
npm start
# Server running on http://localhost:3002
```

### Python Server

#### FastAPI
```bash
cd python/fastapi-api
pip install -r requirements.txt
python main.py
# Server running on http://localhost:3003
# Interactive docs at http://localhost:3003/docs
```

### Java Server

#### Spring Boot
```bash
cd java/spring-api
mvn clean package
mvn spring-boot:run
# Server running on http://localhost:3004
```

### C Server

#### HTTP API
```bash
cd c/api-server
gcc -Wall -Wextra -o server.exe server.c
./server.exe
# Server running on http://localhost:3005
```

Or with Make:
```bash
make
make run
```

## 📊 Common Endpoints

All servers implement the same endpoints for consistency:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Retrieve all items |
| GET | `/api/items/:id` | Retrieve a specific item |
| POST | `/api/items` | Create a new item |
| PATCH | `/api/items/:id` | Update an item (partial) |
| DELETE | `/api/items/:id` | Delete an item |
| GET | `/health` | Health check endpoint |

## 🧪 Testing with cURL

### Test all servers
```bash
# Get all items
curl http://localhost:3001/api/items

# Create new item
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Item",
    "description": "A test item",
    "price": 99.99
  }'

# Update item
curl -X PATCH http://localhost:3001/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Item",
    "price": 149.99
  }'

# Delete item
curl -X DELETE http://localhost:3001/api/items/1

# Health check
curl http://localhost:3001/health
```

Replace port 3001 with 3002, 3003, 3004, or 3005 to test other servers.

## 📋 Data Model

Each server uses the same Item model:

```json
{
  "id": 1,
  "name": "Item Name",
  "description": "Item Description",
  "price": 100.0
}
```

## 🔧 Server Details

### Express.js (Port 3001)
- **Framework**: Express.js
- **Start**: `npm install && npm start`
- **Pros**: Lightweight, easy to understand

### Fastify (Port 3002)
- **Framework**: Fastify
- **Start**: `npm install && npm start`
- **Pros**: High-performance, built-in logging

### FastAPI (Port 3003)
- **Framework**: FastAPI
- **Start**: `pip install -r requirements.txt && python main.py`
- **Pros**: Async/await support, automatic API docs

### Spring Boot (Port 3004)
- **Framework**: Spring Boot
- **Start**: `mvn clean package && mvn spring-boot:run`
- **Pros**: Enterprise-grade, Lombok for less boilerplate

### C HTTP (Port 3005)
- **Language**: C
- **Start**: `gcc -Wall -Wextra -o server.exe server.c && ./server.exe`
- **Pros**: Lightweight, minimal dependencies

## 🎯 Features

✅ CRUD operations (GET, POST, PATCH, DELETE)  
✅ In-memory data store (no database required)  
✅ JSON request/response format  
✅ Consistent error handling  
✅ Health check endpoints  
✅ Ready-to-use example data  

## 📝 Example Response

All servers return consistent JSON responses:

**Success Response:**
```json
{
  "status": "success",
  "data": {
    "id": 1,
    "name": "Item 1",
    "description": "First item",
    "price": 100.0
  },
  "message": "Item retrieved"
}
```

**Error Response:**
```json
{
  "status": "error",
  "message": "Item not found"
}
```

## 🛠️ Requirements

- **Node.js**: For JavaScript servers (Express, Fastify)
- **Python 3.8+**: For FastAPI server
- **Java 17+**: For Spring Boot server
- **GCC**: For C server
- **Maven/npm**: For building/running

## 📚 Detailed Guides

Each server has its own README with specific setup instructions:
- [Express API README](javascript/express-api/README.md)
- [Fastify API README](javascript/fastify-api/README.md)
- [FastAPI README](python/fastapi-api/README.md)
- [Spring Boot README](java/spring-api/README.md)
- [C API README](c/api-server/README.md)

## 🔄 Running Multiple Servers

You can run multiple servers simultaneously in different terminals:

```bash
# Terminal 1: Express
cd javascript/express-api && npm install && npm start

# Terminal 2: Fastify
cd javascript/fastify-api && npm install && npm start

# Terminal 3: FastAPI
cd python/fastapi-api && pip install -r requirements.txt && python main.py

# Terminal 4: Spring Boot
cd java/spring-api && mvn clean package && mvn spring-boot:run

# Terminal 5: C API
cd c/api-server && make && make run
```

Then test with:
```bash
for port in 3001 3002 3003 3004 3005; do
  echo "Testing port $port:"
  curl http://localhost:$port/health
done
```

## 📄 License

Open source - feel free to use and modify as needed.

---

**Happy coding!** 🚀

