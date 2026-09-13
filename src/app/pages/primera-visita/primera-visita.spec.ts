import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { PrimeraVisita } from './primera-visita';

describe('PrimeraVisita', () => {
  let component: PrimeraVisita;
  let fixture: ComponentFixture<PrimeraVisita>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrimeraVisita],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrimeraVisita);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
