import { Component } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { faFacebookF, faYoutube, faTiktok, faInstagram } from '@fortawesome/free-brands-svg-icons';
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
      detalle: 'Fotos, vídeos y avisos de la iglesia',
      href: 'https://www.facebook.com/profile.php?id=61550744498180&sk=photos&locale=es_ES',
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
      detalle: '@jovenes_el_camino — contenido de la juventud',
      href: 'https://www.tiktok.com/@jovenes_el_camino',
      icono: faTiktok,
      clase: 'tiktok',
    },
    {
      nombre: 'Instagram',
      detalle: '@iglesiaelcamino__',
      href: 'https://www.instagram.com/iglesiaelcamino__/?igsh=MTFjYjZzY2dyY25iNw%3D%3D&utm_source=qr',
      icono: faInstagram,
      clase: 'instagram',
    },
  ];
}
