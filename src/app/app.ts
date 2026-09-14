import { Component, inject } from '@angular/core';
import { Seo } from './core/seo/seo';
import { StructuredData } from './core/seo/structured-data';
import { Layout } from './pages/layout/layout';

@Component({
  selector: 'app-root',
  imports: [Layout],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  // Solo se inyectan para que arranquen: `Seo` escucha la navegación y `StructuredData` inserta
  // el JSON-LD una vez. Ninguno de los dos se usa desde la plantilla.
  private readonly seo = inject(Seo);
  private readonly structuredData = inject(StructuredData);
}
