import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { MinisterioKids } from './kids';

describe('MinisterioKids', () => {
  let component: MinisterioKids;
  let fixture: ComponentFixture<MinisterioKids>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MinisterioKids],
      providers: [provideRouter([])],
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinisterioKids);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
