import { Component, DestroyRef, computed, inject, signal } from '@angular/core';
import { WEDDING } from '../../wedding.config';

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
  private readonly diff = computed(() => WEDDING.date.getTime() - this.now());

  /** true once the wedding day has passed. */
  protected readonly married = computed(() => this.diff() <= 0);

  protected readonly units = computed(() => {
    const ms = Math.max(this.diff(), 0);
    return [
      { value: Math.floor(ms / DAY), label: 'Días' },
      { value: Math.floor((ms % DAY) / HOUR), label: 'Horas' },
      { value: Math.floor((ms % HOUR) / MINUTE), label: 'Minutos' },
      { value: Math.floor((ms % MINUTE) / SECOND), label: 'Segundos' },
    ];
  });

  protected readonly daysMarried = computed(() => Math.floor(-this.diff() / DAY));

  constructor() {
    const id = setInterval(() => this.now.set(Date.now()), SECOND);
    inject(DestroyRef).onDestroy(() => clearInterval(id));
  }

  protected pad(n: number): string {
    return String(n).padStart(2, '0');
  }
}
