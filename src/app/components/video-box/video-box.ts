import { Component, inject, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-video-box',
  imports: [],
  templateUrl: './video-box.html',
  styleUrl: './video-box.scss',
})
export class VideoBox implements OnInit {

  @Input() videoId: string = '';
  @Input() title: string = '';

  safeUrl: SafeResourceUrl | undefined;
  private sanitizer = inject(DomSanitizer);

  ngOnInit() {
    const url = `https://www.youtube.com/embed/${this.videoId}`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
