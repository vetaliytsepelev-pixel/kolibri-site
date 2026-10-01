/* Простой локальный сервер для просмотра сайта: node tools/serve.js [порт] */
const http = require('http');
const fs = require('fs');
const path = require('path');
const root = path.resolve(__dirname, '..');
const port = parseInt(process.argv[2] || process.env.PORT || '8765', 10);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon', '.webp': 'image/webp', '.json': 'application/json' };
http.createServer((req, res) => {
  if (req.method === 'POST' && req.url.startsWith('/save')) {
    const name = decodeURIComponent(new URL(req.url, 'http://localhost').searchParams.get('name') || 'file').replace(/[\\/:*?"<>|]/g, '_');
    const dir = path.join(root, 'ростомер'); fs.mkdirSync(dir, { recursive: true });
    const chunks = []; req.on('data', c => chunks.push(c));
    req.on('end', () => { fs.writeFileSync(path.join(dir, name), Buffer.concat(chunks)); res.writeHead(200, { 'Content-Type': 'text/plain; charset=utf-8' }); res.end('сохранён ' + name); });
    return;
  }
  // заглушка обработчика формы для проверки сайта без PHP: ?fail=1 — имитация ошибки
  if (req.method === 'POST' && req.url.startsWith('/form/send.php')) {
    const chunks = []; req.on('data', c => chunks.push(c));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString('utf8');
      const fields = {}; body.replace(/name="([^"]+)"\r\n\r\n([\s\S]*?)\r\n--/g, (_, k, v) => { fields[k] = v; return ''; });
      console.log('[форма] заявка:', JSON.stringify(fields));
      const fail = req.url.includes('fail=1');
      res.writeHead(200, { 'Content-Type': 'application/json; charset=utf-8' });
      res.end(JSON.stringify(fail ? { ok: false, error: 'Тестовая ошибка сервера.' } : { ok: true }));
    });
    return;
  }
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/index.html';
  const file = path.join(root, p);
  if (!file.startsWith(root)) { res.writeHead(403); return res.end(); }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' }); return res.end('Not found: ' + p); }
    res.writeHead(200, { 'Content-Type': types[path.extname(file).toLowerCase()] || 'application/octet-stream', 'Cache-Control': 'no-cache' });
    res.end(data);
  });
}).listen(port, () => console.log('Сайт «Колибри»: http://localhost:' + port));
