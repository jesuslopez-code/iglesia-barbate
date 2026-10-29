import { Routes } from '@angular/router';
import {
  campanaResolver,
  campanaSeoResolver,
  campanaTituloResolver,
} from './pages/campanas/campana.resolvers';

/**
 * Arquitectura de información de CLAUDE.md, declarada una única vez. `data.nav` es lo que lee
 * `core/nav/nav.ts` para construir la cabecera y el pie: una ruta sin `nav` no aparece en
 * ningún sitio. No añadir un array de menú aparte.
 *
 * `data.seo` es lo que lee `core/seo/seo.ts` para la descripción y el Open Graph de cada ruta
 * (el título ya lo resuelve Angular Router solo con `title`, arriba). Una ruta sin `data.seo`
 * sirve una descripción vacía y avisa por consola: no añadir metadatos sueltos en cada
 * componente de página.
 *
 * «Jóvenes» y «Kids» tienen cada una su propia entrada en «Vida de iglesia»: decisión de Jesús,
 * no una entrada compartida con enlace cruzado.
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/body/body').then((m) => m.Body),
    title: 'Iglesia evangélica en Barbate (Cádiz) · El Camino',
    data: {
      nav: { grupo: 'la-iglesia', etiqueta: 'Inicio', orden: 1, exact: true, pie: true },
      seo: {
        descripcion:
          'Iglesia Evangélica El Camino, en Barbate (Cádiz): una comunidad cristiana que se ' +
          'reúne los jueves y domingos, con enseñanza bíblica y vida de iglesia abierta a quien ' +
          'quiera visitarnos.',
      },
    },
  },
  {
    path: 'quienes-somos',
    loadComponent: () => import('./pages/quienes-somos/quienes-somos').then((m) => m.QuienesSomos),
    title: 'Quiénes somos — Iglesia El Camino',
    data: {
      nav: { grupo: 'la-iglesia', etiqueta: 'Quiénes somos', orden: 2 },
      seo: {
        descripcion:
          'La historia de la Iglesia El Camino en Barbate, cómo empezamos y qué nos mueve como ' +
          'comunidad.',
      },
    },
  },
  {
    path: 'creencias',
    loadComponent: () => import('./pages/creencias/creencias').then((m) => m.Creencias),
    title: 'Nuestras creencias — Iglesia El Camino',
    data: {
      nav: { grupo: 'la-iglesia', etiqueta: 'Nuestras creencias', orden: 3 },
      seo: {
        descripcion:
          'Declaración de fe de la Iglesia El Camino, adherida a la Federación de Entidades ' +
          'Religiosas Evangélicas de España (FEREDE): la Biblia, Dios, Jesucristo, la ' +
          'salvación y la vida cristiana.',
      },
    },
  },
  {
    path: 'equipo',
    loadComponent: () => import('./pages/equipo/equipo').then((m) => m.Equipo),
    title: 'Equipo pastoral — Iglesia El Camino',
    data: {
      nav: { grupo: 'la-iglesia', etiqueta: 'Equipo pastoral', orden: 4 },
      seo: {
        descripcion: 'Las personas que acompañan y cuidan a la comunidad de la Iglesia El Camino.',
      },
    },
  },
  {
    path: 'ensenanza',
    loadComponent: () => import('./pages/ensenanza/ensenanza').then((m) => m.Ensenanza),
    title: 'Enseñanza — Iglesia El Camino',
    data: {
      nav: { grupo: 'vida-de-iglesia', etiqueta: 'Enseñanza', orden: 1 },
      seo: {
        descripcion:
          'Archivo de prédicas de la Iglesia El Camino, con su fecha y su pasaje, pensado para ' +
          'leerse con calma.',
      },
    },
  },
  {
    path: 'ministerios',
    loadComponent: () => import('./pages/ministerios/ministerios').then((m) => m.Ministerios),
    title: 'Ministerios en Barbate — Iglesia El Camino',
    data: {
      nav: { grupo: 'vida-de-iglesia', etiqueta: 'Ministerios', orden: 2, exact: true },
      seo: {
        descripcion:
          'Los equipos y espacios a través de los que sirve la Iglesia El Camino, entre ellos ' +
          'Jóvenes y Kids.',
      },
    },
  },
  {
    path: 'ministerios/jovenes',
    loadComponent: () =>
      import('./pages/ministerios/jovenes/jovenes').then((m) => m.MinisterioJovenes),
    title: 'Jóvenes — Iglesia El Camino',
    data: {
      nav: { grupo: 'vida-de-iglesia', etiqueta: 'Jóvenes', orden: 3 },
      seo: {
        descripcion:
          'El espacio de la Iglesia El Camino pensado para adolescentes y jóvenes de la ' +
          'comunidad.',
      },
    },
  },
  {
    path: 'ministerios/kids',
    loadComponent: () => import('./pages/ministerios/kids/kids').then((m) => m.MinisterioKids),
    title: 'Kids — Iglesia El Camino',
    data: {
      nav: { grupo: 'vida-de-iglesia', etiqueta: 'Kids', orden: 4 },
      seo: {
        descripcion: 'El espacio de la Iglesia El Camino pensado para los más pequeños de la casa.',
      },
    },
  },
  {
    path: 'accion-social',
    loadComponent: () => import('./pages/accion-social/accion-social').then((m) => m.AccionSocial),
    title: 'Acción social — Iglesia El Camino',
    data: {
      nav: { grupo: 'vida-de-iglesia', etiqueta: 'Acción social', orden: 5 },
      seo: {
        descripcion:
          'La asociación ACAF y el proyecto Centro Social El Refugio: cómo sirve la Iglesia El ' +
          'Camino a la comunidad de Barbate más allá de sus puertas.',
      },
    },
  },
  {
    path: 'campanas',
    loadComponent: () => import('./pages/campanas/campanas').then((m) => m.Campanas),
    title: 'Campañas — Iglesia El Camino',
    data: {
      nav: { grupo: 'vida-de-iglesia', etiqueta: 'Campañas', orden: 6 },
      seo: {
        descripcion:
          'Campañas de la Iglesia El Camino en fechas señaladas: textos, carteles y folletos ' +
          'para descargar y compartir.',
      },
    },
  },
  {
    // Cada campaña de `data/campanas.data.ts` sale de aquí; título, descripción y Open Graph
    // se resuelven por campaña, no se escriben en la ruta.
    path: 'campanas/:slug',
    loadComponent: () =>
      import('./pages/campanas/detalle/campana-detalle').then((m) => m.CampanaDetalle),
    title: campanaTituloResolver,
    resolve: { campana: campanaResolver, seo: campanaSeoResolver },
  },
  {
    path: 'primera-visita',
    loadComponent: () => import('./pages/primera-visita/primera-visita').then((m) => m.PrimeraVisita),
    title: 'Tu primera visita en Barbate — Iglesia El Camino',
    data: {
      nav: { grupo: 'conocenos', etiqueta: 'Tu primera visita', orden: 1, rol: 'visita' },
      seo: {
        descripcion:
          'Todo lo que necesitas saber antes de venir a conocer la Iglesia El Camino por ' +
          'primera vez: cuándo venir y qué esperar.',
      },
    },
  },
  {
    path: 'horarios',
    loadComponent: () => import('./pages/horarios/horarios').then((m) => m.Horarios),
    title: 'Horarios y ubicación en Barbate — Iglesia El Camino',
    data: {
      nav: { grupo: 'conocenos', etiqueta: 'Horarios y ubicación', orden: 2, pie: true },
      seo: {
        descripcion:
          'Horario de cultos y ubicación de la Iglesia El Camino en Barbate (Cádiz), con mapa y ' +
          'cómo llegar.',
      },
    },
  },
  {
    path: 'conocenos',
    loadComponent: () => import('./pages/know/know').then((m) => m.Know),
    title: 'Galería y vídeos — Iglesia El Camino',
    data: {
      nav: { grupo: 'conocenos', etiqueta: 'Galería y vídeos', orden: 3, pie: true },
      seo: {
        descripcion:
          'Galería de fotos y una selección de vídeos de la Iglesia El Camino en Barbate.',
      },
    },
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
    data: {
      nav: { grupo: 'participar', etiqueta: 'Servir', orden: 1 },
      seo: {
        descripcion: 'Formas de poner tus dones al servicio de la comunidad en la Iglesia El Camino.',
      },
    },
  },
  {
    path: 'donar',
    loadComponent: () => import('./pages/donar/donar').then((m) => m.Donar),
    title: 'Donar — Iglesia El Camino',
    data: {
      nav: { grupo: 'participar', etiqueta: 'Donar', orden: 2, rol: 'donar' },
      seo: {
        descripcion: 'Cómo sostener económicamente el trabajo de la Iglesia El Camino en Barbate.',
      },
    },
  },
  {
    path: 'contacto',
    loadComponent: () => import('./pages/contacto/contacto').then((m) => m.Contacto),
    title: 'Contacto — Iglesia El Camino',
    data: {
      nav: { grupo: 'participar', etiqueta: 'Contacto', orden: 3, pie: true },
      seo: {
        descripcion:
          'Escríbenos o encuéntranos: teléfono, correo, redes y formulario de contacto de la ' +
          'Iglesia El Camino en Barbate.',
      },
    },
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then((m) => m.NotFound),
    title: 'Página no encontrada — Iglesia El Camino',
    data: {
      seo: { descripcion: 'La página que buscas no existe en el sitio de la Iglesia El Camino.' },
    },
  },
];
