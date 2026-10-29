// Genera un .webp junto a cada JPEG de public/ que se sirve de verdad en el sitio (portada,
// carrusel de fotos y galería): no hay códec WebP disponible en este entorno de desarrollo
// (ni cwebp, ni ImageMagick, ni ffmpeg), así que se usa `sharp` (dependencia de desarrollo) en
// vez de generar los derivados a mano. Se ejecuta a demanda (`npm run imagenes:webp`), no en cada
// build: las fotos de origen no cambian con cada despliegue, solo cuando la iglesia trae fotos
// nuevas.
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, '../public');

// Mismos ficheros que las plantillas referencian de verdad como <img>/background-image (ver
// carousel.ts, body.html, body.scss). Los originales sin redimensionar de cámara (bautizoN.JPG)
// también entran: el carrusel los usa como el peldaño más grande del srcset de las fotos 1-4,
// que todavía no tienen derivado -1920.
const ficherosAConvertir = [
  'photos-iglesia/foto1.jpg',
  'photos-iglesia/bautizo1.JPG',
  'photos-iglesia/bautizo1-960.jpg',
  'photos-iglesia/bautizo2.JPG',
  'photos-iglesia/bautizo2-960.jpg',
  'photos-iglesia/bautizo3.JPG',
  'photos-iglesia/bautizo3-960.jpg',
  'photos-iglesia/bautizo4.JPG',
  'photos-iglesia/bautizo4-960.jpg',
  'photos-iglesia/bautizo5-960.jpg',
  'photos-iglesia/bautizo5-1920.jpg',
  'photos-iglesia/bautizo6-960.jpg',
  'photos-iglesia/bautizo6-1920.jpg',
];

let totalOrigen = 0;
let totalWebp = 0;

for (const relativo of ficherosAConvertir) {
  const origen = path.join(publicDir, relativo);
  // Mismo nombre con extensión .webp, junto al JPEG de origen (mantiene mayúsculas del nombre
  // base de los .JPG de cámara, solo cambia la extensión).
  const destino = origen.replace(/\.[^.]+$/, '.webp');

  const [{ size: pesoOrigen }] = await Promise.all([stat(origen)]);
  // calidad 82: la misma que se usó para generar los derivados JPEG -960/-1920 (ver notas del
  // carrusel), para no introducir un salto de calidad perceptible entre formatos.
  await sharp(origen).webp({ quality: 82 }).toFile(destino);
  const { size: pesoWebp } = await stat(destino);

  totalOrigen += pesoOrigen;
  totalWebp += pesoWebp;
  const ahorro = (100 * (1 - pesoWebp / pesoOrigen)).toFixed(0);
  console.log(
    `${relativo} -> ${path.basename(destino)}: ${(pesoOrigen / 1024).toFixed(1)} kB -> ${(pesoWebp / 1024).toFixed(1)} kB (-${ahorro}%)`,
  );
}

console.log(
  `\nTotal: ${(totalOrigen / 1024).toFixed(1)} kB -> ${(totalWebp / 1024).toFixed(1)} kB (-${(100 * (1 - totalWebp / totalOrigen)).toFixed(0)}%)`,
);
