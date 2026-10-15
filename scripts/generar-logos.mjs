import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const origen = 'scripts/origen/logo-sin-fondo.png';
const papel = { r: 245, g: 243, b: 238, alpha: 1 };

// Recorte al contenido útil con margen, en cuadrado: la fuente trae mucho aire transparente.
const { data, info } = await sharp(origen).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
let [x0, y0, x1, y1] = [info.width, info.height, 0, 0];
for (let y = 0; y < info.height; y++) {
  for (let x = 0; x < info.width; x++) {
    if (data[(y * info.width + x) * 4 + 3] > 8) {
      x0 = Math.min(x0, x); x1 = Math.max(x1, x);
      y0 = Math.min(y0, y); y1 = Math.max(y1, y);
    }
  }
}
const lado = Math.ceil(Math.max(x1 - x0 + 1, y1 - y0 + 1) * 1.04);
const cx = Math.round((x0 + x1) / 2);
const cy = Math.round((y0 + y1) / 2);
const izq = Math.max(0, Math.min(info.width - lado, cx - Math.floor(lado / 2)));
const arr = Math.max(0, Math.min(info.height - lado, cy - Math.floor(lado / 2)));
const cuadrado = await sharp(origen)
  .extract({ left: izq, top: arr, width: lado, height: lado })
  .png()
  .toBuffer();

await mkdir('public/logo', { recursive: true });
const salida = (n) => `public/logo/${n}`;
const redim = (px) => sharp(cuadrado).resize(px, px, { kernel: 'lanczos3' });

for (const px of [88, 320]) {
  await redim(px).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(salida(`logo-${px}.png`));
  if (px === 88) await redim(px).webp({ quality: 85, alphaQuality: 90 }).toFile(salida(`logo-${px}.webp`));
}
await redim(512).png({ compressionLevel: 9, palette: true, quality: 90 }).toFile(salida('logo-512.png'));
await redim(32).png({ compressionLevel: 9 }).toFile(salida('favicon-32.png'));
// iOS rellena de negro la transparencia: el icono táctil va sobre el papel de la marca.
await sharp({ create: { width: 180, height: 180, channels: 4, background: papel } })
  .composite([{ input: await redim(148).png().toBuffer(), gravity: 'center' }])
  .png({ compressionLevel: 9 })
  .toFile(salida('apple-touch-icon.png'));
console.log('recorte', { izq, arr, lado });
