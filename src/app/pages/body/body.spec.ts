import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Body } from './body';

describe('Body', () => {
  let component: Body;
  let fixture: ComponentFixture<Body>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Body],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Body);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('tiene un solo H1 y las tarjetas de la portada', () => {
    const el: HTMLElement = fixture.nativeElement;
    expect(el.querySelectorAll('h1').length).toBe(1);
    expect(el.querySelector('.cuando')).not.toBeNull();
    expect(el.querySelectorAll('app-portada-descubre a').length).toBe(3);
    expect(el.querySelector('.donde iframe')?.getAttribute('loading')).toBe('lazy');
  });
});
