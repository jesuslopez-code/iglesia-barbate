import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { filter } from 'rxjs';
import { WhatsappWidget } from '../../components/whatsapp-widget/whatsapp-widget';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

/** Estructura común de todas las páginas: cabecera fija, contenido y pie. */
@Component({
  selector: 'app-layout',
  imports: [RouterOutlet, Header, Footer, WhatsappWidget],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly router = inject(Router);

  // El widget de WhatsApp vive aquí y no en la portada: dentro de la página, su z-index quedaba
  // atrapado en el contexto de apilamiento de la portada y el pie lo tapaba al final del scroll.
  protected readonly esPortada = signal(this.rutaEsPortada(this.router.url));

  constructor() {
    this.router.events
      .pipe(
        filter((evento) => evento instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((evento) => this.esPortada.set(this.rutaEsPortada(evento.urlAfterRedirects)));
  }

  private rutaEsPortada(url: string): boolean {
    return url.split(/[?#]/)[0] === '/';
  }

  // Con el panel móvil abierto el contenido queda tapado, pero sin `inert` el foco de teclado
  // podría seguir cayendo en enlaces que el usuario no ve.
  protected readonly contentInert = signal(false);

  // Un href="#..." plano, con <base href="/">, navegaría a la portada en vez de saltar al contenido.
  protected irAlContenido(evento: Event): void {
    evento.preventDefault();
    document.getElementById('contenido-principal')?.focus();
  }
}
