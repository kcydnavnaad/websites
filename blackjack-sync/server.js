import http from 'node:http';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;

// In-memory storage: key -> value (all shared)
const storage = new Map();
// All connected clients (broadcast to all)
const clients = new Set();

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok\n');
    return;
  }
  if (req.url === '/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      clients: clients.size,
      keys: storage.size,
    }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  clients.add(ws);
  console.log(`connect: clients=${clients.size}`);

  ws.on('message', (raw) => {
    let msg;
    try { msg = JSON.parse(raw.toString()); } catch { return; }
    const { type, id, key, value, prefix } = msg;

    if (type === 'get') {
      const val = storage.get(key);
      ws.send(JSON.stringify({
        type: 'result', id,
        value: val !== undefined ? { key, value: val, shared: true } : null,
      }));
    } else if (type === 'set') {
      storage.set(key, value);
      ws.send(JSON.stringify({
        type: 'result', id,
        value: { key, value, shared: true },
      }));
      broadcast({ type: 'update', key, value }, ws);
    } else if (type === 'delete') {
      const existed = storage.delete(key);
      ws.send(JSON.stringify({
        type: 'result', id,
        value: { key, deleted: existed, shared: true },
      }));
      broadcast({ type: 'delete', key }, ws);
    } else if (type === 'list') {
      const p = prefix || '';
      const keys = [...storage.keys()].filter((k) => k.startsWith(p));
      ws.send(JSON.stringify({
        type: 'result', id,
        value: { keys, prefix: p, shared: true },
      }));
    }
  });

  ws.on('close', () => {
    clients.delete(ws);
    console.log(`disconnect: clients=${clients.size}`);
  });

  ws.on('error', () => {});
});

function broadcast(payload, exceptWs) {
  const data = JSON.stringify(payload);
  for (const client of clients) {
    if (client !== exceptWs && client.readyState === 1) {
      client.send(data);
    }
  }
}

// Periodic cleanup: drop entries with 0 recent activity? Not needed for now
// (in-memory, kleine dataset)

server.listen(PORT, () => {
  console.log(`blackjack-sync listening on ${PORT}`);
});
