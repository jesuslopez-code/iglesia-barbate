import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEMPORADAS } from '../../../data/horarios.data';

@Component({
  selector: 'app-ministerio-kids',
  imports: [RouterLink],
  templateUrl: './kids.html',
})
export class MinisterioKids {
  // El horario de Kids es el mismo que el del culto dominical: se toma de la misma fuente que
  // `/horarios`, para no repetir "19:00"/"20:00" a mano.
  protected readonly temporadas = TEMPORADAS;
}
