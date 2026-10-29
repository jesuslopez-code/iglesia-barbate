import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faMoon, faSun } from '@fortawesome/free-solid-svg-icons';
import { Theme } from '../../core/theme/theme';

/**
 * Interruptor accesible de modo claro/oscuro. Se monta en la cabecera y en el panel móvil
 * (ver header.html).
 */
@Component({
  selector: 'app-theme-switch',
  imports: [FaIconComponent],
  templateUrl: './theme-switch.html',
  styleUrl: './theme-switch.scss',
})
export class ThemeSwitch {
  protected readonly theme = inject(Theme);
  protected readonly iconMoon = faMoon;
  protected readonly iconSun = faSun;

  protected alternar(): void {
    this.theme.alternar();
  }
}
