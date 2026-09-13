import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import { PiezaVideo } from '../../data/pieza-video';

/** Ficha con carátula de YouTube en facade: sirve tanto para prédicas (con pasaje y
 *  predicador) como para vídeos de actividades de la iglesia (sin esos campos) — ambas
 *  listas comparten la forma `PiezaVideo`. El reproductor no entra hasta que se pulsa.
 */
@Component({
  selector: 'app-video-card',
  imports: [FaIconComponent],
  templateUrl: './video-card.html',
  styleUrl: './video-card.scss',
})
export class VideoCard {
  @Input({ required: true }) pieza!: PiezaVideo;
  /** Solo el archivo de /ensenanza muestra la línea de Spotify bajo la ficha. */
  @Input() mostrarSpotify = false;

  @ViewChild('reproductor') private reproductorRef?: ElementRef<HTMLIFrameElement>;

  protected readonly iconoPlay = faPlay;
  protected readonly iconoSpotify = faSpotify;
  protected reproduciendo = false;
  protected safeUrl: SafeResourceUrl | undefined;

  private sanitizer = inject(DomSanitizer);

  get caratulaUrl(): string {
    return `https://img.youtube.com/vi/${this.pieza.youtubeId}/hqdefault.jpg`;
  }

  reproducir(): void {
    if (!this.pieza.youtubeId) {
      return;
    }
    const url = `https://www.youtube.com/embed/${this.pieza.youtubeId}?autoplay=1`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.reproduciendo = true;
    // El iframe todavía no existe en el DOM en este mismo ciclo (entra con @if); se enfoca
    // en el siguiente tick, cuando Angular ya lo ha renderizado.
    setTimeout(() => this.reproductorRef?.nativeElement.focus());
  }
}
