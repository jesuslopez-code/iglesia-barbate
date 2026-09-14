import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WhatsappWidget } from '../../components/whatsapp-widget/whatsapp-widget';
import { VideoCarousel } from '../../components/video-carousel/video-carousel';
import { ACTIVIDADES_REALES } from '../../data/actividades.data';
// import { PREDICAS_REALES } from '../../data/predicas.data'; // cuando haya prédicas reales
import {
  CORREO_HREF,
  CORREO_TEXTO,
  DIRECCION_TEXTO,
  REUNIONES,
  TELEFONO_HREF,
  TELEFONO_TEXTO,
} from '../../data/horarios.data';
import {
  MAPA_UBICACION_ENLACE,
  MAPA_UBICACION_TITULO,
  MAPA_UBICACION_URL,
} from '../../core/location/map';

@Component({
  selector: 'app-body',
  imports: [RouterLink, WhatsappWidget, VideoCarousel],
  templateUrl: './body.html',
  styleUrl: './body.scss',
})
export class Body {
  private readonly sanitizer = inject(DomSanitizer);

  // Horarios, dirección, teléfono y correo salen del mismo fichero de datos que `/horarios` y
  // `/contacto`: este bloque los reúne, no los reescribe.
  protected readonly reuniones = REUNIONES;
  protected readonly direccion = DIRECCION_TEXTO;
  protected readonly telefonoTexto = TELEFONO_TEXTO;
  protected readonly telefonoHref = TELEFONO_HREF;
  protected readonly correoTexto = CORREO_TEXTO;
  protected readonly correoHref = CORREO_HREF;
  protected readonly mapaEnlace = MAPA_UBICACION_ENLACE;
  protected readonly mapaTitulo = MAPA_UBICACION_TITULO;

  // El mapa se ve directamente: ya no hay marcador ni carga bajo demanda (eso ahora solo aplica
  // al reproductor de vídeo, donde el ahorro es mucho mayor). `loading="lazy"` en el iframe
  // (body.html) basta para que el navegador no lo descargue hasta que se acerque al viewport.
  protected readonly mapaUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(MAPA_UBICACION_URL);

  // Todavía no hay prédicas grabadas: el bloque "Últimas prédicas" de la portada muestra de
  // momento los vídeos de actividades de la iglesia, con su propio rótulo y enlazando a la
  // galería. El día que haya prédicas reales, cambiar estas cuatro constantes (piezas,
  // titulo, descripcion, enlace/enlaceTexto por las de predicas.data.ts) es lo único que
  // hace falta: la plantilla y el carrusel no cambian.
  protected readonly piezasDestacadas = ACTIVIDADES_REALES;
  protected readonly piezasTitulo = 'Últimas actividades';
  protected readonly piezasDescripcion =
    'Teatro, danza y otros momentos compartidos en la iglesia, en vídeo.';
  protected readonly piezasEnlace = '/conocenos';
  protected readonly piezasEnlaceTexto = 'Ver más vídeos →';
}
