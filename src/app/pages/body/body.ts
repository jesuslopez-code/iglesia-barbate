import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { FormContact } from '../../components/form-contact/form-contact';
import { Networks } from '../../components/networks/networks';

@Component({
  selector: 'app-body',
  imports: [Networks, Carousel, FormContact  ],
  templateUrl: './body.html',
  styleUrl: './body.scss',
})
export class Body {

}
