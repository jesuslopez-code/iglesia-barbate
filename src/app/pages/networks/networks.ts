import { Component } from '@angular/core';
import { FontAwesomeModule, FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faTwitter, faFacebookF, faYoutube, faTiktok, faSpotify, faInstagram  } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-networks',
  imports: [FaIconComponent],
  templateUrl: './networks.html',
  styleUrl: './networks.scss',
})
export class Networks {
  iconTwitter = faTwitter;
  iconFacebook = faFacebookF;
  iconYoutube = faYoutube;
  iconTiktok = faTiktok;
  iconSpotify = faSpotify;
  iconInstagram = faInstagram;
}
