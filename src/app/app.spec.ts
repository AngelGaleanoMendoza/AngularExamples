import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { WEDDING } from './wedding.config';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should render the couple names in the hero', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const h1 = (fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent ?? '';
    expect(h1).toContain(WEDDING.partnerOne);
    expect(h1).toContain(WEDDING.partnerTwo);
  });

  it('should render every main section', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;
    for (const id of ['inicio', 'historia', 'itinerario', 'ubicacion', 'hospedaje', 'galeria', 'preguntas', 'regalos', 'rsvp']) {
      expect(el.querySelector(`#${id}`), id).not.toBeNull();
    }
  });
});
