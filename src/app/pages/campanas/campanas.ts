import { Component, afterNextRender, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Campana } from '../../data/campana';
import {
  campanaActiva,
  campanasRecientesPrimero,
  fechaCorta,
  hoyIso,
  variantesPortada,
} from '../../data/campanas.data';

@Component({
  selector: 'app-campanas',
  imports: [RouterLink],
  templateUrl: './campanas.html',
  styleUrl: './campanas.scss',
})
export class Campanas {
  private readonly recientes = campanasRecientesPrimero();

  // Qué campaña está activa depende de la fecha de HOY, no de la del build. El HTML prerenderizado
  // y el primer pintado del navegador usan `null` (todas en el listado, sin destacar), así que
  // coinciden y no hay desajuste de hidratación; la campaña activa se destaca después.
  protected readonly hoy = signal<string | null>(null);

  constructor() {
    afterNextRender(() => this.hoy.set(hoyIso()));
  }

  protected destacada(): Campana | undefined {
    const hoy = this.hoy();
    return hoy ? campanaActiva(hoy) : undefined;
  }

  protected archivo(): readonly Campana[] {
    const destacada = this.destacada();
    return this.recientes.filter((campana) => campana !== destacada);
  }

  protected readonly portada = variantesPortada;
  protected readonly fecha = fechaCorta;
}
