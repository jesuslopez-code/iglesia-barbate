import { Campana } from './campana';

export const CAMPANAS: readonly Campana[] = [
  {
    slug: 'hijos-de-luz',
    titulo: 'Hijos de luz en tiempos de tinieblas',
    ocasion: 'Halloween 2026',
    inicio: '2026-10-19',
    fin: '2026-11-02',
    lema: 'Jesús no te llama a huir de la oscuridad: te llama a brillar en medio de ella.',
    versiculo: {
      texto: 'Ahora sois luz en el Señor; andad como hijos de luz',
      referencia: 'Efesios 5:8',
    },
    imagen: '/descargas/hijos-de-luz/portada.jpg',
    imagenAncho: 1600,
    imagenAlto: 900,
    imagenOg: '/descargas/hijos-de-luz/og.jpg',
    imagenAlt:
      'Un camino de montaña al amanecer, con la luz del sol naciente iluminando el sendero',
    sol: { x: 80, y: 35 },
    resumen:
      'Halloween y discernimiento bíblico: por qué en la Iglesia El Camino elegimos celebrar la luz de Jesús. Textos, cartel y folleto para descargar y compartir.',
    secciones: [
      {
        titulo: 'Hijos de luz',
        parrafos: [
          'Halloween nos ofrece una ocasión para reflexionar sobre nuestra fe y lo que enseñamos en nuestros hogares. Como cristianos, queremos que nuestras decisiones reflejen nuestra identidad en Jesús.',
        ],
      },
      {
        titulo: '¿Por qué no celebramos Halloween?',
        parrafos: [
          'Como Iglesia El Camino, decidimos no celebrar Halloween porque queremos que nuestras celebraciones reflejen la vida y la luz que encontramos en Jesús. Evitamos las prácticas ocultistas y la exaltación del miedo, la muerte o la brujería. Nuestra decisión se apoya en el llamado bíblico a comprobar lo que agrada al Señor y a no participar en las obras de las tinieblas (Efesios 5:8-11; Deuteronomio 18:10-12). Expresamos esta convicción con respeto y amor hacia quienes piensan de otra manera.',
          'Como Iglesia El Camino, queremos vivir en bondad, justicia y verdad, anunciando a Jesús con nuestras palabras y nuestras acciones.',
        ],
      },
    ],
    puntos: [
      {
        texto:
          'Jesús es la luz del mundo. En él encontramos vida, esperanza y libertad para caminar sin quedar dominados por el miedo.',
        referencia: 'Juan 8:12',
      },
      {
        texto:
          'La Biblia nos llama al discernimiento. Examinamos las costumbres y actividades a la luz de lo que agrada al Señor.',
        referencia: 'Romanos 12:2; Efesios 5:8-11',
      },
      {
        texto:
          'Buscamos nuestra orientación en Dios. Rechazamos la adivinación, la hechicería y la consulta a los muertos.',
        referencia: 'Deuteronomio 18:10-12',
      },
      {
        texto:
          'Cristo ha vencido. Su victoria en la cruz sostiene nuestra confianza y nuestra esperanza.',
        referencia: 'Colosenses 2:15',
      },
      {
        texto:
          'Nuestra fe se expresa en el amor. Acompañamos a nuestros hijos, oramos en familia y compartimos el evangelio con respeto hacia nuestros vecinos.',
        referencia: 'Mateo 5:14-16',
      },
    ],
    descargas: [
      {
        titulo: 'Cartel: Mi casa no celebra Halloween',
        descripcion: 'Cartel en formato A4 para imprimir y colocar en casa.',
        archivo: 'cartel-mi-casa-no-celebra-halloween.pdf',
        tipo: 'PDF',
        peso: '131 KB',
      },
      {
        titulo: 'Folleto: ¿Sabías de dónde viene Halloween?',
        descripcion: 'Folleto informativo para repartir y leer en familia.',
        archivo: 'folleto-hijos-de-luz.pdf',
        tipo: 'PDF',
        peso: '142 KB',
      },
    ],
    textoCompartir:
      'Hijos de luz en tiempos de tinieblas: por qué elegimos celebrar la luz de Jesús.',
  },
];

export function buscarCampana(slug: string): Campana | undefined {
  return CAMPANAS.find((campana) => campana.slug === slug);
}

/** Fecha de hoy en Barbate como AAAA-MM-DD. Se fija la zona horaria para que «activa» no dependa
 *  de dónde esté el navegador o el servidor de compilación. */
export function hoyIso(ahora: Date = new Date()): string {
  return ahora.toLocaleDateString('sv-SE', { timeZone: 'Europe/Madrid' });
}

/** «jueves 5 de noviembre de 2026» a partir de una fecha ISO. */
export function fechaLarga(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  });
}

/** «19 de octubre de 2026» (sin día de la semana), para rangos de fechas. */
export function fechaCorta(iso: string): string {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'Europe/Madrid',
  });
}

/** Días naturales que faltan desde `hoy` hasta `fecha` (ambas AAAA-MM-DD); negativo si ya pasó.
 *  Supuesto: ambas son días del calendario de Madrid (`hoyIso`), así que se restan como fechas
 *  UTC sin hora y el cambio de horario no afecta. */
export function diasHasta(fecha: string, hoy: string): number {
  const ms = Date.parse(`${fecha}T00:00:00Z`) - Date.parse(`${hoy}T00:00:00Z`);
  return Math.round(ms / 86_400_000);
}

export function estaActiva(campana: Campana, hoy: string): boolean {
  return campana.inicio <= hoy && hoy <= campana.fin;
}

/** Campañas de la más reciente a la más antigua por fecha de inicio. */
export function campanasRecientesPrimero(): Campana[] {
  return [...CAMPANAS].sort((a, b) => b.inicio.localeCompare(a.inicio));
}

/** Campaña activa hoy; si hubiera varias a la vez, la que empezó más tarde. */
export function campanaActiva(hoy: string): Campana | undefined {
  return campanasRecientesPrimero().find((campana) => estaActiva(campana, hoy));
}

/** Rutas de las variantes de la portada derivadas por convención (ver `Campana.imagen`). */
export function variantesPortada(imagen: string): {
  readonly jpg800: string;
  readonly webp: string;
  readonly webp800: string;
} {
  const base = imagen.replace(/\.jpg$/i, '');
  return { jpg800: `${base}-800.jpg`, webp: `${base}.webp`, webp800: `${base}-800.webp` };
}

export function rutaDescarga(campana: Campana, archivo: string): string {
  return `/descargas/${campana.slug}/${archivo}`;
}
