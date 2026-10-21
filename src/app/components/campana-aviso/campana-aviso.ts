import { Component, afterNextRender, computed, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Campana } from '../../data/campana';
import {
  campanaActiva,
  diasHasta,
  fechaLarga,
  hoyIso,
  variantesPortada,
} from '../../data/campanas.data';

/**
 * Tarjeta de la campaña activa para la portada.
 *
 * Qué campaña está activa depende de la fecha de HOY, y la página se prerenderiza en el build,
 * así que:
 * - El contenido (`activa`) se decide solo en el navegador, tras la hidratación
 *   (`afterNextRender`). El HTML del servidor y el primer pintado del cliente son iguales (el
 *   host vacío), por lo que no puede haber error de hidratación.
 * - El espacio se reserva desde el HTML prerenderizado con `reservado`, calculado con la fecha del
 *   build: si había una campaña activa al compilar, el hueco ya está y la tarjeta entra sin mover
 *   el contenido. Solo es una clase CSS: Angular no compara atributos al hidratar, y si el
 *   cliente discrepa (campaña que acabó después del build) el hueco simplemente se cierra.
 */
@Component({
  selector: 'app-campana-aviso',
  imports: [RouterLink],
  templateUrl: './campana-aviso.html',
  styleUrl: './campana-aviso.scss',
  host: { '[class.reservado]': 'reservado', '[class.con-aviso]': 'reservado || activa()' },
})
export class CampanaAviso {
  // `sizes` no admite var(): 1024 px es el max-width de la tarjeta (64rem); entre 992 y 1200 px la
  // tarjeta ocupa el ancho del contenido, que descontada la lateral es en torno al 70 % del viewport.
  protected readonly sizes = '(min-width: 1200px) 1024px, (min-width: 992px) 70vw, 100vw';

  protected readonly reservado = campanaActiva(hoyIso()) !== undefined;
  protected readonly activa = signal<Campana | undefined>(undefined);
  protected readonly portada = computed(() => variantesPortada(this.activa()?.imagen ?? ''));

  /** «Jueves 5 de noviembre» mientras el evento no haya pasado; vacío si no hay evento o ya fue. */
  protected readonly fechaEvento = computed(() => {
    const evento = this.activa()?.evento;
    if (!evento || diasHasta(evento.fecha, hoyIso()) < 0) return '';
    const fecha = fechaLarga(evento.fecha).replace(/ de \d{4}$/, '');
    return fecha.charAt(0).toUpperCase() + fecha.slice(1);
  });

  constructor() {
    afterNextRender(() => this.activa.set(campanaActiva(hoyIso())));
  }
}
