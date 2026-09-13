import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
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

  protected readonly navGroups: NavGroup[] = buildNavGroups(routes);
  protected readonly servirLink = findNavLink(routes, 'servir');
  protected readonly donarLink = findNavLink(routes, 'donar');
  protected readonly navOpen = signal(false);
  protected readonly iconBars = faBars;
  protected readonly iconClose = faXmark;

  private readonly isDesktop = signal(window.matchMedia(DESKTOP_BREAKPOINT).matches);
  // En escritorio la lateral es fija y siempre visible: nunca debe quedar inerte, esté "abierta"
  // o no la marca navOpen (que en escritorio no se usa porque el botón de alternar está oculto).
  protected readonly sidebarInert = computed(() => !this.isDesktop() && !this.navOpen());

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
