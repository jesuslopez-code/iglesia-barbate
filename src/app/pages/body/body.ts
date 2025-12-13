import { Component } from '@angular/core';
import { Carousel } from '../../components/carousel/carousel';
import { FormContact } from '../../components/form-contact/form-contact';
import { Networks } from '../../components/networks/networks';
import { WhatsappWidget } from "../../components/whatsapp-widget/whatsapp-widget";

@Component({
  selector: 'app-body',
  imports: [Networks, Carousel, FormContact, WhatsappWidget],
  templateUrl: './body.html',
  styleUrl: './body.scss',
})
export class Body {

}
