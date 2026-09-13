/** Forma común de una pieza con vídeo de YouTube en tarjeta: una prédica
 *  (`predicas.data.ts`) o un vídeo de actividad de la iglesia (`actividades.data.ts`).
 *  Ambas listas alimentan el mismo componente de presentación (`app-video-card`); lo que
 *  cambia es qué campos rellenan — una actividad no tiene pasaje ni predicador.
 *
 *  Campos desconocidos van a `null`, nunca inventados.
 */
export interface PiezaVideo {
  /** Identificador estable para @for; usa el id del vídeo de YouTube si lo hay. */
  readonly id: string;
  readonly titulo: string;
  /** Id del vídeo de YouTube (parte final de la URL). Vacío si la entrada es de ejemplo y
   *  no tiene vídeo real: la ficha muestra entonces una carátula de marcador de posición. */
  readonly youtubeId: string;
  readonly fecha: string | null;
  /** Texto libre, p. ej. "38 min". */
  readonly duracion: string | null;
  readonly resumen: string | null;
  /** Texto visible en la propia ficha cuando la entrada no es contenido real (ejemplo de
   *  maquetación). `null` si es una entrada real y no necesita aviso. */
  readonly aviso: string | null;
  readonly esEjemplo: boolean;
  /** Solo prédicas: pasaje bíblico, quién predicó y enlace de Spotify. */
  readonly pasaje?: string | null;
  readonly predicador?: string | null;
  readonly spotifyUrl?: string | null;
}
