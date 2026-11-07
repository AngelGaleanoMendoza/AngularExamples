import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-stay',
  imports: [Icon, RevealDirective],
  templateUrl: './stay.html',
  styleUrl: './stay.css',
})
export class Stay {
  protected readonly hotels = WEDDING.hotels;
}
