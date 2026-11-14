import { Component, input } from '@angular/core';

export type IconName = 'rings' | 'glass' | 'dinner' | 'music' | 'moon' | 'pin' | 'bed' | 'gift' | 'envelope';

/** Thin line icons drawn inline, so they follow the text color. */
@Component({
  selector: 'app-icon',
  template: `
    <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.4"
      stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      @switch (name()) {
        @case ('rings') {
          <circle cx="19" cy="28" r="10" /><circle cx="29" cy="28" r="10" />
          <path d="M21 10l3-4 3 4-3 3z" />
        }
        @case ('glass') {
          <path d="M14 8h8l-1 12a3 3 0 01-6 0zM26 8h8l-1 12a3 3 0 01-6 0z" />
          <path d="M18 23v15M30 23v15M14 38h8M26 38h8" />
        }
        @case ('dinner') {
          <circle cx="24" cy="26" r="11" /><circle cx="24" cy="26" r="6" />
          <path d="M6 12v8a3 3 0 006 0v-8M9 12v28M40 12c-3 2-4 6-4 11h4v17" />
        }
        @case ('music') {
          <path d="M19 34V12l18-4v22" /><circle cx="15" cy="34" r="4" /><circle cx="33" cy="30" r="4" />
        }
        @case ('moon') {
          <path d="M33 31A14 14 0 0119 13a14 14 0 1014 18z" /><path d="M35 10l1 3 3 1-3 1-1 3-1-3-3-1 3-1z" />
        }
        @case ('pin') {
          <path d="M24 42s13-12 13-23a13 13 0 00-26 0c0 11 13 23 13 23z" /><circle cx="24" cy="19" r="5" />
        }
        @case ('bed') {
          <path d="M6 36V12M6 28h36v8M42 28v-4a6 6 0 00-6-6H20v10" /><circle cx="13" cy="22" r="4" />
        }
        @case ('gift') {
          <rect x="8" y="18" width="32" height="8" /><path d="M11 26v14h26V26M24 18v22" />
          <path d="M24 18c-3-6-11-7-11-2 0 3 6 2 11 2zM24 18c3-6 11-7 11-2 0 3-6 2-11 2z" />
        }
        @case ('envelope') {
          <rect x="7" y="12" width="34" height="24" /><path d="M7 12l17 14 17-14" />
        }
      }
    </svg>
  `,
  styles: `
    :host { display: inline-block; width: 40px; height: 40px; }
    svg { width: 100%; height: 100%; }
  `,
})
export class Icon {
  readonly name = input.required<IconName>();
}
