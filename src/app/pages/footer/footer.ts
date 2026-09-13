import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { NavLink, buildFooterLinks } from '../../core/nav/nav';
import { routes } from '../../app.routes';
import { MAPA_UBICACION_TITULO, MAPA_UBICACION_URL } from '../../core/location/map';
import { DIRECCION_TEXTO, REUNIONES } from '../../data/horarios.data';

/** Los enlaces del pie salen de las mismas rutas que la barra lateral (marcadas con `pie: true`
 *  en `app.routes.ts`): no hay aquí una tercera lista escrita a mano. */
@Component({
  selector: 'app-footer',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  private readonly sanitizer = inject(DomSanitizer);

  protected readonly enlaces: NavLink[] = buildFooterLinks(routes);

  // Misma URL que en Horarios, viene de una constante propia del proyecto: segura para confiarla
  // como recurso embebible.
  protected readonly mapaUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    MAPA_UBICACION_URL,
  );
  protected readonly mapaTitulo = MAPA_UBICACION_TITULO;

  // Horarios y dirección salen del mismo fichero de datos que `/horarios`: el pie reúne toda la
  // información práctica, pero no la reescribe.
  protected readonly reuniones = REUNIONES;
  protected readonly direccion = DIRECCION_TEXTO;
}
