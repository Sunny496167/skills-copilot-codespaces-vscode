const fastify = require('fastify');

const app = fastify({ logger: true });
const PORT = 3002;

// In-memory data store
let items = [
  { id: 1, name: 'Item 1', description: 'First item', price: 100 },
  { id: 2, name: 'Item 2', description: 'Second item', price: 200 }
];

let nextId = 3;

// GET - Retrieve all items
app.get('/api/items', async (request, reply) => {
  return {
    status: 'success',
    data: items,
    message: 'All items retrieved'
  };
});

// GET - Retrieve single item by ID
app.get('/api/items/:id', async (request, reply) => {
  const item = items.find(i => i.id === parseInt(request.params.id));
  
  if (!item) {
    reply.status(404);
    return {
      status: 'error',
      message: 'Item not found'
    };
  }
  
  return {
    status: 'success',
    data: item,
    message: 'Item retrieved'
  };
});

// POST - Create new item
app.post('/api/items', async (request, reply) => {
  const { name, description, price } = request.body;
  
  if (!name || !description || price === undefined) {
    reply.status(400);
    return {
      status: 'error',
      message: 'Missing required fields: name, description, price'
    };
  }
  
  const newItem = {
    id: nextId++,
    name,
    description,
    price
  };
  
  items.push(newItem);
  
  reply.status(201);
  return {
    status: 'success',
    data: newItem,
    message: 'Item created successfully'
  };
});

// PATCH - Update item
app.patch('/api/items/:id', async (request, reply) => {
  const item = items.find(i => i.id === parseInt(request.params.id));
  
  if (!item) {
    reply.status(404);
    return {
      status: 'error',
      message: 'Item not found'
    };
  }
  
  // Update fields
  if (request.body.name) item.name = request.body.name;
  if (request.body.description) item.description = request.body.description;
  if (request.body.price !== undefined) item.price = request.body.price;
  
  return {
    status: 'success',
    data: item,
    message: 'Item updated successfully'
  };
});

// DELETE - Remove item
app.delete('/api/items/:id', async (request, reply) => {
  const index = items.findIndex(i => i.id === parseInt(request.params.id));
  
  if (index === -1) {
    reply.status(404);
    return {
      status: 'error',
      message: 'Item not found'
    };
  }
  
  const deletedItem = items.splice(index, 1);
  
  return {
    status: 'success',
    data: deletedItem[0],
    message: 'Item deleted successfully'
  };
});

// Health check
app.get('/health', async (request, reply) => {
  return { status: 'OK', server: 'Fastify API' };
});

app.listen({ port: PORT, host: '0.0.0.0' }, (err, address) => {
  if (err) throw err;
  console.log(`Fastify API Server running on http://localhost:${PORT}`);
  console.log('Endpoints:');
  console.log('  GET    /api/items');
  console.log('  GET    /api/items/:id');
  console.log('  POST   /api/items');
  console.log('  PATCH  /api/items/:id');
  console.log('  DELETE /api/items/:id');
  console.log('  GET    /health');
});
