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
