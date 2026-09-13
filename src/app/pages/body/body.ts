import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WhatsappWidget } from '../../components/whatsapp-widget/whatsapp-widget';
import { VideoCarousel } from '../../components/video-carousel/video-carousel';
import { ACTIVIDADES_REALES } from '../../data/actividades.data';
// import { PREDICAS_REALES } from '../../data/predicas.data'; // cuando haya prédicas reales

@Component({
  selector: 'app-body',
  imports: [RouterLink, WhatsappWidget, VideoCarousel],
  templateUrl: './body.html',
  styleUrl: './body.scss',
})
export class Body {
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
