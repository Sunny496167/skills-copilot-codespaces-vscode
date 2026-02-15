# Spring Boot API Demo

A robust REST API built with Spring Boot that demonstrates CRUD operations.

## Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/items` | Get all items |
| GET | `/api/items/{id}` | Get a specific item |
| POST | `/api/items` | Create a new item |
| PATCH | `/api/items/{id}` | Update an item |
| DELETE | `/api/items/{id}` | Delete an item |
| GET | `/health` | Health check |

## Setup & Run

### Prerequisites
- Java 17+ installed
- Maven 3.6+

### Build Project
```bash
mvn clean package
```

### Run with Maven
```bash
mvn spring-boot:run
```

### Or Run JAR directly (after build)
```bash
java -jar target/spring-api-demo-1.0.0.jar
```

The server will run on `http://localhost:3004`

## Example Requests

### GET All Items
```bash
curl http://localhost:3004/api/items
```

### GET Single Item
```bash
curl http://localhost:3004/api/items/1
```

### POST - Create Item
```bash
curl -X POST http://localhost:3004/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item","description":"Test","price":50}'
```

### PATCH - Update Item
```bash
curl -X PATCH http://localhost:3004/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","price":75}'
```

### DELETE Item
```bash
curl -X DELETE http://localhost:3004/api/items/1
```
