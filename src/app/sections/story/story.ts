import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-story',
  imports: [RevealDirective],
  templateUrl: './story.html',
  styleUrl: './story.css',
})
export class Story {
  protected readonly story = WEDDING.story;
}
