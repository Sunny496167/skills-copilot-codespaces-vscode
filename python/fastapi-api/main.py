from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel
from typing import List, Optional
import uvicorn

app = FastAPI(title="FastAPI Demo", version="1.0.0")

# Data model
class Item(BaseModel):
    id: Optional[int] = None
    name: str
    description: str
    price: float

# In-memory data store
items_db = [
    {"id": 1, "name": "Item 1", "description": "First item", "price": 100.0},
    {"id": 2, "name": "Item 2", "description": "Second item", "price": 200.0}
]

next_id = 3

# GET - Retrieve all items
@app.get("/api/items", response_model=dict)
async def get_all_items():
    return {
        "status": "success",
        "data": items_db,
        "message": "All items retrieved"
    }

# GET - Retrieve single item by ID
@app.get("/api/items/{item_id}", response_model=dict)
async def get_item(item_id: int):
    item = next((i for i in items_db if i["id"] == item_id), None)
    
    if not item:
        raise HTTPException(
            status_code=404,
            detail={
                "status": "error",
                "message": "Item not found"
            }
        )
    
    return {
        "status": "success",
        "data": item,
        "message": "Item retrieved"
    }

# POST - Create new item
@app.post("/api/items", status_code=201, response_model=dict)
async def create_item(item: Item):
    global next_id
    
    new_item = {
        "id": next_id,
        "name": item.name,
        "description": item.description,
        "price": item.price
    }
    
    items_db.append(new_item)
    next_id += 1
    
    return {
        "status": "success",
        "data": new_item,
        "message": "Item created successfully"
    }

# PATCH - Update item
@app.patch("/api/items/{item_id}", response_model=dict)
async def update_item(item_id: int, item_update: Item):
    item = next((i for i in items_db if i["id"] == item_id), None)
    
    if not item:
        raise HTTPException(
            status_code=404,
            detail={
                "status": "error",
                "message": "Item not found"
            }
        )
    
    # Update fields
    if item_update.name:
        item["name"] = item_update.name
    if item_update.description:
        item["description"] = item_update.description
    if item_update.price is not None:
        item["price"] = item_update.price
    
    return {
        "status": "success",
        "data": item,
        "message": "Item updated successfully"
    }

# DELETE - Remove item
@app.delete("/api/items/{item_id}", response_model=dict)
async def delete_item(item_id: int):
    global items_db
    
    item = next((i for i in items_db if i["id"] == item_id), None)
    
    if not item:
        raise HTTPException(
            status_code=404,
            detail={
                "status": "error",
                "message": "Item not found"
            }
        )
    
    items_db = [i for i in items_db if i["id"] != item_id]
    
    return {
        "status": "success",
        "data": item,
        "message": "Item deleted successfully"
    }

# Health check
@app.get("/health")
async def health_check():
    return {"status": "OK", "server": "FastAPI"}

if __name__ == "__main__":
    print("FastAPI Server running on http://localhost:3003")
    print("Endpoints:")
    print("  GET    /api/items")
    print("  GET    /api/items/{id}")
    print("  POST   /api/items")
    print("  PATCH  /api/items/{id}")
    print("  DELETE /api/items/{id}")
    print("  GET    /health")
    print("\nDocs available at http://localhost:3003/docs")
    
    uvicorn.run(app, host="0.0.0.0", port=3003)
