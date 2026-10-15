import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import {
  CORREO_TEXTO,
  DIRECCION_ESTRUCTURADA,
  REUNIONES,
  TELEFONO_TEXTO,
  TEMPORADAS,
} from '../../data/horarios.data';

const SITIO_URL = 'https://icelcamino.com';

/** Los `dia` de `REUNIONES` son texto para mostrar («Jueves», «Domingos»); schema.org exige la
 *  URI del día. Si algún día no está en este mapa, se omite esa reunión del JSON-LD en vez de
 *  inventar una URI incorrecta. */
const DIA_SCHEMA: Record<string, string> = {
  Lunes: 'https://schema.org/Monday',
  Martes: 'https://schema.org/Tuesday',
  Miércoles: 'https://schema.org/Wednesday',
  Jueves: 'https://schema.org/Thursday',
  Viernes: 'https://schema.org/Friday',
  Sábado: 'https://schema.org/Saturday',
  Domingos: 'https://schema.org/Sunday',
  Domingo: 'https://schema.org/Sunday',
};

/**
 * Inserta una única vez, en el `<head>`, los datos estructurados (JSON-LD, tipo `Church`) del
 * sitio: nombre, dirección, teléfono, correo y horario de cultos. Todo leído de
 * `data/horarios.data.ts` — fuente única, nada se repite a mano aquí.
 */
@Injectable({ providedIn: 'root' })
export class StructuredData {
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.insertar();
  }

  private insertar(): void {
    if (this.document.getElementById('ld-json-church')) {
      return;
    }

    const datos = {
      '@context': 'https://schema.org',
      '@type': 'Church',
      name: 'Iglesia El Camino',
      url: SITIO_URL,
      logo: `${SITIO_URL}/logo/logo-512.png`,
      telephone: TELEFONO_TEXTO,
      email: CORREO_TEXTO,
      address: {
        '@type': 'PostalAddress',
        streetAddress: DIRECCION_ESTRUCTURADA.calle,
        postalCode: DIRECCION_ESTRUCTURADA.codigoPostal,
        addressLocality: DIRECCION_ESTRUCTURADA.localidad,
        addressRegion: DIRECCION_ESTRUCTURADA.provincia,
        addressCountry: DIRECCION_ESTRUCTURADA.pais,
      },
      // La hora cambia según la temporada: en vez de modelar fechas de vigencia (`validFrom`/
      // `validThrough`), que complicaría el esquema sin aportar nada que no aporten ya estas
      // cuatro combinaciones, se da una entrada por cada día×temporada (jueves/domingo ×
      // invierno/verano). Un lector de JSON-LD que no entienda la simplificación igual ve el
      // horario correcto para una de las dos épocas del año.
      openingHoursSpecification: REUNIONES.filter((reunion) => DIA_SCHEMA[reunion.dia]).flatMap(
        (reunion) =>
          Object.values(TEMPORADAS).map((temporada) => ({
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: DIA_SCHEMA[reunion.dia],
            opens: temporada.hora,
          })),
      ),
    };

    const script = this.document.createElement('script');
    script.id = 'ld-json-church';
    script.type = 'application/ld+json';
    script.text = JSON.stringify(datos);
    this.document.head.appendChild(script);
  }
}
