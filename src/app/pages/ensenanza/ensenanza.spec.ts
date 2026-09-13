import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Ensenanza } from './ensenanza';

describe('Ensenanza', () => {
  let component: Ensenanza;
  let fixture: ComponentFixture<Ensenanza>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ensenanza],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ensenanza);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
