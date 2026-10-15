import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TEMPORADAS } from '../../data/horarios.data';

@Component({
  selector: 'app-ministerios',
  imports: [RouterLink],
  templateUrl: './ministerios.html',
  styleUrl: './ministerios.scss',
})
export class Ministerios {
  // El horario de oración se toma de la misma fuente que `/horarios`, para no repetir "19:00"/
  // "20:00" a mano y arriesgar que se desincronice.
  protected readonly temporadas = TEMPORADAS;
}
