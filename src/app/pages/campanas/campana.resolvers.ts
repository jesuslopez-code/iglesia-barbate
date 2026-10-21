import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, RedirectCommand, ResolveFn, Router } from '@angular/router';
import { Campana } from '../../data/campana';
import { buscarCampana } from '../../data/campanas.data';
import { RouteSeo } from '../../core/seo/seo';

export const campanaResolver: ResolveFn<Campana | RedirectCommand> = (
  route: ActivatedRouteSnapshot,
) => {
  const campana = buscarCampana(route.paramMap.get('slug') ?? '');
  // Un slug que no existe cae en la ruta comodín (404) en vez de pintar una página vacía.
  return campana ?? new RedirectCommand(inject(Router).parseUrl('/campana-no-encontrada'));
};

export const campanaTituloResolver: ResolveFn<string> = (route: ActivatedRouteSnapshot) => {
  // Los resolvers de una ruta corren en paralelo: este puede ejecutarse con un slug que
  // campanaResolver está a punto de redirigir, así que la rama sin campaña es alcanzable.
  const campana = buscarCampana(route.paramMap.get('slug') ?? '');
  return campana ? `${campana.titulo} — Iglesia El Camino` : 'Campaña no encontrada';
};

/** Lo lee `core/seo/seo.ts` como `data.seo`, igual que en las rutas con metadatos estáticos. */
export const campanaSeoResolver: ResolveFn<RouteSeo> = (route: ActivatedRouteSnapshot) => {
  const campana = buscarCampana(route.paramMap.get('slug') ?? '');
  if (!campana) {
    return { descripcion: '' };
  }
  return {
    descripcion: campana.resumen,
    imagen: { ruta: campana.imagenOg, ancho: 1200, alto: 630 },
  };
};
