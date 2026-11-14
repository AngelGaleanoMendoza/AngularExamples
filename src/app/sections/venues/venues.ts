import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-venues',
  imports: [Icon, RevealDirective],
  templateUrl: './venues.html',
  styleUrl: './venues.css',
})
export class Venues {
  protected readonly venues = WEDDING.venues;
  protected readonly dress = WEDDING.dressCode;
}
