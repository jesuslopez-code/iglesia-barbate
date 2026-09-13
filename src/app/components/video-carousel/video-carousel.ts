import { Component, Input } from '@angular/core';
import { VideoCard } from '../video-card/video-card';
import { PiezaVideo } from '../../data/pieza-video';

/** Carrusel accesible para piezas con vídeo (prédicas o actividades): una ficha visible a
 *  la vez, sin rotación automática, con flechas, teclado y arrastre en móvil. No reutiliza
 *  `app-carousel` (componente de fotos sueltas basado en el carrusel de Bootstrap, con
 *  autoplay por defecto y sin contador/puntos): montar aquí ese comportamiento por encima
 *  habría significado deshacer casi todo lo que trae, así que es una pieza propia y ligera.
 */
@Component({
  selector: 'app-video-carousel',
  imports: [VideoCard],
  templateUrl: './video-carousel.html',
  styleUrl: './video-carousel.scss',
})
export class VideoCarousel {
  @Input({ required: true }) piezas: readonly PiezaVideo[] = [];
  @Input() etiqueta = 'Vídeos recientes';
  /** Sustantivo usado en las etiquetas de las flechas y los puntos ("prédica", "vídeo"...),
   *  para que el anuncio a lector de pantalla tenga sentido con el contenido real mostrado. */
  @Input() sustantivo = 'vídeo';

  protected indice = 0;
  private inicioArrastreX: number | null = null;

  get actual(): PiezaVideo | undefined {
    return this.piezas[this.indice];
  }

  anterior(): void {
    if (this.piezas.length < 2) return;
    this.indice = (this.indice - 1 + this.piezas.length) % this.piezas.length;
  }

  siguiente(): void {
    if (this.piezas.length < 2) return;
    this.indice = (this.indice + 1) % this.piezas.length;
  }

  irA(indice: number): void {
    this.indice = indice;
  }

  onKeydown(evento: KeyboardEvent): void {
    if (evento.key === 'ArrowLeft') {
      evento.preventDefault();
      this.anterior();
    } else if (evento.key === 'ArrowRight') {
      evento.preventDefault();
      this.siguiente();
    }
  }

  onPointerDown(evento: PointerEvent): void {
    this.inicioArrastreX = evento.clientX;
  }

  onPointerUp(evento: PointerEvent): void {
    if (this.inicioArrastreX === null) return;
    const delta = evento.clientX - this.inicioArrastreX;
    this.inicioArrastreX = null;
    const umbral = 40;
    if (delta > umbral) {
      this.anterior();
    } else if (delta < -umbral) {
      this.siguiente();
    }
  }
}
