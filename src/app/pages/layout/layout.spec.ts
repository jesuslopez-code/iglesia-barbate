import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Layout } from './layout';

describe('Layout', () => {
  let fixture: ComponentFixture<Layout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Layout],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Layout);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('deja inerte el contenido mientras el panel móvil está abierto', () => {
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('.nav-toggle');
    toggle.click();
    fixture.detectChanges();

    const main: HTMLElement = fixture.nativeElement.querySelector('main.content');
    expect(main.hasAttribute('inert')).toBe(true);

    toggle.click();
    fixture.detectChanges();
    expect(main.hasAttribute('inert')).toBe(false);
  });
});
