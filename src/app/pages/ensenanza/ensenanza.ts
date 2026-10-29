import { Component, DestroyRef, inject } from '@angular/core';
import { VideoCard } from '../../components/video-card/video-card';
import { StructuredDataPagina } from '../../core/seo/structured-data-pagina';
import { PREDICAS } from '../../data/predicas.data';
import { Franja } from '../../components/franja/franja';

@Component({
  selector: 'app-ensenanza',
  imports: [VideoCard, Franja],
  templateUrl: './ensenanza.html',
  styleUrl: './ensenanza.scss',
})
export class Ensenanza {
  protected readonly predicas = PREDICAS;

  constructor() {
    const datosEstructurados = inject(StructuredDataPagina);
    datosEstructurados.publicarVideos(PREDICAS);
    inject(DestroyRef).onDestroy(() => datosEstructurados.retirarVideos());
  }
}
