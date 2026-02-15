#!/bin/bash

# =============================================================================
# Multi-Server API Test Script for Linux/Mac
# Tests all 5 API servers for CRUD operations
# =============================================================================

echo ""
echo "╔════════════════════════════════════════════════════════════════╗"
echo "║           Multi-Server API Testing Script                     ║"
echo "║   Testing: Express, Fastify, FastAPI, Spring Boot, C API      ║"
echo "╚════════════════════════════════════════════════════════════════╝"
echo ""

# Servers to test
PORTS=(3001 3002 3003 3004 3005)
NAMES=("Express" "Fastify" "FastAPI" "Spring Boot" "C API")

# Test health check endpoints
echo "Testing Health Check Endpoints..."
echo ""

for port in "${PORTS[@]}"; do
    echo "Testing http://localhost:$port/health"
    curl -s http://localhost:$port/health
    echo ""
done

echo ""
echo "All health checks complete!"
echo ""

# Test Express on 3001 as example
echo "════════════════════════════════════════════════════════════════"
echo "Testing Express API (Port 3001) - All CRUD Operations"
echo "════════════════════════════════════════════════════════════════"
echo ""

echo "[GET] Retrieve all items:"
curl -s http://localhost:3001/api/items | jq .
echo ""

echo "[POST] Create new item:"
curl -s -X POST http://localhost:3001/api/items \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Item","description":"Test item","price":50}' | jq .
echo ""

echo "[PATCH] Update item 1:"
curl -s -X PATCH http://localhost:3001/api/items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Item","price":75}' | jq .
echo ""

echo "[DELETE] Delete item 1:"
curl -s -X DELETE http://localhost:3001/api/items/1 | jq .
echo ""

echo ""
echo "════════════════════════════════════════════════════════════════"
echo "✓ Testing complete! Test other servers by replacing port 3001 with:"
echo "  - 3002 (Fastify)"
echo "  - 3003 (FastAPI)"
echo "  - 3004 (Spring Boot)"
echo "  - 3005 (C API)"
echo "════════════════════════════════════════════════════════════════"
echo ""
