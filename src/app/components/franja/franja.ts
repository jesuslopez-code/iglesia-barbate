import { Component, ViewEncapsulation, input } from '@angular/core';

/**
 * Franja de título de cada página, justo bajo la cabecera: el H1 y, proyectado, el párrafo breve
 * de introducción. Es la única pieza que escribe el H1 de las páginas interiores.
 * Sin encapsulación porque el contenido proyectado (el `<p>` y sus enlaces) lo pone la página.
 */
@Component({
  selector: 'app-franja',
  templateUrl: './franja.html',
  styleUrl: './franja.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Franja {
  readonly titulo = input.required<string>();
}
