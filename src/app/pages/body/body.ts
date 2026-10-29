import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CampanaAviso } from '../../components/campana-aviso/campana-aviso';
import { VideoCard } from '../../components/video-card/video-card';
import { PortadaDescubre } from './portada-descubre/portada-descubre';
import { PortadaHero } from './portada-hero/portada-hero';
import { PREDICAS_REALES } from '../../data/predicas.data';
import {
  CORREO_HREF,
  CORREO_TEXTO,
  DIRECCION_TEXTO,
  REUNIONES,
  REUNION_DOMINGO,
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
  imports: [RouterLink, VideoCard, CampanaAviso, PortadaHero, PortadaDescubre],
  templateUrl: './body.html',
  styleUrl: './body.scss',
})
export class Body {
  private readonly sanitizer = inject(DomSanitizer);

  // Horarios, dirección, teléfono y correo salen del mismo fichero de datos que `/horarios` y
  // `/contacto`: las tarjetas los reúnen, no los reescriben. Domingo primero: es el culto al que
  // se invita a las visitas.
  protected readonly reuniones = [
    REUNION_DOMINGO,
    ...REUNIONES.filter((reunion) => reunion.id !== REUNION_DOMINGO.id),
  ];
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

  // `loading="lazy"` en el iframe (body.html) basta para que el navegador no lo descargue hasta
  // que se acerque al viewport.
  protected readonly mapaUrl: SafeResourceUrl =
    this.sanitizer.bypassSecurityTrustResourceUrl(MAPA_UBICACION_URL);

  // La tarjeta «Última prédica» muestra solo la más reciente (la lista va de más nueva a más
  // antigua); el archivo completo está en /ensenanza. Si no hay prédicas reales, la tarjeta
  // queda con el enlace al archivo.
  protected readonly ultimaPredica = PREDICAS_REALES[0];
}
