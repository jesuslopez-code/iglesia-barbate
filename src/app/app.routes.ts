import { Routes } from '@angular/router';
import { Know } from './pages/know/know';
import { App } from './app';
import { Body } from './pages/body/body';

export const routes: Routes =
[
  { path: '', component: Body, title: 'Iglesia El Camino - Inicio' },
  { path: 'know', component: Know, title: 'Acerca de nosotros' },
];
