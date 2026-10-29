import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Franja } from '../../components/franja/franja';

interface AreaRefugio {
  readonly titulo: string;
  readonly texto: string;
}

@Component({
  selector: 'app-accion-social',
  imports: [RouterLink, Franja],
  templateUrl: './accion-social.html',
  styleUrl: './accion-social.scss',
})
export class AccionSocial {
  // El Refugio tendrá su propia web, en desarrollo en paralelo a esta. Hasta que exista, se
  // deja en null y la plantilla no pinta ningún enlace ni placeholder — nunca una URL inventada.
  protected readonly elRefugioUrl: string | null = null;

  protected readonly areasRefugio: readonly AreaRefugio[] = [
    {
      titulo: 'Ayuda e inserción social',
      texto:
        'Centro de acogida y seguimiento dedicado a mujeres en riesgo de exclusión social (y ' +
        'sus hijos), víctimas de explotación/extorsión sexual, refugiados y personas que ' +
        'necesitan apoyo temporal.',
    },
    {
      titulo: 'Prevención y acompañamiento en adicciones',
      texto:
        'Asesoramiento, derivación a centros especializados y seguimiento socio-laboral ' +
        'cercano.',
    },
    {
      titulo: 'Empleo y formación',
      texto:
        'Los usuarios del programa participan activamente en labores de mantenimiento, ' +
        'jardinería, huerto ecológico, cocina y atención, adquiriendo herramientas para su ' +
        'inserción real.',
    },
    {
      titulo: 'Sostenibilidad económica y complejo turístico',
      texto:
        'El proyecto integra un espacio ecológico preparado para albergar campamentos, ' +
        'retiros de matrimonios, conferencias y alojamiento turístico (con capacidad estimada ' +
        'de 80 a 100 personas). Esto permite generar recursos propios para sostener la labor ' +
        'social del centro de forma continua.',
    },
  ];
}
