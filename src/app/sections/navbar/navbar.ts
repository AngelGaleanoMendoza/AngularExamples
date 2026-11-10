import { Component, HostListener, signal } from '@angular/core';
import { WEDDING } from '../../wedding.config';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  protected readonly w = WEDDING;
  protected readonly scrolled = signal(false);
  protected readonly open = signal(false);

  protected readonly links = [
    { href: '#inicio', label: 'Inicio' },
    { href: '#historia', label: 'Historia' },
    { href: '#itinerario', label: 'Itinerario' },
    { href: '#ubicacion', label: 'Ubicación' },
    { href: '#hospedaje', label: 'Hospedaje' },
    { href: '#galeria', label: 'Galería' },
    { href: '#regalos', label: 'Regalos' },
  ];

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 40);
  }

  @HostListener('document:keydown.escape')
  close(): void {
    this.open.set(false);
  }

  toggle(): void {
    this.open.update((v) => !v);
  }
}
