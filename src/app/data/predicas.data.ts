import { PiezaVideo } from './pieza-video';

/** Archivo de prédicas de la web. Añadir una nueva es escribir una entrada más en
 *  `PREDICAS`: no hace falta tocar ningún componente.
 */
export const PREDICAS: readonly PiezaVideo[] = [
  {
    id: 'JGxcLFu9t0g',
    titulo: 'El renuevo',
    youtubeId: 'JGxcLFu9t0g',
    fecha: '7 de septiembre de 2026',
    duracion: '42:51',
    // Pendiente: lo facilita la iglesia. No se inventa — es el único texto que Google puede
    // leer del vídeo, y la ficha ya se comporta bien sin él (ver video-card.html).
    resumen: null,
    aviso: null,
    esEjemplo: false,
    pasaje: 'Zacarías 6:12-13',
    predicador: 'Francisco Manuel López',
    // Todavía no está subida a Spotify: sin enlace no hay línea de Spotify en la ficha.
    spotifyUrl: null,
  },
];

/** Prédicas reales (no ejemplo). */
export const PREDICAS_REALES: readonly PiezaVideo[] = PREDICAS.filter((p) => !p.esEjemplo);
