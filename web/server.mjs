import { createServer } from 'node:http';
import { readFile, realpath } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const publicFiles = new Map([
  ['/', ['index.html', 'text/html; charset=utf-8']],
  ['/index.html', ['index.html', 'text/html; charset=utf-8']],
  ['/app.mjs', ['app.mjs', 'text/javascript; charset=utf-8']],
  ['/model.mjs', ['model.mjs', 'text/javascript; charset=utf-8']],
  ['/styles.css', ['styles.css', 'text/css; charset=utf-8']],
  ['/favicon.svg', ['favicon.svg', 'image/svg+xml']],
]);

const rawPort = process.env.PORT ?? '4318';
if (!/^\d+$/.test(rawPort) || Number(rawPort) < 1 || Number(rawPort) > 65535) {
  console.error('PORT 必须是 1–65535 之间的整数。');
  process.exit(1);
}
const port = Number(rawPort);

const server = createServer(async (request, response) => {
  response.setHeader('Cache-Control', 'no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  response.setHeader('Referrer-Policy', 'same-origin');
  response.setHeader('X-Frame-Options', 'SAMEORIGIN');

  const send = (status, message) => {
    response.writeHead(status, { 'Content-Type': 'text/plain; charset=utf-8' });
    response.end(request.method === 'HEAD' ? undefined : message);
  };
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD');
    send(405, '不支持此请求方法。');
    return;
  }

  // 比对原始路径，不做路径归一化，也不把未知路径回退到首页。
  // 仅下面五个静态文件可读，测试、说明文档与任意目录均不提供。
  const pathname = (request.url ?? '').split('?')[0];
  const entry = publicFiles.get(pathname);
  if (!entry) {
    send(404, '未找到。');
    return;
  }

  try {
    const [filename, contentType] = entry;
    const filepath = join(root, filename);
    // 即使误放了符号链接，也不把工作目录之外的文件公开出来。
    if (await realpath(filepath) !== filepath) {
      send(404, '未找到。');
      return;
    }
    const body = await readFile(filepath);
    response.writeHead(200, {
      'Content-Type': contentType,
      'Content-Length': body.byteLength,
    });
    response.end(request.method === 'HEAD' ? undefined : body);
  } catch (error) {
    if (error.code !== 'ENOENT') console.error('静态文件读取失败：', error.code);
    send(error.code === 'ENOENT' ? 404 : 500, '文件暂不可用。');
  }
});

server.on('error', (error) => {
  console.error(error.code === 'EADDRINUSE'
    ? `端口 ${port} 已被占用；可通过 PORT 指定其他端口。`
    : `预览服务启动失败：${error.code ?? error.message}`);
  process.exitCode = 1;
});

server.listen(port, '127.0.0.1', () => {
  console.log(`Zven 写作桌预览：http://127.0.0.1:${port}`);
  console.log('仅本机访问；Ctrl+C 停止。');
});
