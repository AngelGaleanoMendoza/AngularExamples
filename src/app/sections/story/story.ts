import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { RevealDirective } from '../../shared/reveal.directive';

interface Slide {
  src: string;
  bw: boolean;
}

@Component({
  selector: 'app-story',
  imports: [RevealDirective],
  templateUrl: './story.html',
  styleUrl: './story.css',
})
export class Story {
  protected readonly story = WEDDING.story;
  protected readonly initials = WEDDING.initials;

  private readonly slides: Slide[] = WEDDING.story.carousel.map((p) => ({
    src: `images/gallery/${String(p.n).padStart(2, '0')}.jpg`,
    bw: p.bw,
  }));

  /** Las fotos van dos veces seguidas para que el desplazamiento no tenga cortes. */
  protected readonly track = [...this.slides, ...this.slides];

  /** Segundos que tarda en pasar toda la tira (unos 5 s por foto). */
  protected readonly duration = `${this.slides.length * 5}s`;
}
