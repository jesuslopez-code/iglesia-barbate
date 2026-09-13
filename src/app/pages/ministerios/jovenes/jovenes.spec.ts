import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MinisterioJovenes } from './jovenes';

describe('MinisterioJovenes', () => {
  let component: MinisterioJovenes;
  let fixture: ComponentFixture<MinisterioJovenes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinisterioJovenes],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinisterioJovenes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
