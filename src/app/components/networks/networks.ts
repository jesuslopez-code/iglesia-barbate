import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import {
  faFacebookF,
  faYoutube,
  faTiktok,
  faInstagram,
  faSpotify,
} from '@fortawesome/free-brands-svg-icons';
import { faArrowUpRightFromSquare } from '@fortawesome/free-solid-svg-icons';

interface RedSocial {
  nombre: string;
  detalle: string;
  href: string;
  icono: typeof faFacebookF;
  clase: string;
}

@Component({
  selector: 'app-networks',
  imports: [FaIconComponent],
  templateUrl: './networks.html',
  styleUrl: './networks.scss',
})
export class Networks {
  iconoFlecha = faArrowUpRightFromSquare;

  redes: RedSocial[] = [
    {
      nombre: 'Facebook',
      detalle: 'Culto en directo cada domingo, fotos y avisos',
      href: 'https://www.facebook.com/profile.php?id=61594975856668',
      icono: faFacebookF,
      clase: 'facebook',
    },
    {
      nombre: 'YouTube',
      detalle: 'Prédicas y alabanzas completas',
      href: 'https://www.youtube.com/@IglesiaEvang%C3%A9licaElCamino',
      icono: faYoutube,
      clase: 'youtube',
    },
    {
      nombre: 'TikTok',
      detalle: 'Vídeos cortos de la iglesia',
      href: 'https://www.tiktok.com/@iglesiaelcamino__',
      icono: faTiktok,
      clase: 'tiktok',
    },
    {
      nombre: 'Instagram',
      detalle: '@iglesiaelcamino__',
      href: 'https://www.instagram.com/iglesiaelcamino__/',
      icono: faInstagram,
      clase: 'instagram',
    },
    {
      nombre: 'Spotify',
      detalle: 'Podcast con las prédicas de la iglesia',
      href: 'https://open.spotify.com/show/2Pp0CTBYLUaxGjniSFKFEW',
      icono: faSpotify,
      clase: 'spotify',
    },
  ];
}
