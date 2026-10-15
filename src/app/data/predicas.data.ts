import { PiezaVideo } from './pieza-video';

/** Archivo de prédicas de la web. Añadir una nueva es escribir una entrada más en
 *  `PREDICAS`: no hace falta tocar ningún componente.
 */
export const PREDICAS: readonly PiezaVideo[] = [
  {
    id: 'FOvhXSzbjn0',
    titulo: 'Zoe: ¿Vives o existes?',
    youtubeId: 'FOvhXSzbjn0',
    fecha: '13 de septiembre de 2026',
    duracion: '37:39',
    resumen:
      'Una confrontante enseñanza sobre la diferencia entre la mera existencia biológica (Bíos) y la verdadera vida divina en abundancia (Zoe) que solo podemos experimentar al reconectarnos con Jesucristo.',
    aviso: null,
    esEjemplo: false,
    // La descripción del vídeo no cita un pasaje bíblico: no se deduce uno.
    pasaje: null,
    predicador: 'Francisco Manuel López',
    // Todavía no está subida a Spotify: sin enlace no hay línea de Spotify en la ficha.
    spotifyUrl: null,
  },
  {
    id: 'JGxcLFu9t0g',
    titulo: 'El renuevo',
    youtubeId: 'JGxcLFu9t0g',
    fecha: '7 de septiembre de 2026',
    duracion: '42:51',
    resumen:
      'Predicación basada en la profecía de Zacarías 6:12, que nos recuerda que Dios rompe esquemas y tradiciones para traer esperanza en medio del desánimo y los escombros de la vida. A través del significado profundo del Renuevo y del sacrificio de Jesucristo, este mensaje revela cómo la presencia divina es la única capaz de hacer brotar vida, restauración y fruto donde solo había sequedad y muerte.',
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
