/** URL del mapa embebido y su título, compartidos por Horarios y el pie de página para no
 *  duplicar la dirección literal ni el `title` del `iframe` en dos sitios. */
export const MAPA_UBICACION_URL =
  'https://maps.google.com/maps?q=Iglesia%20El%20Camino%2C%20Calle%20Dr.%20Patricio%20Castro%2C%2034%2C%2011160%20Barbate&t=&z=16&ie=UTF8&iwloc=&output=embed';

export const MAPA_UBICACION_TITULO = 'Mapa de ubicación de la Iglesia El Camino en Barbate';

/** Enlace (no embebido) a la misma ubicación: al pulsarlo en un móvil, el sistema operativo lo
 *  abre en la aplicación de mapas instalada en vez de en el iframe embebido de arriba. */
export const MAPA_UBICACION_ENLACE =
  'https://www.google.com/maps/search/?api=1&query=Iglesia+El+Camino%2C+Calle+Dr.+Patricio+Castro%2C+34%2C+11160+Barbate';
