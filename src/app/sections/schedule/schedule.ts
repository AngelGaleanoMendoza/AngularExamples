import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { Icon } from '../../shared/icon';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-schedule',
  imports: [Icon, RevealDirective],
  templateUrl: './schedule.html',
  styleUrl: './schedule.css',
})
export class Schedule {
  protected readonly items = WEDDING.schedule;
}
