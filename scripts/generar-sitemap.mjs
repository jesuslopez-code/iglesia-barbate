// Genera public/sitemap.xml a partir de la definición real de rutas (src/app/app.routes.ts):
// nunca a mano, para que una ruta nueva no pueda quedar fuera del sitemap por descuido. Se
// ejecuta antes de `ng build` (hook "prebuild" de package.json) para que el propio `ng build`
// copie el fichero ya actualizado a dist/ vía el glob de `assets` de angular.json.
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import esbuild from 'esbuild';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rutasFichero = path.join(__dirname, '../src/app/app.routes.ts');
const sitemapFichero = path.join(__dirname, '../public/sitemap.xml');
const SITIO_URL = 'https://icelcamino.com';

const fuenteTs = readFileSync(rutasFichero, 'utf8');
const { code } = await esbuild.transform(fuenteTs, { loader: 'ts', format: 'esm' });
const moduloDataUrl = `data:text/javascript;base64,${Buffer.from(code).toString('base64')}`;
const { routes } = await import(moduloDataUrl);

// Solo rutas reales con su propia página: sin comodín ('**') y sin redirecciones (p.ej. 'know',
// que ya apunta a 'conocenos' y no debe aparecer como URL propia en el sitemap).
const paths = routes
  .filter((ruta) => typeof ruta.path === 'string' && ruta.path !== '**' && !ruta.redirectTo)
  .map((ruta) => ruta.path);

const urls = paths
  .map((ruta) => `  <url>\n    <loc>${SITIO_URL}/${ruta}</loc>\n  </url>`)
  .join('\n');

const xml =
  '<?xml version="1.0" encoding="UTF-8"?>\n' +
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  `${urls}\n` +
  '</urlset>\n';

writeFileSync(sitemapFichero, xml, 'utf8');
console.log(`sitemap.xml generado con ${paths.length} rutas.`);
