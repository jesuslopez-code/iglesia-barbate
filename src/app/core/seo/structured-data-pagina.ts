import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Campana } from '../../data/campana';
import { PiezaVideo } from '../../data/pieza-video';
import { DIRECCION_ESTRUCTURADA } from '../../data/horarios.data';
import { SITIO_URL } from './seo';

const ID_VIDEOS = 'ld-json-videos';
const ID_EVENTO = 'ld-json-evento';

const MESES: Record<string, string> = {
  enero: '01',
  febrero: '02',
  marzo: '03',
  abril: '04',
  mayo: '05',
  junio: '06',
  julio: '07',
  agosto: '08',
  septiembre: '09',
  octubre: '10',
  noviembre: '11',
  diciembre: '12',
};

/** «20 de septiembre de 2026» → «2026-09-20». `null` si el texto no encaja: mejor omitir
 *  `uploadDate` que inventarlo. */
function fechaIso(texto: string | null): string | null {
  const partes = texto?.match(/^(\d{1,2}) de (\p{L}+) de (\d{4})$/u);
  const mes = partes ? MESES[partes[2].toLowerCase()] : undefined;
  return partes && mes ? `${partes[3]}-${mes}-${partes[1].padStart(2, '0')}` : null;
}

/** «53:18» o «1:02:03» → «PT53M18S» / «PT1H2M3S». `null` si no encaja. */
function duracionIso(texto: string | null): string | null {
  const partes = texto?.match(/^(?:(\d+):)?(\d{1,2}):(\d{2})$/);
  if (!partes) {
    return null;
  }
  const [, horas, minutos, segundos] = partes;
  return `PT${horas ? `${Number(horas)}H` : ''}${Number(minutos)}M${Number(segundos)}S`;
}


/** Último domingo del mes (0 = enero) de un año, como día del mes. */
function ultimoDomingo(anio: number, mes: number): number {
  const ultimo = new Date(Date.UTC(anio, mes + 1, 0));
  return ultimo.getUTCDate() - ultimo.getUTCDay();
}

/** Desfase de Europa/Madrid para una fecha y hora locales (AAAA-MM-DD, HH:MM): +02:00 entre el
 *  último domingo de marzo y el último de octubre (a la 01:00 UTC), +01:00 el resto del año. */
function desfaseMadrid(fecha: string, hora: string): string {
  const [anio, mes, dia] = fecha.split('-').map(Number);
  const [horas, minutos] = hora.split(':').map(Number);
  const local = Date.UTC(anio, mes - 1, dia, horas, minutos) - 3_600_000;
  const verano =
    local >= Date.UTC(anio, 2, ultimoDomingo(anio, 2), 1) &&
    local < Date.UTC(anio, 9, ultimoDomingo(anio, 9), 1);
  return verano ? '+02:00' : '+01:00';
}

/**
 * Datos estructurados que dependen de la página (vídeos de prédicas, evento de una campaña). Vive
 * aparte de `StructuredData` para que su código llegue solo con las páginas perezosas que lo
 * usan y no engorde la descarga inicial.
 */
@Injectable({ providedIn: 'root' })
export class StructuredDataPagina {
  private readonly document = inject(DOCUMENT);

  /** `VideoObject` de cada pieza real con vídeo; sustituye al anterior (una sola vez por página).
   *  Solo se escriben los campos que los datos tienen: `uploadDate` es obligatorio para Google,
   *  así que una pieza sin fecha reconocible no entra, y `duration` se omite si no hay. */
  publicarVideos(piezas: readonly PiezaVideo[]): void {
    const videos = piezas
      .filter((pieza) => !pieza.esEjemplo && pieza.youtubeId)
      .flatMap((pieza) => {
        const subida = fechaIso(pieza.fecha);
        if (!subida) {
          return [];
        }
        const duracion = duracionIso(pieza.duracion);
        return [
          {
            '@type': 'VideoObject',
            name: pieza.titulo,
            description: pieza.resumen ?? pieza.titulo,
            thumbnailUrl: [`https://img.youtube.com/vi/${pieza.youtubeId}/hqdefault.jpg`],
            uploadDate: subida,
            contentUrl: `https://www.youtube.com/watch?v=${pieza.youtubeId}`,
            embedUrl: `https://www.youtube.com/embed/${pieza.youtubeId}`,
            ...(duracion ? { duration: duracion } : {}),
          },
        ];
      });
    this.escribir(
      ID_VIDEOS,
      videos.length ? { '@context': 'https://schema.org', '@graph': videos } : null,
    );
  }

  /** `Event` de una campaña, solo si tiene bloque `evento`; sin él no se escribe nada. */
  publicarEvento(campana: Campana): void {
    const evento = campana.evento;
    this.escribir(
      ID_EVENTO,
      evento
        ? {
            '@context': 'https://schema.org',
            '@type': 'Event',
            name: evento.titulo,
            description: campana.resumen,
            // Sin `endDate`: los datos del evento no traen hora de fin y no se inventa.
            startDate: `${evento.fecha}T${evento.hora}:00${desfaseMadrid(evento.fecha, evento.hora)}`,
            eventStatus: 'https://schema.org/EventScheduled',
            eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
            location: {
              '@type': 'Place',
              name: evento.lugar,
              url: evento.mapsUrl,
              // El evento solo trae el nombre del lugar: la dirección es la de la iglesia.
              address: {
                '@type': 'PostalAddress',
                streetAddress: DIRECCION_ESTRUCTURADA.calle,
                postalCode: DIRECCION_ESTRUCTURADA.codigoPostal,
                addressLocality: DIRECCION_ESTRUCTURADA.localidad,
                addressRegion: DIRECCION_ESTRUCTURADA.provincia,
                addressCountry: DIRECCION_ESTRUCTURADA.pais,
              },
            },
            image: [`${SITIO_URL}${campana.imagenOg}`],
            url: `${SITIO_URL}/campanas/${campana.slug}`,
            organizer: { '@type': 'Church', name: 'Iglesia El Camino', url: SITIO_URL },
          }
        : null,
    );
  }

  retirarVideos(): void {
    this.escribir(ID_VIDEOS, null);
  }

  retirarEvento(): void {
    this.escribir(ID_EVENTO, null);
  }

  private escribir(id: string, datos: object | null): void {
    this.document.getElementById(id)?.remove();
    if (!datos) {
      return;
    }
    const script = this.document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(datos);
    this.document.head.appendChild(script);
  }
}
