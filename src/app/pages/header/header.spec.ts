import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Header } from './header';

describe('Header', () => {
  let fixture: ComponentFixture<Header>;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    fixture.detectChanges();
    el = fixture.nativeElement;
  });

  it('genera los cuatro grupos desde las rutas', () => {
    expect(el.querySelectorAll('.nav-item__boton').length).toBe(4);
  });

  it('abre y cierra un desplegable con aria-expanded', () => {
    const boton: HTMLButtonElement = el.querySelector('.nav-item__boton')!;
    expect(boton.getAttribute('aria-expanded')).toBe('false');

    boton.click();
    fixture.detectChanges();
    expect(boton.getAttribute('aria-expanded')).toBe('true');

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(boton.getAttribute('aria-expanded')).toBe('false');
  });

  it('abre y cierra el panel móvil', () => {
    const toggle: HTMLButtonElement = el.querySelector('.nav-toggle')!;
    toggle.click();
    fixture.detectChanges();
    expect(el.querySelector('.panel')).not.toBeNull();

    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    fixture.detectChanges();
    expect(el.querySelector('.panel')).toBeNull();
    expect(document.body.style.overflow).toBe('');
  });
});
