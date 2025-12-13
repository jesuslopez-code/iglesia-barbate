import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoBox } from './video-box';

describe('VideoBox', () => {
  let component: VideoBox;
  let fixture: ComponentFixture<VideoBox>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VideoBox]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoBox);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
