import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { QuienesSomos } from './quienes-somos';

describe('QuienesSomos', () => {
  let component: QuienesSomos;
  let fixture: ComponentFixture<QuienesSomos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuienesSomos],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuienesSomos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
