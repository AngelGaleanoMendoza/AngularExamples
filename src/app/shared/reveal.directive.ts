import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

/**
 * Fades an element in when it scrolls into view.
 * Elements already on screen when the page loads stay visible from the start,
 * so the first frame (and link previews) never show empty sections.
 */
@Directive({
  selector: '[appReveal]',
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject<ElementRef<HTMLElement>>(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    if (typeof IntersectionObserver === 'undefined') return;

    let first = true;
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (first) {
          first = false;
          if (entry.isIntersecting) {
            this.observer?.disconnect();
            return;
          }
          node.classList.add('reveal');
          return;
        }
        if (entry.isIntersecting) {
          node.classList.add('is-visible');
          this.observer?.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' },
    );
    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
