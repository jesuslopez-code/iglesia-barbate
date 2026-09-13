import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component, ElementRef, ViewChild } from '@angular/core';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-form-contact',
  imports: [CommonModule, FormsModule],
  templateUrl: './form-contact.html',
  styleUrl: './form-contact.scss',
})
export class FormContact {

  private serviceID = 'service_jj10q4t';
  private templateID = 'template_pbofjl9';
  private publicKey = 'qIA4n1nW7RUCsEeNf';

  isSending = false;
  hasError = false;
  isSuccess = false;

  @ViewChild('contactForm') contactForm!: ElementRef;

  public sendEmail(e: Event) {
    e.preventDefault();

    this.hasError = false;
    this.isSuccess = false;
    this.isSending = true;

    emailjs.sendForm(
      this.serviceID,
      this.templateID,
      this.contactForm.nativeElement,
      { publicKey: this.publicKey }
    ).then(
      (result: EmailJSResponseStatus) => {
        console.log('ENVIADO!', result.text);
        this.isSuccess = true;
        this.isSending = false;
        this.contactForm.nativeElement.reset();
      },
      (error) => {
        console.log('ERROR...', error.text);
        this.hasError = true;
        this.isSending = false;
      }
    );
  }

}
