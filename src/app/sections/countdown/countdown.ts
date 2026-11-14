import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { WEDDING_DATES } from '../../shared/format';

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.html',
  styleUrl: './countdown.css',
})
export class Countdown {
  private readonly now = signal(Date.now());

  /** Una cuenta regresiva por boda (EE. UU. y Nicaragua). */
  protected readonly events = computed(() =>
    WEDDING_DATES.map((wedding) => {
      const diff = wedding.date.getTime() - this.now();
      const ms = Math.max(diff, 0);
      return {
        ...wedding,
        /** true once the wedding day has passed. */
        married: diff <= 0,
        daysMarried: Math.floor(-diff / DAY),
        units: [
          { value: Math.floor(ms / DAY), label: 'Days' },
          { value: Math.floor((ms % DAY) / HOUR), label: 'Hours' },
          { value: Math.floor((ms % HOUR) / MINUTE), label: 'Minutes' },
          { value: Math.floor((ms % MINUTE) / SECOND), label: 'Seconds' },
        ],
      };
    }),
  );

  constructor() {
    const id = setInterval(() => this.now.set(Date.now()), SECOND);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
