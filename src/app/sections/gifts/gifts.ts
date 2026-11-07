import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-gifts',
  imports: [Icon, RevealDirective],
  templateUrl: './gifts.html',
  styleUrl: './gifts.css',
})
export class Gifts {
  protected readonly gifts = WEDDING.gifts;
}
