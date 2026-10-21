import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { SITIO_URL } from '../../../core/seo/seo';
import { Campana } from '../../../data/campana';
import { fechaLarga, rutaDescarga, variantesPortada } from '../../../data/campanas.data';

@Component({
  selector: 'app-campana-detalle',
  templateUrl: './campana-detalle.html',
  styleUrl: './campana-detalle.scss',
})
export class CampanaDetalle {
  // `campana` lo rellena el resolver de la ruta; es un observable porque Angular reutiliza el
  // componente al pasar de un slug a otro.
  protected readonly campana = toSignal(
    inject(ActivatedRoute).data.pipe(map((data) => data['campana'] as Campana)),
    { requireSync: true },
  );

  protected readonly portada = computed(() => variantesPortada(this.campana().imagen));
  protected readonly primeraSeccion = computed(() => this.campana().secciones[0]);
  protected readonly restoSecciones = computed(() => this.campana().secciones.slice(1));
  protected readonly fechaEvento = computed(() => {
    const evento = this.campana().evento;
    return evento ? fechaLarga(evento.fecha) : '';
  });

  protected readonly sol = computed(() => this.campana().sol ?? { x: 80, y: 35 });

  private readonly url = computed(() => `${SITIO_URL}/campanas/${this.campana().slug}`);

  protected readonly whatsappHref = computed(() => {
    const texto = `${this.campana().textoCompartir} ${this.url()}`;
    return `https://wa.me/?text=${encodeURIComponent(texto)}`;
  });

  /** Aviso del resultado de compartir; se anuncia con `aria-live`. */
  protected readonly aviso = signal('');

  protected rutaDescarga(archivo: string): string {
    return rutaDescarga(this.campana(), archivo);
  }

  protected async compartir(evento: Event): Promise<void> {
    if (typeof navigator === 'undefined' || typeof navigator.share !== 'function') {
      // Sin menú nativo, el enlace de WhatsApp sigue su curso normal.
      return;
    }
    evento.preventDefault();
    const campana = this.campana();
    try {
      await navigator.share({ title: campana.titulo, text: campana.textoCompartir, url: this.url() });
      this.aviso.set('Gracias por compartir.');
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return;
      }
      this.aviso.set('No se ha podido abrir el menú de compartir. Prueba con el botón de WhatsApp.');
    }
  }
}
