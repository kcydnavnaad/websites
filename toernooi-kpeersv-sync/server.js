import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import { WebSocketServer } from 'ws';

const PORT = process.env.PORT || 8080;
const AUTH_TOKEN = process.env.AUTH_TOKEN || 'change-me';
const DATA_DIR = process.env.DATA_DIR || '/data';
const STORE_FILE = path.join(DATA_DIR, 'store.json');

const storage = new Map();
const clients = new Set();

// Load from disk on start
try {
  await fs.mkdir(DATA_DIR, { recursive: true });
  const raw = await fs.readFile(STORE_FILE, 'utf-8');
  const obj = JSON.parse(raw);
  for (const [k, v] of Object.entries(obj)) storage.set(k, v);
  console.log(`loaded ${storage.size} keys from disk`);
} catch (e) {
  if (e.code !== 'ENOENT') console.warn('load error:', e.message);
  else console.log('no existing store, starting fresh');
}

let persistTimer = null;
function schedulePersist() {
  if (persistTimer) return;
  persistTimer = setTimeout(async () => {
    persistTimer = null;
    try {
      const obj = Object.fromEntries(storage);
      await fs.writeFile(STORE_FILE, JSON.stringify(obj), 'utf-8');
    } catch (e) {
      console.warn('persist error:', e.message);
    }
  }, 500); // debounce 500ms
}

const server = http.createServer((req, res) => {
  if (req.url === '/healthz') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('ok\n');
    return;
  }
  if (req.url === '/stats') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ clients: clients.size, keys: storage.size }));
    return;
  }
  res.writeHead(404);
  res.end();
});

const wss = new WebSocketServer({ noServer: true });

server.on('upgrade', (req, socket, head) => {
  const url = new URL(req.url, 'http://localhost');
  const token = url.searchParams.get('token');
  if (token !== AUTH_TOKEN) {
    socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
    socket.destroy();
    return;
  }
  wss.handleUpgrade(req, socket, head, (ws) => wss.emit('connection', ws, req));
});

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
      schedulePersist();
      ws.send(JSON.stringify({ type: 'result', id, value: { key, value, shared: true } }));
      broadcast({ type: 'update', key, value }, ws);
    } else if (type === 'delete') {
      const existed = storage.delete(key);
      schedulePersist();
      ws.send(JSON.stringify({ type: 'result', id, value: { key, deleted: existed, shared: true } }));
      broadcast({ type: 'delete', key }, ws);
    } else if (type === 'list') {
      const p = prefix || '';
      const keys = [...storage.keys()].filter((k) => k.startsWith(p));
      ws.send(JSON.stringify({ type: 'result', id, value: { keys, prefix: p, shared: true } }));
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

server.listen(PORT, () => {
  console.log(`toernooi-kpeersv-sync listening on ${PORT}`);
});
