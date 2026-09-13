import { Component, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {
  MAPA_UBICACION_ENLACE,
  MAPA_UBICACION_TITULO,
  MAPA_UBICACION_URL,
} from '../../core/location/map';
import { DIRECCION_TEXTO, REUNIONES } from '../../data/horarios.data';

@Component({
  selector: 'app-horarios',
  imports: [],
  templateUrl: './horarios.html',
  styleUrl: './horarios.scss',
})
export class Horarios {
  private readonly sanitizer = inject(DomSanitizer);

  // La URL viene de una constante propia del proyecto, no de datos de usuario: es seguro confiarla
  // como recurso embebible para poder usarla en un binding [src] normal.
  protected readonly mapaUrl: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
    MAPA_UBICACION_URL,
  );
  protected readonly mapaTitulo = MAPA_UBICACION_TITULO;
  protected readonly mapaEnlace = MAPA_UBICACION_ENLACE;
  protected readonly reuniones = REUNIONES;
  protected readonly direccion = DIRECCION_TEXTO;
}
