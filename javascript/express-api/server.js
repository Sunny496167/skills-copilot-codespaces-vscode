const express = require('express');
const bodyParser = require('body-parser');
const cluster = require('cluster');
const os = require('os');

const app = express();
const PORT = 3001;

// Get number of CPU cores
const numCPUs = os.cpus().length;

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
  res.json({ 
    status: 'OK', 
    server: 'Express API',
    pid: process.pid,
    environment: 'cluster-mode'
  });
});

// Start server function
function startServer() {
  app.listen(PORT, () => {
    console.log(`Express API Worker ${process.pid} running on http://localhost:${PORT}`);
  });
}

// Cluster setup
if (cluster.isPrimary) {
  console.log('\n╔════════════════════════════════════════════════════════╗');
  console.log('║  Express API Server - CLUSTER MODE                    ║');
  console.log(`║  Master Process ID: ${process.pid}`);
  console.log(`║  CPU Cores Available: ${numCPUs}`);
  console.log('╚════════════════════════════════════════════════════════╝\n');

  console.log(`Master ${process.pid} starting worker processes...`);
  
  // Fork a worker for each CPU core
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Handle worker exits
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited (${signal || code}). Restarting...`);
    cluster.fork(); // Restart worker if it crashes
  });

  console.log(`\nEndpoints:`);
  console.log('  GET    /api/items');
  console.log('  GET    /api/items/:id');
  console.log('  POST   /api/items');
  console.log('  PATCH  /api/items/:id');
  console.log('  DELETE /api/items/:id');
  console.log('  GET    /health\n');

} else {
  // Worker process
  startServer();
}
