import { PiezaVideo } from './pieza-video';

/** Vídeos de otras actividades de la iglesia (teatro, danza, eventos) — distintos del
 *  archivo de prédicas: no llevan pasaje ni predicador. Viven en `/conocenos` y, mientras
 *  no haya prédicas reales, también ocupan el bloque de la portada (ver `body.ts`).
 */
export const ACTIVIDADES: readonly PiezaVideo[] = [
  {
    id: 'hTvfKVTzu2w',
    titulo: 'El vive',
    youtubeId: 'hTvfKVTzu2w',
    fecha: null,
    duracion: null,
    resumen: null,
    aviso: null,
    esEjemplo: false,
  },
  {
    id: 'Y-Q7HxRv1_M',
    titulo: 'Danza en el desierto',
    youtubeId: 'Y-Q7HxRv1_M',
    fecha: null,
    duracion: null,
    resumen: null,
    aviso: null,
    esEjemplo: false,
  },
];

/** Actividades reales (no ejemplo). Hoy son todas; el filtro queda por simetría con
 *  `PREDICAS_REALES` si algún día se añade una entrada de ejemplo aquí también. */
export const ACTIVIDADES_REALES: readonly PiezaVideo[] = ACTIVIDADES.filter((a) => !a.esEjemplo);
