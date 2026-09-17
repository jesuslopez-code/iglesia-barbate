import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Component,
  ElementRef,
  HostListener,
  PLATFORM_ID,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import { filter } from 'rxjs';
import { ThemeSwitch } from '../../components/theme-switch/theme-switch';
import { Footer } from '../footer/footer';
import { NavGroup, buildNavGroups, findNavLink } from '../../core/nav/nav';
import { routes } from '../../app.routes';

// Debe coincidir con el punto de corte de escritorio de layout.scss (donde la lateral pasa a fija).
const DESKTOP_BREAKPOINT = '(min-width: 992px)';

/**
 * Barra lateral fija en escritorio, panel deslizante en móvil. El menú se genera desde
 * `app.routes.ts` (vía `core/nav/nav.ts`): no hay un array de menú aparte que mantener a mano.
 */
@Component({
  selector: 'app-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet, FaIconComponent, ThemeSwitch, Footer],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  private readonly router = inject(Router);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  protected readonly navGroups: NavGroup[] = buildNavGroups(routes);
  protected readonly servirLink = findNavLink(routes, 'servir');
  protected readonly donarLink = findNavLink(routes, 'donar');
  protected readonly navOpen = signal(false);
  protected readonly iconBars = faBars;
  protected readonly iconClose = faXmark;

  // En el servidor (prerenderizado) no hay `window`: se asume móvil, que es lo que se prerenderiza
  // igualmente sin JS. En el navegador se corrige al vuelo con el listener de resize de abajo.
  private readonly isDesktop = signal(
    this.isBrowser ? window.matchMedia(DESKTOP_BREAKPOINT).matches : false,
  );
  // En escritorio la lateral es fija y siempre visible: nunca debe quedar inerte, esté "abierta"
  // o no la marca navOpen (que en escritorio no se usa porque el botón de alternar está oculto).
  protected readonly sidebarInert = computed(() => !this.isDesktop() && !this.navOpen());
  // El panel móvil abierto tapa el contenido con el `.backdrop`, pero eso solo lo oculta
  // visualmente: sin `inert` el foco de teclado (Tab al final de la lateral, o Mayúsculas+Tab
  // desde ella) cae en enlaces que el usuario no ve. En escritorio la lateral es fija y el
  // contenido siempre debe ser alcanzable, así que nunca se marca inerte ahí.
  protected readonly contentInert = computed(() => !this.isDesktop() && this.navOpen());

  @ViewChild('navToggle') private readonly navToggle?: ElementRef<HTMLButtonElement>;
  @ViewChild('sidebarNav') private readonly sidebarNav?: ElementRef<HTMLElement>;

  constructor() {
    this.router.events
      .pipe(
        filter((evento) => evento instanceof NavigationEnd),
        takeUntilDestroyed(),
      )
      .subscribe(() => this.cerrarMenu());
  }

  @HostListener('document:keydown.escape')
  protected onEscape(): void {
    if (this.navOpen()) {
      this.cerrarMenu();
    }
  }

  @HostListener('window:resize')
  protected onResize(): void {
    this.isDesktop.set(window.matchMedia(DESKTOP_BREAKPOINT).matches);
  }

  protected alternarMenu(): void {
    if (this.navOpen()) {
      this.cerrarMenu();
    } else {
      this.abrirMenu();
    }
  }

  private abrirMenu(): void {
    this.navOpen.set(true);
    queueMicrotask(() => {
      this.sidebarNav?.nativeElement.querySelector<HTMLElement>('a, button')?.focus();
    });
  }

  private cerrarMenu(): void {
    if (!this.navOpen()) {
      return;
    }
    this.navOpen.set(false);
    this.navToggle?.nativeElement.focus();
  }
}
