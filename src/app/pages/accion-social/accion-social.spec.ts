import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { AccionSocial } from './accion-social';

describe('AccionSocial', () => {
  let component: AccionSocial;
  let fixture: ComponentFixture<AccionSocial>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccionSocial],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccionSocial);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
