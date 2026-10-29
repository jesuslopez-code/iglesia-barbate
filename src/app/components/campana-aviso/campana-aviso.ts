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
 * Primera tarjeta de la portada: la campaña activa o, si no la hay, la invitación a la primera
 * visita, para que la fila nunca quede con un hueco.
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
  host: { '[class.reservado]': 'reservado' },
})
export class CampanaAviso {
  // Slot de la foto: 2fr de la fila de la portada. Con 1100 px de columna menos 2 × 32 de relleno y
  // 20 de hueco, son ~680 px a partir de 1200 px de ventana; por debajo la tarjeta ocupa
  // ~60 % de la ventana hasta 768 px y todo el ancho (menos el relleno) en móvil. Recalcular si
  // cambian --ec-content-max, el relleno de .content o las columnas de .fila-inicio en body.scss.
  protected readonly sizes = '(min-width: 1200px) 680px, (min-width: 768px) 60vw, 100vw';

  protected readonly reservado = campanaActiva(hoyIso()) !== undefined;
  protected readonly activa = signal<Campana | undefined>(undefined);
  // El fallback se pinta ya en el HTML prerenderizado si no había campaña al compilar; si la
  // había (el hueco está reservado), solo aparece cuando el cliente confirma que ya no hay.
  private readonly resuelta = signal(false);
  protected readonly mostrarPrimeraVisita = computed(() => !this.reservado || this.resuelta());
  protected readonly portada = computed(() => variantesPortada(this.activa()?.imagen ?? ''));

  /** «Jueves 5 de noviembre» mientras el evento no haya pasado; vacío si no hay evento o ya fue. */
  protected readonly fechaEvento = computed(() => {
    const evento = this.activa()?.evento;
    if (!evento || diasHasta(evento.fecha, hoyIso()) < 0) return '';
    const fecha = fechaLarga(evento.fecha).replace(/ de \d{4}$/, '');
    return fecha.charAt(0).toUpperCase() + fecha.slice(1);
  });

  constructor() {
    afterNextRender(() => {
      this.activa.set(campanaActiva(hoyIso()));
      this.resuelta.set(true);
    });
  }
}
