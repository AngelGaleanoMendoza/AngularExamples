import { Component } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { WEDDING_DATES } from '../../shared/format';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly w = WEDDING;
  protected readonly date = WEDDING_DATES.map((w) => w.dateText).join(' · ');
}
