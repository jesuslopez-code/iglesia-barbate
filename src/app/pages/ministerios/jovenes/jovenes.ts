import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Franja } from '../../../components/franja/franja';

@Component({
  selector: 'app-ministerio-jovenes',
  imports: [RouterLink, Franja],
  templateUrl: './jovenes.html',
})
export class MinisterioJovenes {}
