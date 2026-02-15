# Quick Start Guide for Multi-Language API Servers

## 🚀 Getting Started in 5 Minutes

### 1. Choose Your Server

All servers have the same endpoints but use different technologies:

| Port | Server | Tech Stack | Setup Time |
|------|--------|-----------|-----------|
| 3001 | Express | Node.js + Express | ~ 30 seconds |
| 3002 | Fastify | Node.js + Fastify | ~ 30 seconds |
| 3003 | FastAPI | Python + FastAPI | ~ 1 minute |
| 3004 | Spring Boot | Java + Spring | ~ 1-2 minutes |
| 3005 | C HTTP | C + Raw Sockets | ~ 10 seconds |

### 2. Start a Server

**Express.js:**
```bash
cd javascript/express-api
npm install
npm start
```

**Fastify:**
```bash
cd javascript/fastify-api
npm install
npm start
```

**FastAPI:**
```bash
cd python/fastapi-api
pip install -r requirements.txt
python main.py
```

**Spring Boot:**
```bash
cd java/spring-api
mvn clean package
mvn spring-boot:run
```

**C API:**
```bash
cd c/api-server
gcc -Wall -Wextra -o server.exe server.c
./server.exe
```

### 3. Test the API

```bash
# Test health check
curl http://localhost:3001/health

# Get all items
curl http://localhost:3001/api/items

# Create item
curl -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"My Item","description":"Test","price":99.99}'

# Update item
curl -X PATCH http://localhost:3001/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated","price":149.99}'

# Delete item
curl -X DELETE http://localhost:3001/api/items/1
```

### 4. View Documentation

- **FastAPI** (Port 3003): Go to `http://localhost:3003/docs` for interactive Swagger UI
- **Other servers**: See individual README files

## 📊 Comparison

### Performance (Startup Time)
1. **C API** - 10ms (fastest)
2. **Express** - 500ms
3. **Fastify** - 600ms
4. **FastAPI** - 1000ms
5. **Spring Boot** - 5000ms (slowest)

### Features
- **Express**: Simple, well-documented, large ecosystem
- **Fastify**: High-performance, modern features, fast
- **FastAPI**: Async support, automatic docs, modern
- **Spring Boot**: Enterprise-grade, mature, heavily used
- **C API**: Minimal dependencies, educational

## 🎯 Common Tasks

### Run Multiple Servers Simultaneously
```bash
# Terminal 1
cd javascript/express-api && npm start

# Terminal 2
cd javascript/fastify-api && npm start

# Terminal 3
cd python/fastapi-api && python main.py

# Terminal 4
cd java/spring-api && mvn spring-boot:run

# Terminal 5
cd c/api-server && ./server.exe
```

### Test All Health Checks
```bash
for port in 3001 3002 3003 3004 3005; do
  echo "Port $port:"
  curl http://localhost:$port/health
done
```

### Load Testing (requires Apache Bench)
```bash
ab -n 1000 -c 10 http://localhost:3001/api/items
```

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# Windows - Find process using port
netstat -ano | findstr :3001

# Windows - Kill process (replace PID)
taskkill /PID 1234 /F

# Linux/Mac
lsof -i :3001
kill -9 <PID>
```

### Dependencies Not Installing

**Node.js (npm):**
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Python (pip):**
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

**Java (Maven):**
```bash
mvn clean install
```

### Can't Connect to Server

1. Check if server is running: `curl http://localhost:PORT/health`
2. Try `http://127.0.0.1:PORT` instead of `localhost`
3. Check firewall settings
4. Ensure port is not blocked by another application

## 📚 Next Steps

1. **Modify code** - Edit models and handlers in each server
2. **Add authentication** - Implement JWT or API keys
3. **Add database** - Replace in-memory storage with PostgreSQL, MongoDB, etc.
4. **Deploy** - Push to Docker, AWS, Azure, or other platforms
5. **Add tests** - Implement unit and integration tests

## 📝 Example: Adding a New Item Field

To add a new field (e.g., `category`), you would:

1. **Express** - Update object in `javascript/express-api/server.js`
2. **Fastify** - Update object in `javascript/fastify-api/server.js`
3. **FastAPI** - Update Pydantic model in `python/fastapi-api/main.py`
4. **Spring Boot** - Add field to `java/spring-api/src/main/java/.../Item.java`
5. **C API** - Add field to struct in `c/api-server/server.c`

## 🔗 Resources

- [Express.js Docs](https://expressjs.com/)
- [Fastify Docs](https://www.fastify.io/)
- [FastAPI Docs](https://fastapi.tiangolo.com/)
- [Spring Boot Docs](https://spring.io/projects/spring-boot)
- [C Socket Programming](https://www.geeksforgeeks.org/socket-programming-cc/)

---

**Enjoy coding!** 🚀
