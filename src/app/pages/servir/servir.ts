import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Franja } from '../../components/franja/franja';

@Component({
  selector: 'app-servir',
  imports: [RouterLink, Franja],
  templateUrl: './servir.html',
})
export class Servir {}
