import { Routes } from '@angular/router';

/**
 * Arquitectura de información de CLAUDE.md, declarada una única vez. `data.nav` es lo que lee
 * `core/nav/nav.ts` para construir la barra lateral y el pie: una ruta sin `nav` no aparece en
 * ningún sitio. No añadir un array de menú aparte.
 *
 * «Jóvenes» y «Kids» tienen cada una su propia entrada en «Vida de iglesia»: decisión de Jesús,
 * no una entrada compartida con enlace cruzado.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/body/body').then((m) => m.Body),
    title: 'Iglesia El Camino — Inicio',
    data: { nav: { grupo: 'la-iglesia', etiqueta: 'Inicio', orden: 1, exact: true, pie: true } },
  },
  {
    path: 'quienes-somos',
    loadComponent: () => import('./pages/quienes-somos/quienes-somos').then((m) => m.QuienesSomos),
    title: 'Quiénes somos — Iglesia El Camino',
    data: { nav: { grupo: 'la-iglesia', etiqueta: 'Quiénes somos', orden: 2 } },
  },
  {
    path: 'creencias',
    loadComponent: () => import('./pages/creencias/creencias').then((m) => m.Creencias),
    title: 'Nuestras creencias — Iglesia El Camino',
    data: { nav: { grupo: 'la-iglesia', etiqueta: 'Nuestras creencias', orden: 3 } },
  },
  {
    path: 'equipo',
    loadComponent: () => import('./pages/equipo/equipo').then((m) => m.Equipo),
    title: 'Equipo pastoral — Iglesia El Camino',
    data: { nav: { grupo: 'la-iglesia', etiqueta: 'Equipo pastoral', orden: 4 } },
  },
  {
    path: 'ensenanza',
    loadComponent: () => import('./pages/ensenanza/ensenanza').then((m) => m.Ensenanza),
    title: 'Enseñanza — Iglesia El Camino',
    data: { nav: { grupo: 'vida-de-iglesia', etiqueta: 'Enseñanza', orden: 1 } },
  },
  {
    path: 'ministerios',
    loadComponent: () => import('./pages/ministerios/ministerios').then((m) => m.Ministerios),
    title: 'Ministerios — Iglesia El Camino',
    data: { nav: { grupo: 'vida-de-iglesia', etiqueta: 'Ministerios', orden: 2 } },
  },
  {
    path: 'ministerios/jovenes',
    loadComponent: () =>
      import('./pages/ministerios/jovenes/jovenes').then((m) => m.MinisterioJovenes),
    title: 'Jóvenes — Iglesia El Camino',
    data: { nav: { grupo: 'vida-de-iglesia', etiqueta: 'Jóvenes', orden: 3 } },
  },
  {
    path: 'ministerios/kids',
    loadComponent: () => import('./pages/ministerios/kids/kids').then((m) => m.MinisterioKids),
    title: 'Kids — Iglesia El Camino',
    data: { nav: { grupo: 'vida-de-iglesia', etiqueta: 'Kids', orden: 4 } },
  },
  {
    path: 'accion-social',
    loadComponent: () => import('./pages/accion-social/accion-social').then((m) => m.AccionSocial),
    title: 'Acción social — Iglesia El Camino',
    data: { nav: { grupo: 'vida-de-iglesia', etiqueta: 'Acción social', orden: 5 } },
  },
  {
    path: 'primera-visita',
    loadComponent: () => import('./pages/primera-visita/primera-visita').then((m) => m.PrimeraVisita),
    title: 'Tu primera visita — Iglesia El Camino',
    data: { nav: { grupo: 'conocenos', etiqueta: 'Tu primera visita', orden: 1 } },
  },
  {
    path: 'horarios',
    loadComponent: () => import('./pages/horarios/horarios').then((m) => m.Horarios),
    title: 'Horarios y ubicación — Iglesia El Camino',
    data: { nav: { grupo: 'conocenos', etiqueta: 'Horarios y ubicación', orden: 2, pie: true } },
  },
  {
    path: 'conocenos',
    loadComponent: () => import('./pages/know/know').then((m) => m.Know),
    title: 'Galería y vídeos — Iglesia El Camino',
    data: { nav: { grupo: 'conocenos', etiqueta: 'Galería y vídeos', orden: 3, pie: true } },
  },
  {
    // Ruta antigua ya compartida en redes: se conserva como redirección, no se borra.
    path: 'know',
    redirectTo: 'conocenos',
  },
  {
    path: 'servir',
    loadComponent: () => import('./pages/servir/servir').then((m) => m.Servir),
    title: 'Servir — Iglesia El Camino',
    data: { nav: { grupo: 'servir', etiqueta: 'Servir', orden: 1 } },
  },
  {
    path: 'donar',
    loadComponent: () => import('./pages/donar/donar').then((m) => m.Donar),
    title: 'Donar — Iglesia El Camino',
    data: { nav: { grupo: 'donar', etiqueta: 'Donar', orden: 1 } },
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then((m) => m.Contacto),
    title: 'Contacto — Iglesia El Camino',
    data: { nav: { grupo: 'participar', etiqueta: 'Contacto', orden: 1, pie: true } },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Página no encontrada — Iglesia El Camino',
  },
];
