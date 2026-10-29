import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

interface Entrada {
  readonly titulo: string;
  readonly apoyo: string;
  readonly ruta: string;
  readonly jpg: string;
  readonly webp: string | null;
  readonly ancho: number;
  readonly alto: number;
}

/** Fila «Descubre El Camino» de la portada: tres tarjetas a las secciones principales, con foto de fondo. */
@Component({
  selector: 'app-portada-descubre',
  imports: [RouterLink],
  templateUrl: './portada-descubre.html',
  styleUrl: './portada-descubre.scss',
})
export class PortadaDescubre {
  protected readonly entradas: readonly Entrada[] = [
    {
      titulo: 'Creencias',
      apoyo: 'En qué nos apoyamos',
      ruta: '/creencias',
      jpg: '/photos-iglesia/bautizo3-960.jpg',
      webp: '/photos-iglesia/bautizo3-960.webp',
      ancho: 960,
      alto: 720,
    },
    {
      titulo: 'Enseñanza',
      apoyo: 'Últimas prédicas',
      ruta: '/ensenanza',
      jpg: '/photos-iglesia/pastor-predicando-960.jpg',
      webp: '/photos-iglesia/pastor-predicando-960.webp',
      ancho: 960,
      alto: 720,
    },
    {
      titulo: 'Servir',
      apoyo: 'Dónde hace falta',
      ruta: '/servir',
      jpg: '/photos-iglesia/servir-comunion-960.jpg',
      webp: '/photos-iglesia/servir-comunion-960.webp',
      ancho: 960,
      alto: 720,
    },
  ];
}
