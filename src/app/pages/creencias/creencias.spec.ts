import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Creencias } from './creencias';

describe('Creencias', () => {
  let component: Creencias;
  let fixture: ComponentFixture<Creencias>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Creencias],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Creencias);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
