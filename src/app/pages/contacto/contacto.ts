import { Component } from '@angular/core';
import { FormContact } from '../../components/form-contact/form-contact';
import { Networks } from '../../components/networks/networks';

@Component({
  selector: 'app-contacto',
  imports: [FormContact, Networks],
  templateUrl: './contacto.html',
  styleUrl: './contacto.scss',
})
export class Contacto {}
