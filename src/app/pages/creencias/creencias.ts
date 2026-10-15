import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faBookBible,
  faDove,
  faCross,
  faGift,
  faPeopleGroup,
  type IconDefinition,
} from '@fortawesome/free-solid-svg-icons';

interface Creencia {
  readonly icono: IconDefinition;
  readonly titulo: string;
  readonly texto: string;
}

@Component({
  selector: 'app-creencias',
  imports: [FaIconComponent],
  templateUrl: './creencias.html',
  styleUrl: './creencias.scss',
})
export class Creencias {
  // Icono de apoyo visual, sin valor doctrinal: no sustituye ni resume el texto, solo ayuda a
  // identificar la tarjeta de un vistazo.
  protected readonly creencias: readonly Creencia[] = [
    {
      icono: faBookBible,
      titulo: 'La Biblia',
      texto:
        'Creemos que las Sagradas Escrituras son la Palabra inspirada por Dios, nuestra regla ' +
        'única y suprema de fe, conducta y guía diaria.',
    },
    {
      icono: faDove,
      titulo: 'Dios',
      texto:
        'Creemos en un solo Dios verdadero, Creador y Sustentador de todo lo existente, ' +
        'eternamente manifestado en tres personas: el Padre, el Hijo y el Espíritu Santo.',
    },
    {
      icono: faCross,
      titulo: 'Jesucristo',
      texto:
        'Creemos que Jesucristo es el Hijo de Dios, quien se hizo hombre, vivió sin pecado, ' +
        'murió en la cruz cargando nuestras culpas y resucitó para ofrecernos vida eterna y ' +
        'reconciliación con Dios.',
    },
    {
      icono: faGift,
      titulo: 'La salvación',
      texto:
        'Creemos que la salvación es un regalo inmerecido que Dios ofrece por gracia y que se ' +
        'recibe únicamente mediante la fe personal en Jesucristo, no por obras humanas.',
    },
    {
      icono: faPeopleGroup,
      titulo: 'La vida cristiana y la comunidad',
      texto:
        'Creemos que como seguidores de Cristo estamos llamados a vivir en santidad, amor y ' +
        'servicio mutuo, siendo reflejo del Evangelio e impacto positivo en Barbate y su entorno.',
    },
  ];

  // Estado de volteo por tarjeta, independiente del hover: así clic/teclado y ratón pueden
  // convivir sin pisarse (ver reglas de :hover en creencias.scss, limitadas a dispositivos con
  // hover real).
  protected volteadas = new Set<number>();

  protected alternar(indice: number): void {
    if (this.volteadas.has(indice)) {
      this.volteadas.delete(indice);
    } else {
      this.volteadas.add(indice);
    }
  }

  protected estaVolteada(indice: number): boolean {
    return this.volteadas.has(indice);
  }
}
