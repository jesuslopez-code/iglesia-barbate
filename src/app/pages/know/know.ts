import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { VideoBox } from '../../components/video-box/video-box';
import { Networks } from "../../components/networks/networks";
@Component({
  selector: 'app-know',
  imports: [CommonModule, VideoBox, Networks],
  templateUrl: './know.html',
  styleUrl: './know.scss',
})
export class Know {

}
