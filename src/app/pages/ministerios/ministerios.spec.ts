import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Ministerios } from './ministerios';

describe('Ministerios', () => {
  let component: Ministerios;
  let fixture: ComponentFixture<Ministerios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ministerios],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ministerios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
