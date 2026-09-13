import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Servir } from './servir';

describe('Servir', () => {
  let component: Servir;
  let fixture: ComponentFixture<Servir>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Servir],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Servir);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
