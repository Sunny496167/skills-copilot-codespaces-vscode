@echo off
REM =============================================================================
REM Multi-Server API Test Script for Windows
REM Tests all 5 API servers for CRUD operations
REM =============================================================================

echo.
echo ╔════════════════════════════════════════════════════════════════╗
echo ║           Multi-Server API Testing Script                     ║
echo ║   Testing: Express, Fastify, FastAPI, Spring Boot, C API      ║
echo ╚════════════════════════════════════════════════════════════════╝
echo.

REM Servers to test
set SERVERS=3001 3002 3003 3004 3005
set SERVER_NAMES=Express Fastify FastAPI SpringBoot C

setlocal enabledelayedexpansion

REM Function to test a server
echo.
echo [*] Testing Health Check Endpoints...
echo.

for %%P in (%SERVERS%) do (
    echo Testing http://localhost:%%P/health
    curl -s http://localhost:%%P/health
    echo.
)

echo.
echo [*] All health checks complete!
echo.

REM Test Express on 3001 as example
echo.
echo ════════════════════════════════════════════════════════════════
echo Testing Express API (Port 3001) - All CRUD Operations
echo ════════════════════════════════════════════════════════════════
echo.

echo [GET] Retrieve all items:
curl -s http://localhost:3001/api/items | findstr .
echo.

echo [POST] Create new item:
curl -s -X POST http://localhost:3001/api/items ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test Item\",\"description\":\"Test item\",\"price\":50}"
echo.

echo [PATCH] Update item 1:
curl -s -X PATCH http://localhost:3001/api/items/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Updated Item\",\"price\":75}"
echo.

echo [DELETE] Delete item 1:
curl -s -X DELETE http://localhost:3001/api/items/1
echo.

echo.
echo ════════════════════════════════════════════════════════════════
echo ✓ Testing complete! Test other servers by replacing port 3001 with:
echo   - 3002 (Fastify)
echo   - 3003 (FastAPI)
echo   - 3004 (Spring Boot)
echo   - 3005 (C API)
echo ════════════════════════════════════════════════════════════════
echo.

pause
