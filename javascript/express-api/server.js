const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(bodyParser.json());

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'First item', price: 100 },
  { id: 2, name: 'Item 2', description: 'Second item', price: 200 }
];

let nextId = 3;

// GET - Retrieve all items
app.get('/api/items', (req, res) => {
  res.json({
    status: 'success',
    data: items,
    message: 'All items retrieved'
  });
});

// GET - Retrieve single item by ID
app.get('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({
      status: 'error',
      message: 'Item not found'
    });
  }
  
  res.json({
    status: 'success',
    data: item,
    message: 'Item retrieved'
  });
});

// POST - Create new item
app.post('/api/items', (req, res) => {
  const { name, description, price } = req.body;
  
  if (!name || !description || price === undefined) {
    return res.status(400).json({
      status: 'error',
      message: 'Missing required fields: name, description, price'
    });
  }
  
  const newItem = {
    id: nextId++,
    name,
    description,
    price
  };
  
  items.push(newItem);
  
  res.status(201).json({
    status: 'success',
    data: newItem,
    message: 'Item created successfully'
  });
});

// PATCH - Update item
app.patch('/api/items/:id', (req, res) => {
  const item = items.find(i => i.id === parseInt(req.params.id));
  
  if (!item) {
    return res.status(404).json({
      status: 'error',
      message: 'Item not found'
    });
  }
  
  // Update fields
  if (req.body.name) item.name = req.body.name;
  if (req.body.description) item.description = req.body.description;
  if (req.body.price !== undefined) item.price = req.body.price;
  
  res.json({
    status: 'success',
    data: item,
    message: 'Item updated successfully'
  });
});

// DELETE - Remove item
app.delete('/api/items/:id', (req, res) => {
  const index = items.findIndex(i => i.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({
      status: 'error',
      message: 'Item not found'
    });
  }
  
  const deletedItem = items.splice(index, 1);
  
  res.json({
    status: 'success',
    data: deletedItem[0],
    message: 'Item deleted successfully'
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', server: 'Express API' });
});

app.listen(PORT, () => {
  console.log(`Express API Server running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  GET    /api/items');
  console.log('  GET    /api/items/:id');
  console.log('  POST   /api/items');
  console.log('  PATCH  /api/items/:id');
  console.log('  DELETE /api/items/:id');
  console.log('  GET    /health');
});
