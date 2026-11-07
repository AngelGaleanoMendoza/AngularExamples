import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-welcome',
  imports: [RevealDirective],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
})
export class Welcome {
  protected readonly w = WEDDING;
}
