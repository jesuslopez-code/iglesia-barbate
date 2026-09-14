/** Reunión semanal, con la actividad que se hace ese día cuando se conoce. La iglesia solo ha
 *  confirmado el día y la hora (jueves y domingos, 19:00); qué se hace cada día en concreto
 *  (culto, estudio bíblico...) queda pendiente de confirmar — ver `tareas.md`, fase 2. Por eso
 *  `actividad` es `null` en vez de un valor inventado. */
export interface Reunion {
  readonly id: string;
  readonly dia: string;
  readonly hora: string;
  readonly actividad: string | null;
}

export const REUNIONES: readonly Reunion[] = [
  { id: 'jueves', dia: 'Jueves', hora: '19:00', actividad: null },
  { id: 'domingo', dia: 'Domingos', hora: '19:00', actividad: null },
];

/** Dirección en texto plano, compartida por la portada y `/horarios` para no repetirla a mano
 *  en dos sitios. */
export const DIRECCION_TEXTO = 'Calle Doctor Patricio Castro, 34, 11160 Barbate (Cádiz)';

/** Los mismos datos de `DIRECCION_TEXTO`, desglosados para los datos estructurados (JSON-LD) de
 *  tipo `Church`: se guardan aquí, junto al texto, para no tener dos fuentes de la dirección. */
export const DIRECCION_ESTRUCTURADA = {
  calle: 'Calle Doctor Patricio Castro, 34',
  codigoPostal: '11160',
  localidad: 'Barbate',
  provincia: 'Cádiz',
  pais: 'ES',
} as const;

/** Teléfono y correo, compartidos por la portada y `/contacto` para no repetirlos a mano en dos
 *  sitios. El texto es para mostrar; `tel:`/`mailto:` para el `href`. */
export const TELEFONO_TEXTO = '+34 622 53 22 40';
export const TELEFONO_HREF = 'tel:+34622532240';
export const CORREO_TEXTO = 'info@icelcamino.com';
export const CORREO_HREF = 'mailto:info@icelcamino.com';
