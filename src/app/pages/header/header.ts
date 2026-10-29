import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  HostListener,
  Injector,
  PLATFORM_ID,
  afterNextRender,
  inject,
  output,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { ThemeSwitch } from '../../components/theme-switch/theme-switch';
import { NavGroup, NavLink, buildNavGroups, findNavByRole } from '../../core/nav/nav';
import { routes } from '../../app.routes';

// Debe coincidir con el punto de corte de header.scss: por debajo, barra móvil con panel.
const DESKTOP_BREAKPOINT = '(min-width: 1200px)';

// Histéresis: al compactarse la cabecera cambia de alto y el scroll puede moverse unos píxeles;
// con un solo umbral, la barra parpadearía entre los dos estados justo en el borde.
const COMPACT_ON = 48;
const COMPACT_OFF = 12;

const FOCUSABLE = 'a[href], button:not([disabled])';

/**
 * Cabecera fija: desplegables en escritorio, barra con panel a pantalla completa en móvil. El
 * menú sale de `app.routes.ts` (vía `core/nav/nav.ts`): no hay un array de menú aparte.
 */
@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive, FaIconComponent, ThemeSwitch],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  private readonly router = inject(Router);
  private readonly document = inject(DOCUMENT);
  private readonly injector = inject(Injector);
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly navGroups: NavGroup[] = buildNavGroups(routes);
  protected readonly donarLink = findNavByRole(routes, 'donar');
  protected readonly visitaLink = findNavByRole(routes, 'visita');
  protected readonly iconBars = faBars;
  protected readonly iconClose = faXmark;

  protected readonly compacto = signal(false);
  protected readonly panelAbierto = signal(false);
  protected readonly grupoAbierto = signal<number | null>(null);
  private readonly url = signal(this.router.url);

  /** Avisa al layout para que deje inerte el resto de la página mientras el panel está abierto. */
  readonly panelCambia = output<boolean>();

  constructor() {
    this.router.events
      .pipe(
        filter((evento) => evento instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe((evento) => {
        this.url.set(evento.urlAfterRedirects);
        this.grupoAbierto.set(null);
        this.cerrarPanel(false);
      });

    // Sin @HostListener: en zoneless cada evento de scroll programaría una detección de cambios;
    // así la señal solo cambia (y repinta) al cruzar el umbral.
    const alDesplazar = (): void => this.actualizarCompacto();
    afterNextRender(() => {
      this.actualizarCompacto();
      window.addEventListener('scroll', alDesplazar, { passive: true });
    });

    inject(DestroyRef).onDestroy(() => {
      if (this.isBrowser) {
        window.removeEventListener('scroll', alDesplazar);
      }
      this.bloquearScroll(false);
    });
  }

  protected grupoActivo(grupo: NavGroup): boolean {
    this.url();
    return grupo.items.some((item) => this.itemActivo(item));
  }

  private itemActivo(item: NavLink): boolean {
    return this.router.isActive(item.path, {
      paths: item.exact ? 'exact' : 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored',
    });
  }

  @HostListener('window:resize')
  protected onResize(): void {
    if (window.matchMedia(DESKTOP_BREAKPOINT).matches) {
      this.cerrarPanel(false);
    } else {
      this.grupoAbierto.set(null);
    }
  }

  @HostListener('document:click', ['$event'])
  protected onClickDocumento(evento: MouseEvent): void {
    const destino = evento.target as Element | null;
    // Con la misma URL el router no emite NavigationEnd: el clic en un enlace cierra por sí mismo.
    if (destino?.closest('a[href]') && this.host.nativeElement.contains(destino)) {
      this.grupoAbierto.set(null);
      this.cerrarPanel(false);
      return;
    }
    if (this.grupoAbierto() === null) {
      return;
    }
    // No se comprueba contra el grupo abierto: al abrirlo con este mismo clic todavía no tiene la
    // clase, y el listener del documento corre antes de la detección de cambios.
    if (!destino?.closest('.nav-item')) {
      this.grupoAbierto.set(null);
    }
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.panelAbierto()) {
      this.cerrarPanel(true);
    } else if (this.grupoAbierto() !== null) {
      this.cerrarGrupo(true);
    }
  }

  @HostListener('keydown', ['$event'])
  protected onTab(evento: KeyboardEvent): void {
    if (evento.key !== 'Tab' || !this.panelAbierto()) {
      return;
    }
    const enfocables = this.enfocables(this.host.nativeElement);
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    const activo = this.document.activeElement;
    if (!primero || !ultimo) {
      return;
    }
    if (evento.shiftKey && activo === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && activo === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  }

  protected alternarGrupo(indice: number): void {
    this.grupoAbierto.update((actual) => (actual === indice ? null : indice));
  }

  protected abrirGrupoConTeclado(evento: Event, indice: number): void {
    evento.preventDefault();
    this.grupoAbierto.set(indice);
    afterNextRender(() => this.enfocables(this.menuAbierto())[0]?.focus(), { injector: this.injector });
  }

  protected moverEnMenu(evento: Event, paso: 1 | -1 | 'inicio' | 'fin'): void {
    evento.preventDefault();
    const enlaces = this.enfocables(this.menuAbierto());
    const actual = enlaces.indexOf(this.document.activeElement as HTMLElement);
    let destino: number;
    if (paso === 'inicio') {
      destino = 0;
    } else if (paso === 'fin') {
      destino = enlaces.length - 1;
    } else {
      destino = Math.min(Math.max(actual + paso, 0), enlaces.length - 1);
    }
    enlaces[destino]?.focus();
  }

  // Con Tab el foco sale del grupo y el menú se cierra solo; el ratón no pasa por aquí porque un
  // relatedTarget nulo (clic en zona sin foco) no debe cerrar antes de que llegue el clic.
  protected alSalirElFoco(evento: FocusEvent, item: HTMLElement): void {
    const siguiente = evento.relatedTarget as Node | null;
    if (siguiente && !item.contains(siguiente)) {
      this.grupoAbierto.set(null);
    }
  }

  protected alternarPanel(): void {
    if (this.panelAbierto()) {
      this.cerrarPanel(true);
      return;
    }
    this.grupoAbierto.set(null);
    this.panelAbierto.set(true);
    this.panelCambia.emit(true);
    this.bloquearScroll(true);
    // El panel y el menú aún no están pintados: hay que esperar al render para poder enfocarlos.
    afterNextRender(
      () => this.host.nativeElement.querySelector<HTMLElement>('.panel a[href]')?.focus(),
      { injector: this.injector },
    );
  }

  protected cerrarPanel(devolverFoco: boolean): void {
    if (!this.panelAbierto()) {
      return;
    }
    this.panelAbierto.set(false);
    this.panelCambia.emit(false);
    this.bloquearScroll(false);
    if (devolverFoco) {
      this.host.nativeElement.querySelector<HTMLElement>('.nav-toggle')?.focus();
    }
  }

  private cerrarGrupo(devolverFoco: boolean): void {
    const abierto = this.grupoAbierto();
    this.grupoAbierto.set(null);
    if (devolverFoco && abierto !== null) {
      this.host.nativeElement.querySelector<HTMLElement>(`#grupo-boton-${abierto}`)?.focus();
    }
  }

  private menuAbierto(): HTMLElement {
    return (
      this.host.nativeElement.querySelector<HTMLElement>('.nav-item--abierto .nav-item__menu') ??
      this.host.nativeElement
    );
  }

  private enfocables(raiz: HTMLElement): HTMLElement[] {
    return Array.from(raiz.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
      (el) => el.getClientRects().length > 0,
    );
  }

  private actualizarCompacto(): void {
    if (!this.isBrowser) {
      return;
    }
    const desplazado = window.scrollY;
    if (!this.compacto() && desplazado > COMPACT_ON) {
      this.compacto.set(true);
    } else if (this.compacto() && desplazado < COMPACT_OFF) {
      this.compacto.set(false);
    }
  }

  private bloquearScroll(bloquear: boolean): void {
    if (this.isBrowser) {
      this.document.body.style.overflow = bloquear ? 'hidden' : '';
    }
  }
}
