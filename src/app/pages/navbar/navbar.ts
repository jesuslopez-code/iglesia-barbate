import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  menuItems = [
     { label: 'Inicio', path: '/' },
    { label: 'Quienes Somos', path: 'whose' },
    { label: 'Pastores', path: '/pastores' },
    { label: 'Áreas', path: '/areas',
      children: [
        { label: 'Alabanza', path: '/areas/alabanza' },
        { label: 'Escuela bíblica', path: '/areas/school' },
        { label: 'Jóvenes', path: '/areas/younger' },
        { label: 'Kids', path: '/areas/kids' },]
     },
    { label: 'Acción Social', path: '/social' }
  ];
}
