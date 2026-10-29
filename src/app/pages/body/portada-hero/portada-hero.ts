import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MAPA_UBICACION_ENLACE } from '../../../core/location/map';

/** Cabecera de la portada: foto del bautismo a todo el ancho con el H1 (el único de la portada) y
 *  las dos llamadas a la acción. Los horarios viven en la tarjeta «Cuándo» de `Body`. */
@Component({
  selector: 'app-portada-hero',
  imports: [RouterLink],
  templateUrl: './portada-hero.html',
  styleUrl: './portada-hero.scss',
})
export class PortadaHero {
  protected readonly mapaEnlace = MAPA_UBICACION_ENLACE;
}
