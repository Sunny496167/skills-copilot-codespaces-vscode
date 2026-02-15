# Project Overview

## Complete Multi-Language API Server Project

Created: February 15, 2026

### 📦 Project Contents

This project contains **5 production-ready API servers** implemented in different languages and frameworks:

```
skills-copilot-codespaces-vscode/
│
├── javascript/
│   ├── express-api/           # Express.js REST API (Port 3001)
│   │   ├── package.json
│   │   ├── server.js          # Main server code
│   │   ├── README.md
│   │   └── .gitignore
│   │
│   └── fastify-api/           # Fastify REST API (Port 3002)
│       ├── package.json
│       ├── server.js          # Main server code
│       ├── README.md
│       └── .gitignore
│
├── python/
│   └── fastapi-api/           # FastAPI REST API (Port 3003)
│       ├── requirements.txt
│       ├── main.py            # Main server code
│       ├── README.md
│       └── .gitignore
│
├── java/
│   └── spring-api/            # Spring Boot REST API (Port 3004)
│       ├── pom.xml
│       ├── src/main/
│       │   ├── java/com/example/api/
│       │   │   ├── ApiApplication.java   # Main application class
│       │   │   ├── ItemController.java   # REST endpoints
│       │   │   ├── Item.java             # Data model
│       │   │   └── ApiResponse.java      # Response wrapper
│       │   └── resources/
│       │       └── application.properties
│       ├── README.md
│       └── .gitignore
│
├── c/
│   └── api-server/            # C HTTP API Server (Port 3005)
│       ├── server.c           # Main server code
│       ├── Makefile           # Build configuration
│       ├── README.md
│       └── .gitignore
│
├── README.md                  # Main project documentation
├── QUICK_START.md             # Quick start guide
├── PROJECT_STRUCTURE.md       # This file
├── test-all-servers.bat       # Windows test script
├── test-all-servers.sh        # Linux/Mac test script
└── .gitignore                 # Global git ignore

```

## 🎯 Server Details

### JavaScript/Node.js Servers

#### Express API (Port 3001)
- **Framework**: Express.js 4.18.2
- **Dependencies**: body-parser
- **Features**:
  - Simple and straightforward
  - Middleware support
  - Wide community support
- **Startup**: `npm install && npm start`
- **Files**: package.json, server.js

#### Fastify API (Port 3002)
- **Framework**: Fastify 4.24.3
- **Features**:
  - High-performance HTTP server
  - Built-in logging
  - Async/await native support
- **Startup**: `npm install && npm start`
- **Files**: package.json, server.js

### Python Server

#### FastAPI (Port 3003)
- **Framework**: FastAPI 0.104.1
- **Server**: Uvicorn
- **Dependencies**: Pydantic 2.5.0
- **Features**:
  - Async/await support
  - Automatic API documentation (Swagger UI)
  - Type hints with Pydantic
  - Interactive API docs at `/docs`
- **Startup**: `pip install -r requirements.txt && python main.py`
- **Files**: requirements.txt, main.py

### Java Server

#### Spring Boot (Port 3004)
- **Framework**: Spring Boot 3.2.0
- **Build Tool**: Maven
- **Java Version**: 17+
- **Key Dependencies**:
  - spring-boot-starter-web
  - lombok (reduces boilerplate)
  - spring-boot-devtools
- **Features**:
  - Enterprise-grade framework
  - Dependency injection
  - Auto-configuration
  - ClassPath: Spring-managed
- **Startup**: `mvn clean package && mvn spring-boot:run`
- **Files**: pom.xml, src/main/java (4 classes), application.properties

### C Server

#### HTTP API (Port 3005)
- **Language**: C (C99)
- **Build**: GCC with Makefile
- **Features**:
  - Minimal dependencies
  - Raw socket programming
  - Lightweight and fast
  - Windows/Linux/Mac compatible
- **Startup**: `gcc -Wall -Wextra -o server.exe server.c && ./server.exe`
- **Files**: server.c, Makefile

## 🔌 API Endpoints (Same across all servers)

```
GET     /api/items              - Get all items
GET     /api/items/:id          - Get specific item
POST    /api/items              - Create new item
PATCH   /api/items/:id          - Update item (partial)
DELETE  /api/items/:id          - Delete item
GET     /health                 - Health check
```

## 📋 Data Model

```json
{
  "id": 1,
  "name": "Item Name",
  "description": "Item Description",
  "price": 100.0
}
```

## 🚀 Quick Commands

### Start All Servers (requires 5 terminals)

**Terminal 1 - Express:**
```bash
cd javascript/express-api && npm install && npm start
```

**Terminal 2 - Fastify:**
```bash
cd javascript/fastify-api && npm install && npm start
```

**Terminal 3 - FastAPI:**
```bash
cd python/fastapi-api && pip install -r requirements.txt && python main.py
```

**Terminal 4 - Spring Boot:**
```bash
cd java/spring-api && mvn clean package && mvn spring-boot:run
```

**Terminal 5 - C API:**
```bash
cd c/api-server && make && make run
```

### Test All Servers

**Windows:**
```bash
./test-all-servers.bat
```

**Linux/Mac:**
```bash
bash test-all-servers.sh
```

## 🧪 Example Testing

### Using cURL

```bash
# Health check
curl http://localhost:3001/health

# Get all items
curl http://localhost:3001/api/items

# Create item
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","description":"Test item","price":50}'

# Update item
curl -X PATCH http://localhost:3001/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","price":75}'

# Delete item
curl -X DELETE http://localhost:3001/api/items/1
```

## 📊 Port Allocation

| Port | Server | Framework |
|------|--------|-----------|
| 3001 | Express | Node.js |
| 3002 | Fastify | Node.js |
| 3003 | FastAPI | Python |
| 3004 | Spring Boot | Java |
| 3005 | C HTTP | C |

## ✅ What's Included

- ✅ Full CRUD operations (GET, POST, PATCH, DELETE)
- ✅ In-memory data store (ready to replace with databases)
- ✅ Consistent JSON request/response format
- ✅ Error handling
- ✅ Health check endpoints
- ✅ Production-ready structure
- ✅ README for each server
- ✅ Test scripts
- ✅ .gitignore for version control

## 📝 Response Format

All servers follow the same response format:

**Success:**
```json
{
  "status": "success",
  "data": { /* item object */ },
  "message": "Operation completed successfully"
}
```

**Error:**
```json
{
  "status": "error",
  "message": "Error description"
}
```

## 🔄 Common Use Cases

### Run Single Server for Learning
```bash
cd javascript/express-api
npm install && npm start
```

### Compare Framework Performance
Run all 5 servers and benchmark using Apache Bench or similar tools

### Learn Multiple Languages
Each server demonstrates same functionality in different language

### Migrate Between Frameworks
Use as reference for migrating API from one language to another

## 🎓 Learning Outcomes

By working with this project, you'll learn:
- ✅ RESTful API design principles
- ✅ CRUD operations across multiple languages
- ✅ HTTP methods (GET, POST, PATCH, DELETE)
- ✅ JSON handling
- ✅ Error handling
- ✅ Different framework patterns
- ✅ Cross-platform deployment

## 🚀 Next Steps

1. **Run a server** - Start with Express for simplicity
2. **Test endpoints** - Use cURL or Postman
3. **Modify code** - Add new fields to the Item model
4. **Add persistence** - Replace in-memory storage with database
5. **Deploy** - Push to cloud platform (AWS, Azure, Heroku, etc.)
6. **Scale** - Add load balancing, caching, etc.

## 📚 Resources

- **Express**: https://expressjs.com/
- **Fastify**: https://www.fastify.io/
- **FastAPI**: https://fastapi.tiangolo.com/
- **Spring Boot**: https://spring.io/projects/spring-boot
- **C Sockets**: https://man7.org/linux/man-pages/man7/socket.7.html

## ✨ Key Features

- **Multi-Language**: JavaScript, Python, Java, C
- **Multiple Frameworks**: Express, Fastify, FastAPI, Spring Boot
- **Consistent API**: Same endpoints across all servers
- **Production Ready**: Proper error handling and responses
- **Easy to Extend**: Clear code structure for modifications
- **Well Documented**: README files and inline comments

---

**Project Status**: ✅ Complete and Ready to Use

**Last Updated**: February 15, 2026

**Create Date**: February 15, 2026
