import { PiezaVideo } from './pieza-video';

/** Archivo de prédicas de la web. Añadir una nueva es escribir una entrada más en
 *  `PREDICAS`: no hace falta tocar ningún componente.
 *
 *  Todavía no hay ninguna prédica real grabada y publicada — las entradas de aquí abajo
 *  son solo ejemplo de maquetación (sin vídeo real), marcadas con `esEjemplo: true` y con
 *  `aviso` visible en la propia ficha. Cuando la iglesia entregue prédicas reales, se
 *  añaden como entradas nuevas con `esEjemplo: false` y `aviso: null`.
 */
export const PREDICAS: readonly PiezaVideo[] = [
  {
    id: 'ejemplo-1',
    titulo: 'Título de ejemplo de una prédica',
    youtubeId: '',
    fecha: 'Fecha de ejemplo',
    duracion: null,
    resumen: 'Resumen de ejemplo, de dos o tres frases, para probar cómo queda el texto en la ficha.',
    aviso: 'Ejemplo provisional: no es una prédica real. Se sustituye por contenido real de la iglesia.',
    esEjemplo: true,
    pasaje: 'Pasaje de ejemplo',
    predicador: 'Nombre de ejemplo',
    spotifyUrl: null,
  },
  {
    id: 'ejemplo-2',
    titulo: 'Otro título de ejemplo',
    youtubeId: '',
    fecha: 'Fecha de ejemplo',
    duracion: null,
    resumen: null,
    aviso: 'Ejemplo provisional: no es una prédica real. Se sustituye por contenido real de la iglesia.',
    esEjemplo: true,
    pasaje: 'Pasaje de ejemplo',
    predicador: 'Nombre de ejemplo',
    spotifyUrl: null,
  },
  {
    id: 'ejemplo-3',
    titulo: 'Tercer título de ejemplo',
    youtubeId: '',
    fecha: 'Fecha de ejemplo',
    duracion: null,
    resumen: 'Resumen de ejemplo para comprobar la rejilla del archivo con varias fichas seguidas.',
    aviso: 'Ejemplo provisional: no es una prédica real. Se sustituye por contenido real de la iglesia.',
    esEjemplo: true,
    pasaje: 'Pasaje de ejemplo',
    predicador: 'Nombre de ejemplo',
    spotifyUrl: null,
  },
];

/** Prédicas reales (no ejemplo). Vacío hasta que la iglesia entregue grabaciones. */
export const PREDICAS_REALES: readonly PiezaVideo[] = PREDICAS.filter((p) => !p.esEjemplo);
