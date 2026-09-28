import { copyFile, lstat, mkdir, readdir } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const dist = join(root, 'dist');
const files = ['index.html', 'app.mjs', 'model.mjs', 'styles.css', 'favicon.svg'];

async function inspect(path) {
  try {
    return await lstat(path);
  } catch (error) {
    if (error.code === 'ENOENT') return null;
    throw error;
  }
}

try {
  // 先核全输入与输出位置，再复制；不清理目录或删除任何既有文件。
  for (const filename of files) {
    const source = await inspect(join(root, filename));
    if (!source?.isFile()) throw new Error(`缺少普通静态文件：${filename}`);
  }
  const existingDist = await inspect(dist);
  if (existingDist && !existingDist.isDirectory()) {
    throw new Error('dist 必须是普通目录，不能是符号链接或文件。');
  }
  if (existingDist) {
    const unknown = (await readdir(dist)).filter((filename) => !files.includes(filename));
    if (unknown.length) {
      throw new Error(`dist 存在非本次构建文件，已保留并停止构建：${unknown.join('、')}`);
    }
    for (const filename of files) {
      const target = await inspect(join(dist, filename));
      if (target && !target.isFile()) throw new Error(`输出位置不是普通文件：${filename}`);
    }
  }
  await mkdir(dist, { recursive: true });
  for (const filename of files) await copyFile(join(root, filename), join(dist, filename));
  console.log(`已构建 ${files.length} 个静态文件：${dist}`);
  console.log('构建只生成本地预览产物，不代表已发布或已接入鉴权。');
} catch (error) {
  console.error(`构建失败：${error.message}`);
  process.exitCode = 1;
}
