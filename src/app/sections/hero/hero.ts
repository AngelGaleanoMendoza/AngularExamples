import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { longDate } from '../../shared/format';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  protected readonly w = WEDDING;
  protected readonly date = longDate(WEDDING.date);
}
