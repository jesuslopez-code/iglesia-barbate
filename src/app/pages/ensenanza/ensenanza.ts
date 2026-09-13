import { Component } from '@angular/core';
import { VideoCard } from '../../components/video-card/video-card';
import { PREDICAS } from '../../data/predicas.data';

@Component({
  selector: 'app-ensenanza',
  imports: [VideoCard],
  templateUrl: './ensenanza.html',
  styleUrl: './ensenanza.scss',
})
export class Ensenanza {
  protected readonly predicas = PREDICAS;
}
