import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-faq',
  imports: [RevealDirective],
  templateUrl: './faq.html',
  styleUrl: './faq.css',
})
export class Faq {
  protected readonly faqs = WEDDING.faqs;
}
