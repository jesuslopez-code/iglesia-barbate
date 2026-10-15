import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const chrome = process.env.CHROME_PATH ?? 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const logo = readFileSync('public/logo/logo-512.png').toString('base64');

// Las tipografías de la marca se cargan de Google Fonts al renderizar: hace falta conexión.
const html = `<!doctype html><meta charset="utf-8">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Karla:wght@500&display=swap">
<style>
  html,body{margin:0;width:1200px;height:630px;background:#F5F3EE;color:#17222B}
  body{display:flex;align-items:center;justify-content:center;gap:56px}
  img{width:340px;height:340px}
  h1{margin:0;font:600 92px/1.02 'Cormorant Garamond',serif}
  p{margin:18px 0 0;font:500 34px 'Karla',sans-serif;letter-spacing:.04em}
  .bar{width:96px;height:6px;background:#C8A44D;margin-top:28px}
</style>
<img src="data:image/png;base64,${logo}" alt="">
<div><h1>Iglesia Evangélica<br>El Camino</h1><div class="bar"></div><p>Barbate · Cádiz</p></div>`;

const dir = mkdtempSync(join(tmpdir(), 'og-'));
const fichero = join(dir, 'og.html');
const captura = join(dir, 'og.png');
writeFileSync(fichero, html);
execFileSync(chrome, [
  '--headless=new', '--disable-gpu', '--hide-scrollbars', '--window-size=1200,630',
  '--virtual-time-budget=15000', `--screenshot=${captura}`, pathToFileURL(fichero).href,
]);
await sharp(captura)
  .resize(1200, 630)
  .png({ compressionLevel: 9, palette: true, quality: 90 })
  .toFile('public/og-default.png');
