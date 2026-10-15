/** Reunión semanal: día y actividad que se hace ese día. La hora depende de la temporada (ver
 *  `TEMPORADAS` y `horaActual`), así que no se guarda aquí — mezclar un dato fijo (día,
 *  actividad) con uno variable (hora) en la misma fila invitaría a que alguien lo lea como fijo. */
export interface Reunion {
  readonly id: string;
  readonly dia: string;
  readonly actividad: string;
}

export const REUNIONES: readonly Reunion[] = [
  { id: 'jueves', dia: 'Jueves', actividad: 'Oración e intercesión' },
  { id: 'domingo', dia: 'Domingos', actividad: 'Culto principal y El Camino Kids' },
];

/** Las reuniones se adelantan una hora en verano. Única fuente de las horas por temporada: todo
 *  el sitio (`/horarios`, la portada, el JSON-LD) lee de aquí, nunca escribe "19:00"/"20:00" a
 *  mano. */
export const TEMPORADAS = {
  invierno: { nombre: 'Invierno', meses: 'octubre a abril', hora: '19:00' },
  verano: { nombre: 'Verano', meses: 'mayo a septiembre', hora: '20:00' },
} as const;

/** Hora de las reuniones según la fecha dada (por defecto, ahora). Pensada para resúmenes que se
 *  recalculan en el navegador tras la hidratación (p. ej. la portada); una referencia exhaustiva
 *  y siempre correcta sin JS, como `/horarios`, debe mostrar las dos temporadas explícitamente
 *  en vez de depender de esta función. */
export function horaActual(fecha: Date = new Date()): string {
  const mes = fecha.getMonth() + 1;
  const esVerano = mes >= 5 && mes <= 9;
  return esVerano ? TEMPORADAS.verano.hora : TEMPORADAS.invierno.hora;
}

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
/** Mismo número que `TELEFONO_HREF`, en el formato internacional sin `+` que piden los enlaces de WhatsApp. */
export const WHATSAPP_NUMERO = '34622532240';
