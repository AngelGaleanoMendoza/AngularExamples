import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { fullDate, longDate } from '../../shared/format';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-save-the-date',
  imports: [RevealDirective],
  templateUrl: './save-the-date.html',
  styleUrl: './save-the-date.css',
})
export class SaveTheDate {
  protected readonly w = WEDDING;
  protected readonly date = fullDate(WEDDING.date);
  protected readonly deadline = longDate(WEDDING.rsvpDeadline);
}
