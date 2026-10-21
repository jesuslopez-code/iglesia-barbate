/** Una campaña temporal de la iglesia (Navidad, Semana Santa, Halloween…). Añadir una campaña es
 *  añadir una entrada a `CAMPANAS` (`campanas.data.ts`) y sus ficheros a
 *  `public/descargas/<slug>/`: ningún componente cambia. */
export interface CampanaVersiculo {
  readonly texto: string;
  readonly referencia: string;
}

export interface CampanaSeccion {
  readonly titulo: string;
  readonly parrafos: readonly string[];
}

export interface CampanaPunto {
  readonly texto: string;
  /** Referencia bíblica del punto; se pinta con `--ec-word`. */
  readonly referencia?: string;
}

export interface CampanaDescarga {
  readonly titulo: string;
  readonly descripcion: string;
  /** Nombre del fichero dentro de `public/descargas/<slug>/`. */
  readonly archivo: string;
  readonly tipo: 'PDF' | 'Imagen';
  /** Texto libre, p. ej. «180 KB». */
  readonly peso: string;
}

export interface CampanaEvento {
  readonly titulo: string;
  /** Fecha ISO (AAAA-MM-DD). */
  readonly fecha: string;
  /** Hora en formato 24 h (HH:MM). */
  readonly hora: string;
  readonly lugar: string;
  readonly mapsUrl: string;
}

export interface Campana {
  /** Último tramo de la URL (`/campanas/<slug>`) y nombre de la carpeta de `public/descargas/`. */
  readonly slug: string;
  readonly titulo: string;
  readonly lema: string;
  readonly ocasion: string;
  /** Fechas ISO (AAAA-MM-DD), ambas inclusive: deciden si la campaña está activa. */
  readonly inicio: string;
  readonly fin: string;
  readonly versiculo: CampanaVersiculo;
  /** Ruta absoluta de la portada JPEG de 1600 px de ancho. Por convención, junto a ella están
   *  `portada.webp`, `portada-800.jpg` y `portada-800.webp` (mismo nombre, sufijo `-800` para la
   *  versión de 800 px). */
  readonly imagen: string;
  readonly imagenAncho: number;
  readonly imagenAlto: number;
  /** Ruta absoluta de la imagen Open Graph (1200x630). */
  readonly imagenOg: string;
  readonly imagenAlt: string;
  /** Posición del sol en la portada, en % desde la izquierda y desde arriba: ahí nace el
   *  resplandor del amanecer. Por defecto 80 / 35. */
  readonly sol?: { readonly x: number; readonly y: number };
  /** Descripción para metadatos y para la ficha del índice. */
  readonly resumen: string;
  readonly secciones: readonly CampanaSeccion[];
  readonly puntos?: readonly CampanaPunto[];
  readonly descargas: readonly CampanaDescarga[];
  readonly evento?: CampanaEvento;
  readonly textoCompartir: string;
}
