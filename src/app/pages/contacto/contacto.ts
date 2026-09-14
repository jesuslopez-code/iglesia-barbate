import { Component } from '@angular/core';
import { FormContact } from '../../components/form-contact/form-contact';
import { Networks } from '../../components/networks/networks';
import {
  CORREO_HREF,
  CORREO_TEXTO,
  TELEFONO_HREF,
  TELEFONO_TEXTO,
} from '../../data/horarios.data';

@Component({
  selector: 'app-contacto',
  imports: [FormContact, Networks],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {
  // Mismo fichero de datos que usa el bloque "Cuándo y dónde" de la portada: un solo sitio
  // donde corregir el teléfono o el correo si cambian.
  protected readonly telefonoTexto = TELEFONO_TEXTO;
  protected readonly telefonoHref = TELEFONO_HREF;
  protected readonly correoTexto = CORREO_TEXTO;
  protected readonly correoHref = CORREO_HREF;
}
