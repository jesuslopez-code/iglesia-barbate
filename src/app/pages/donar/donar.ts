import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CORREO_HREF, CORREO_TEXTO, WHATSAPP_NUMERO } from '../../data/horarios.data';

@Component({
  selector: 'app-donar',
  imports: [RouterLink],
  templateUrl: './donar.html',
})
export class Donar {
  // Mismas constantes que la portada, `/contacto` y el widget de WhatsApp: una sola fuente.
  protected readonly correoHref = CORREO_HREF;
  protected readonly correoTexto = CORREO_TEXTO;
  protected readonly whatsappHref =
    `https://wa.me/${WHATSAPP_NUMERO}?text=` +
    encodeURIComponent('Hola, me gustaría colaborar con un donativo');
}
