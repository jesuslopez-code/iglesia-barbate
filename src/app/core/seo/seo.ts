import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export interface RouteSeo {
  readonly descripcion: string;
}

/** Sitio en producción, para construir URLs absolutas (canónica y Open Graph). */
const SITIO_URL = 'https://icelcamino.com';

/** Composición estática generada por `scripts/generar-og.mjs` (logo + nombre sobre papel hueso). */
const IMAGEN_OG_DEFECTO = {
  url: `${SITIO_URL}/og-default.png`,
  ancho: 1200,
  alto: 630,
};

function leerSeo(ruta: ActivatedRoute): RouteSeo | undefined {
  return ruta.snapshot.data['seo'] as RouteSeo | undefined;
}

/**
 * Aplica descripción, Open Graph y URL canónica en cada navegación, leyendo `data.seo` de
 * `app.routes.ts` — única fuente. Así una ruta nueva sin `data.seo` no puede colarse sin
 * metadatos: si falta, se avisa por consola en vez de servir una descripción vacía en silencio.
 * El título ya lo resuelve el `TitleStrategy` por defecto de Angular Router a partir de
 * `Route.title`, así que aquí no se toca `document.title` directamente salvo para leerlo.
 */
@Injectable({ providedIn: 'root' })
export class Seo {
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);

  constructor() {
    this.router.events
      .pipe(
        filter((evento) => evento instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.actualizar());
  }

  private actualizar(): void {
    let ruta = this.activatedRoute;
    while (ruta.firstChild) {
      ruta = ruta.firstChild;
    }

    const seo = leerSeo(ruta);
    if (!seo) {
      console.warn(`[seo] Ruta sin data.seo en app.routes.ts: ${this.router.url}`);
    }

    // No se lee `this.title.getTitle()`: el `TitleStrategy` de Angular Router todavía no lo ha
    // aplicado en este punto de la navegación (se vio en el prerenderizado — el og:title salía
    // con el <title> por defecto de index.html). El título de la ruta ya está resuelto aquí en
    // el snapshot, así que se usa directamente esa misma fuente.
    const titulo = ruta.snapshot.title ?? this.title.getTitle();
    const descripcion = seo?.descripcion ?? '';
    const rutaActual = this.router.url.split(/[?#]/)[0];
    const url = rutaActual === '/' ? `${SITIO_URL}/` : `${SITIO_URL}${rutaActual}`;

    this.meta.updateTag({ name: 'description', content: descripcion });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Iglesia El Camino' });
    this.meta.updateTag({ property: 'og:locale', content: 'es_ES' });
    this.meta.updateTag({ property: 'og:title', content: titulo });
    this.meta.updateTag({ property: 'og:description', content: descripcion });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: IMAGEN_OG_DEFECTO.url });
    this.meta.updateTag({ property: 'og:image:width', content: String(IMAGEN_OG_DEFECTO.ancho) });
    this.meta.updateTag({ property: 'og:image:height', content: String(IMAGEN_OG_DEFECTO.alto) });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: titulo });
    this.meta.updateTag({ name: 'twitter:description', content: descripcion });
    this.meta.updateTag({ name: 'twitter:image', content: IMAGEN_OG_DEFECTO.url });

    this.actualizarCanonica(url);
  }

  private actualizarCanonica(url: string): void {
    let enlace = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!enlace) {
      enlace = this.document.createElement('link');
      enlace.setAttribute('rel', 'canonical');
      this.document.head.appendChild(enlace);
    }
    enlace.setAttribute('href', url);
  }
}
