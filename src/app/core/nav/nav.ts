import { Route, Routes } from '@angular/router';

/** Grupos de la cabecera, tal como los define CLAUDE.md. */
export type NavGroupId = 'la-iglesia' | 'vida-de-iglesia' | 'conocenos' | 'participar';

/** Enlaces que además salen sueltos en la cabecera, fuera de los desplegables: «Donar» discreto y
 *  «Tu primera visita» como botón. Siguen en su grupo: comparten la misma fuente. */
export type NavRole = 'donar' | 'visita';

export interface NavMeta {
  readonly grupo: NavGroupId;
  readonly rol?: NavRole;
  readonly etiqueta: string;
  readonly orden: number;
  readonly exact?: boolean;
  /** Enlaces que además aparecen en el pie de página — el pie toma un subconjunto de esta misma
   *  fuente en vez de tener su propia lista escrita a mano. */
  readonly pie?: boolean;
}

export interface NavLink {
  readonly label: string;
  readonly path: string;
  readonly exact?: boolean;
}

export interface NavGroup {
  readonly title: string;
  readonly items: NavLink[];
}

const GROUP_TITLES: Record<NavGroupId, string> = {
  'la-iglesia': 'La iglesia',
  'vida-de-iglesia': 'Vida de iglesia',
  conocenos: 'Conócenos',
  participar: 'Participar',
};

const GROUP_ORDER: NavGroupId[] = ['la-iglesia', 'vida-de-iglesia', 'conocenos', 'participar'];

function toPath(routePath: string | undefined): string {
  return routePath ? `/${routePath}` : '/';
}

function readNav(route: Route): NavMeta | undefined {
  return route.data?.['nav'] as NavMeta | undefined;
}

function toNavLink(route: Route, nav: NavMeta): NavLink {
  return { label: nav.etiqueta, path: toPath(route.path), exact: nav.exact };
}

/**
 * Deriva la estructura de los cuatro grupos de la cabecera directamente de las rutas. Una
 * ruta sin `data.nav` simplemente no aparece: así no puede haber una segunda lista de menú que
 * se desincronice de las rutas reales (ya pasó una vez en este proyecto).
 */
export function buildNavGroups(routes: Routes): NavGroup[] {
  const porGrupo = new Map<NavGroupId, { orden: number; link: NavLink }[]>();

  for (const route of routes) {
    const nav = readNav(route);
    if (!nav) {
      continue;
    }
    const entradas = porGrupo.get(nav.grupo) ?? [];
    entradas.push({ orden: nav.orden, link: toNavLink(route, nav) });
    porGrupo.set(nav.grupo, entradas);
  }

  return GROUP_ORDER.filter((grupo) => porGrupo.has(grupo)).map((grupo) => ({
    title: GROUP_TITLES[grupo],
    items: (porGrupo.get(grupo) ?? [])
      .sort((a, b) => a.orden - b.orden)
      .map((entrada) => entrada.link),
  }));
}

/** El enlace marcado con el `rol` dado: los dos que la cabecera muestra además de los grupos. */
export function findNavByRole(routes: Routes, rol: NavRole): NavLink | undefined {
  for (const route of routes) {
    const nav = readNav(route);
    if (nav?.rol === rol) {
      return toNavLink(route, nav);
    }
  }
  return undefined;
}

/** Enlaces marcados con `pie: true`, en su propio orden — la fuente del pie de página. */
export function buildFooterLinks(routes: Routes): NavLink[] {
  const marcados: { orden: number; link: NavLink }[] = [];
  for (const route of routes) {
    const nav = readNav(route);
    if (nav?.pie) {
      marcados.push({ orden: nav.orden, link: toNavLink(route, nav) });
    }
  }
  return marcados.sort((a, b) => a.orden - b.orden).map((entrada) => entrada.link);
}
