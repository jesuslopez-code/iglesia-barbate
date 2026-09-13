import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type EcTheme = 'light' | 'dark';

const STORAGE_KEY = 'ec-theme';

/**
 * Aplica el modo claro/oscuro en el elemento raíz (`data-theme`) y lo mantiene sincronizado
 * con la preferencia del sistema mientras la persona no haya elegido uno de forma explícita.
 * Todo acceso a window/localStorage va protegido: el sitio se prerenderizará (fase 3) y este
 * servicio no puede petar al ejecutarse en el servidor.
 */
@Injectable({ providedIn: 'root' })
export class Theme {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly isBrowser = isPlatformBrowser(this.platformId);
  private mediaQuery: MediaQueryList | null = null;

  readonly current = signal<EcTheme>('light');

  constructor() {
    if (!this.isBrowser) {
      return;
    }

    const guardado = this.leerPreferenciaGuardada();
    if (guardado) {
      this.aplicar(guardado);
    } else {
      this.aplicar(this.preferenciaDelSistema());
    }

    try {
      this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      this.mediaQuery.addEventListener('change', (evento) => {
        if (this.leerPreferenciaGuardada()) {
          return;
        }
        this.aplicar(evento.matches ? 'dark' : 'light');
      });
    } catch {
      this.mediaQuery = null;
    }
  }

  elegir(tema: EcTheme): void {
    this.aplicar(tema);
    this.guardarPreferencia(tema);
  }

  alternar(): void {
    this.elegir(this.current() === 'dark' ? 'light' : 'dark');
  }

  private aplicar(tema: EcTheme): void {
    this.current.set(tema);
    if (!this.isBrowser) {
      return;
    }
    try {
      document.documentElement.setAttribute('data-theme', tema);
    } catch {
      /* Sin acceso al DOM (previsualización, prerenderizado): no hay nada que aplicar */
    }
  }

  private preferenciaDelSistema(): EcTheme {
    try {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  }

  private leerPreferenciaGuardada(): EcTheme | null {
    try {
      const valor = window.localStorage.getItem(STORAGE_KEY);
      return valor === 'light' || valor === 'dark' ? valor : null;
    } catch {
      return null;
    }
  }

  private guardarPreferencia(tema: EcTheme): void {
    try {
      window.localStorage.setItem(STORAGE_KEY, tema);
    } catch {
      /* Almacenamiento no disponible (modo privado, cuota agotada): se sigue sin persistir */
    }
  }
}
