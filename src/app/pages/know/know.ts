import { Component } from '@angular/core';
import { Networks } from '../../components/networks/networks';
import { Carousel } from '../../components/carousel/carousel';
import { VideoCard } from '../../components/video-card/video-card';
import { ACTIVIDADES_REALES } from '../../data/actividades.data';
import { Franja } from '../../components/franja/franja';

@Component({
  selector: 'app-know',
  imports: [Networks, Carousel, VideoCard, Franja],
  templateUrl: './know.html',
  styleUrl: './know.scss',
})
export class Know {
  protected readonly actividades = ACTIVIDADES_REALES;
}
