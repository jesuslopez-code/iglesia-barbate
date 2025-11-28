import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./pages/navbar/navbar";
import { Header } from "./pages/header/header";
import { Body } from "./pages/body/body";
import { Footer } from "./pages/footer/footer";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, Header, Body, Footer],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('iglesia-barbate');
}
