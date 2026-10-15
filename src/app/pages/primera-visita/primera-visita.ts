import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DIRECCION_TEXTO, REUNIONES, horaActual } from '../../data/horarios.data';

@Component({
  selector: 'app-primera-visita',
  imports: [RouterLink],
  templateUrl: './primera-visita.html',
  styleUrl: './primera-visita.scss',
})
export class PrimeraVisita {
  // Mismo criterio que la portada (body.ts): resumen rápido, no la referencia exhaustiva (esa
  // es /horarios, enlazada aquí mismo). Se recalcula con la fecha real del navegador tras la
  // hidratación, así que el HTML servido en build solo puede fijar la hora de la temporada en
  // que se generó.
  protected readonly domingo = REUNIONES.find((reunion) => reunion.id === 'domingo')!;
  protected readonly horaActual = horaActual();
  protected readonly direccion = DIRECCION_TEXTO;
  protected readonly duracion = '1h 15m';
}
