import { RenderMode, ServerRoute } from '@angular/ssr';
import { CAMPANAS } from './data/campanas.data';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'campanas/:slug',
    renderMode: RenderMode.Prerender,
    getPrerenderParams: async () => CAMPANAS.map((campana) => ({ slug: campana.slug })),
  },
  { path: '**', renderMode: RenderMode.Prerender },
];
