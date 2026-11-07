import { Component, computed, effect, signal } from '@angular/core';
import { WEDDING } from '../../wedding.config';
import { RevealDirective } from '../../shared/reveal.directive';

@Component({
  selector: 'app-gallery',
  imports: [RevealDirective],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
  host: {
    '(document:keydown)': 'onKey($event)',
  },
})
export class Gallery {
  protected readonly photos = WEDDING.gallery;
  /** Index of the photo open in the viewer, or null when closed. */
  protected readonly current = signal<number | null>(null);
  protected readonly photo = computed(() => {
    const i = this.current();
    return i === null ? null : this.photos[i];
  });

  constructor() {
    effect(() => {
      document.body.style.overflow = this.current() === null ? '' : 'hidden';
    });
  }

  open(i: number): void {
    this.current.set(i);
  }

  close(): void {
    this.current.set(null);
  }

  step(delta: number): void {
    const i = this.current();
    if (i === null) return;
    const n = this.photos.length;
    this.current.set((i + delta + n) % n);
  }

  onKey(e: KeyboardEvent): void {
    if (this.current() === null) return;
    if (e.key === 'Escape') this.close();
    if (e.key === 'ArrowRight') this.step(1);
    if (e.key === 'ArrowLeft') this.step(-1);
  }
}
