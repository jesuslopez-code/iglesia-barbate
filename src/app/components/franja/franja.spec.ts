import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Franja } from './franja';

@Component({
  imports: [Franja],
  template: '<app-franja titulo="Horarios"><p>Cuándo y dónde.</p></app-franja>',
})
class Anfitrion {}

describe('Franja', () => {
  it('pinta el H1 y proyecta la introducción', () => {
    const fixture = TestBed.createComponent(Anfitrion);
    fixture.detectChanges();
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelector('h1')?.textContent).toBe('Horarios');
    expect(el.querySelector('.franja p')?.textContent).toBe('Cuándo y dónde.');
  });
});
