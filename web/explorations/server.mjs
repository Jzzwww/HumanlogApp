import {createServer} from 'node:http';
import {readFile,realpath} from 'node:fs/promises';
import {dirname,join} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=dirname(fileURLToPath(import.meta.url));
const files=new Map([['/','index.html'],['/index.html','index.html'],['/signal.html','signal.html'],['/white.html','white.html'],['/type.html','type.html']]);
const server=createServer(async(req,res)=>{
  res.setHeader('Cache-Control','no-store');res.setHeader('X-Content-Type-Options','nosniff');res.setHeader('Referrer-Policy','same-origin');res.setHeader('X-Frame-Options','SAMEORIGIN');
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{Allow:'GET, HEAD'});res.end();return;}
  const file=files.get((req.url||'').split('?')[0]);if(!file){res.writeHead(404);res.end();return;}
  try{const path=join(root,file);if(await realpath(path)!==path)throw new Error('Invalid path');const body=await readFile(path);res.writeHead(200,{'Content-Type':'text/html; charset=utf-8','Content-Length':body.length});res.end(req.method==='HEAD'?undefined:body);}catch{res.writeHead(404);res.end();}
});
server.on('error',e=>{console.error('视觉研究预览启动失败：'+e.code);process.exitCode=1;});
server.listen(4320,'127.0.0.1',()=>console.log('视觉研究：http://127.0.0.1:4320（仅本机）'));
