import { Component } from '@angular/core';

/** Pie mínimo: solo la cita y el aviso legal. Ya no reúne enlaces, horarios ni ubicación (eso
 *  vive en la portada y en la barra lateral, siempre visible), así que no necesita datos ni
 *  lógica propia. */
@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {}
