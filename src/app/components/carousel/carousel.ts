import { Component, Input } from '@angular/core';

interface CarouselSlide {
  readonly src: string;
  readonly srcset: string | null;
  /** Mismo `srcset` en WebP, mismos anchos y orden que `srcset` — null si la foto no tiene
   *  derivados (solo `foto1.jpg`, que se sirve directa). */
  readonly srcsetWebp: string | null;
  readonly width: number;
  readonly height: number;
  readonly alt: string;
}

// Fotos reales de la iglesia. Derivados -960 generados a partir de los .JPG de cámara
// (sin optimizar) para no servir el archivo original en móvil; foto1.jpg ya venía ligera
// y no necesita derivado.
@Component({
  selector: 'app-carousel',
  imports: [],
  templateUrl: './carousel.html',
  styleUrl: './carousel.scss',
})
export class Carousel {
  // Hoy el único sitio que monta este componente es la galería de /conocenos (know.html), donde
  // el carrusel no es lo primero que se ve al cargar: la primera foto lleva `loading="lazy"`
  // igual que el resto. Si algún día se vuelve a usar en la banda de portada (como LCP, fuera de
  // scroll), pasar `[prioritaria]="true"` desde ese contexto — no cambiar el valor por defecto.
  @Input() prioritaria = false;

  // Aproximación común a los dos contextos donde puede vivir: la banda de portada (máx. 64rem) y
  // la galería dentro del contenedor de Bootstrap (máx. 1140px desde xl).
  readonly sizes = '(min-width: 1200px) 1140px, 100vw';

  readonly slides: readonly CarouselSlide[] = [
    {
      src: '/photos-iglesia/foto1.jpg',
      srcset: null,
      srcsetWebp: '/photos-iglesia/foto1.webp',
      width: 739,
      height: 596,
      alt: 'Interior del templo durante un culto: el pastor predica de pie tras el atril ante la congregación sentada',
    },
    {
      src: '/photos-iglesia/bautizo1.JPG',
      srcset: '/photos-iglesia/bautizo1-960.jpg 960w, /photos-iglesia/bautizo1.JPG 1599w',
      srcsetWebp: '/photos-iglesia/bautizo1-960.webp 960w, /photos-iglesia/bautizo1.webp 1599w',
      width: 1599,
      height: 1200,
      alt: 'Grupo de la iglesia reunido en un jardín junto a una piscina, escuchando de pie una enseñanza al aire libre',
    },
    {
      src: '/photos-iglesia/bautizo2.JPG',
      srcset: '/photos-iglesia/bautizo2-960.jpg 960w, /photos-iglesia/bautizo2.JPG 1599w',
      srcsetWebp: '/photos-iglesia/bautizo2-960.webp 960w, /photos-iglesia/bautizo2.webp 1599w',
      width: 1599,
      height: 1200,
      alt: 'Seis miembros de la iglesia con camisetas blancas con el lema «He decidido seguir a Cristo», posando en el jardín antes del bautismo',
    },
    {
      src: '/photos-iglesia/bautizo3.JPG',
      srcset: '/photos-iglesia/bautizo3-960.jpg 960w, /photos-iglesia/bautizo3.JPG 1599w',
      srcsetWebp: '/photos-iglesia/bautizo3-960.webp 960w, /photos-iglesia/bautizo3.webp 1599w',
      width: 1599,
      height: 1200,
      alt: 'La congregación orando de pie en círculo sobre el césped, con un hombre tocando la guitarra',
    },
    {
      src: '/photos-iglesia/bautizo4.JPG',
      srcset: '/photos-iglesia/bautizo4-960.jpg 960w, /photos-iglesia/bautizo4.JPG 1600w',
      srcsetWebp: '/photos-iglesia/bautizo4-960.webp 960w, /photos-iglesia/bautizo4.webp 1600w',
      width: 1600,
      height: 1200,
      alt: 'El grupo de bautismo posando junto a la casa y la piscina del jardín, todos vestidos de blanco',
    },
    {
      src: '/photos-iglesia/bautizo5-1920.jpg',
      srcset: '/photos-iglesia/bautizo5-960.jpg 960w, /photos-iglesia/bautizo5-1920.jpg 1920w',
      srcsetWebp: '/photos-iglesia/bautizo5-960.webp 960w, /photos-iglesia/bautizo5-1920.webp 1920w',
      width: 1920,
      height: 1440,
      alt: 'El grupo de bautismo posando en la orilla de la playa, vestidos de blanco, con el mar de fondo',
    },
    {
      src: '/photos-iglesia/bautizo6-1920.jpg',
      srcset: '/photos-iglesia/bautizo6-960.jpg 960w, /photos-iglesia/bautizo6-1920.jpg 1920w',
      srcsetWebp: '/photos-iglesia/bautizo6-960.webp 960w, /photos-iglesia/bautizo6-1920.webp 1920w',
      width: 1920,
      height: 1440,
      alt: 'El grupo de espaldas en la playa, cogidos de la mano y con los brazos levantados hacia el mar, en el momento del bautismo',
    },
  ];
}
