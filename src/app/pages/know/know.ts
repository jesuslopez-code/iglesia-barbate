import { Component } from '@angular/core';
import { Networks } from '../../components/networks/networks';
import { Carousel } from '../../components/carousel/carousel';
import { VideoCard } from '../../components/video-card/video-card';
import { ACTIVIDADES_REALES } from '../../data/actividades.data';

@Component({
  selector: 'app-know',
  imports: [Networks, Carousel, VideoCard],
  templateUrl: './know.html',
  styleUrl: './know.scss',
})
export class Know {
  protected readonly actividades = ACTIVIDADES_REALES;
}
