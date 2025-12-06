import { Component } from '@angular/core';
import { Networks } from "../networks/networks";
import { Carousel } from '../../components/carousel/carousel';
import { FormContact } from '../../components/form-contact/form-contact';

@Component({
  selector: 'app-body',
  imports: [Networks, Carousel, FormContact  ],
  templateUrl: './body.html',
  styleUrl: './body.scss',
})
export class Body {

}
