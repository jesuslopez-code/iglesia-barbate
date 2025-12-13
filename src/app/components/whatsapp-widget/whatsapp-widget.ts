import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-whatsapp-widget',
  imports: [CommonModule],
  templateUrl: './whatsapp-widget.html',
  styleUrl: './whatsapp-widget.scss',
})
export class WhatsappWidget {

  isChatOpen: boolean = false;

  phoneNumber: string = '34622532240'; // EJEMPLO: Pon aquí el número real

  // Mensaje predeterminado
  message: string = 'Hola, quisiera más información sobre los horarios de la iglesia y como puedo ponerme en contact con vosotros';

  toggleChat() {
    this.isChatOpen = !this.isChatOpen;
  }

  openWhatsApp() {
    // Detectar si es móvil o escritorio para usar la URL correcta
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    const baseUrl = isMobile ? 'https://api.whatsapp.com/send' : 'https://web.whatsapp.com/send';

    // Construir la URL completa
    const url = `${baseUrl}?phone=${this.phoneNumber}&text=${encodeURIComponent(this.message)}`;

    window.open(url, '_blank');
  }
}
