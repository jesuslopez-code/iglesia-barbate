import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { WhatsappWidget } from '../../components/whatsapp-widget/whatsapp-widget';
import { VideoCarousel } from '../../components/video-carousel/video-carousel';
import { PREDICAS_REALES } from '../../data/predicas.data';
import {
  CORREO_HREF,
  CORREO_TEXTO,
  DIRECCION_TEXTO,
  REUNIONES,
  TELEFONO_HREF,
  TELEFONO_TEXTO,
  horaActual,
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
  // Resumen rápido, no la referencia exhaustiva (esa es `/horarios`, enlazada aquí mismo): se
  // recalcula con la fecha real en cuanto el navegador hidrata el componente, así que solo el
  // HTML servido antes de ejecutar JS puede mostrar la hora de la temporada en que se hizo el
  // build. Para una fuente siempre correcta incluso sin JS, ver `/horarios`.
  protected readonly horaActual = horaActual();
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

  // Bloque "Últimas prédicas" de la portada: carrusel de vídeo que enlaza al archivo completo
  // en /ensenanza. La plantilla y app-video-carousel no cambian si el contenido cambia; solo
  // estas constantes.
  protected readonly piezasDestacadas = PREDICAS_REALES;
  protected readonly piezasTitulo = 'Últimas prédicas';
  protected readonly piezasDescripcion = 'Escucha las últimas prédicas de la iglesia.';
  protected readonly piezasEnlace = '/ensenanza';
  protected readonly piezasEnlaceTexto = 'Ver todas las prédicas →';
}
