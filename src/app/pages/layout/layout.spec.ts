import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';
import { Layout } from './layout';

describe('Layout', () => {
  let component: Layout;
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  function setDesktop(esEscritorio: boolean): void {
    vi.spyOn(window, 'matchMedia').mockReturnValue({ matches: esEscritorio } as MediaQueryList);
    window.dispatchEvent(new Event('resize'));
    fixture.detectChanges();
  }

  function abrirPanel(): void {
    const boton: HTMLButtonElement = fixture.nativeElement.querySelector('.nav-toggle');
    boton.click();
    fixture.detectChanges();
  }

  it('marca el contenido principal como inerte cuando el panel móvil está abierto', () => {
    setDesktop(false);
    abrirPanel();

    const main: HTMLElement = fixture.nativeElement.querySelector('main.content');
    expect(main.hasAttribute('inert')).toBe(true);
  });

  it('nunca marca el contenido principal como inerte en escritorio', () => {
    setDesktop(true);
    let main: HTMLElement = fixture.nativeElement.querySelector('main.content');
    expect(main.hasAttribute('inert')).toBe(false);

    abrirPanel();
    main = fixture.nativeElement.querySelector('main.content');
    expect(main.hasAttribute('inert')).toBe(false);
  });
});
