import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { WEDDING } from '../../wedding.config';

/** Lo mínimo que usamos de la API de iframes de Spotify. */
interface SpotifyController {
  play(): void;
  pause(): void;
  restart(): void;
  addListener(event: 'ready', cb: () => void): void;
  addListener(event: 'playback_update', cb: (e: PlaybackUpdate) => void): void;
  destroy(): void;
}

interface PlaybackUpdate {
  data: { isPaused: boolean; isBuffering: boolean; duration: number; position: number };
}

interface SpotifyIframeApi {
  createController(
    el: HTMLElement,
    options: { uri: string; width?: string | number; height?: string | number },
    cb: (controller: SpotifyController) => void,
  ): void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIframeApi) => void;
  }
}

const API_URL = 'https://open.spotify.com/embed/iframe-api/v1';

/**
 * Portada de entrada + canción de fondo.
 * Los navegadores no permiten que una página suene sin que la persona toque algo,
 * así que la canción arranca al tocar "Abrir invitación".
 */
@Component({
  selector: 'app-music',
  templateUrl: './music.html',
  styleUrl: './music.css',
})
export class Music {
  protected readonly w = WEDDING;
  /** Ruta relativa para que funcione en cualquier subcarpeta (GitHub Pages). */
  protected readonly introBackground =
    'linear-gradient(rgba(36, 43, 30, 0.72), rgba(36, 43, 30, 0.86)), url(images/hero-movil.jpg)';

  /** true mientras se ve la portada de entrada. */
  protected readonly intro = signal(true);
  protected readonly leaving = signal(false);
  protected readonly playing = signal(false);
  /** Muestra el reproductor de Spotify (si el navegador no dejó arrancar la música). */
  protected readonly panel = signal(false);
  protected readonly hint = signal(false);

  private readonly embed = viewChild.required<ElementRef<HTMLElement>>('embed');
  private controller?: SpotifyController;
  private ready = false;
  /** La persona quiere música (tocó play y no pausó). */
  private wanted = false;
  private failTimer?: ReturnType<typeof setTimeout>;

  constructor() {
    effect(() => {
      document.documentElement.classList.toggle('is-locked', this.intro());
    });

    afterNextRender(() => this.loadSpotify());

    inject(DestroyRef).onDestroy(() => {
      clearTimeout(this.failTimer);
      this.controller?.destroy();
    });
  }

  open(withMusic: boolean): void {
    if (withMusic) this.play();
    this.leaving.set(true);
    setTimeout(() => this.intro.set(false), 700);
  }

  toggle(): void {
    if (this.playing()) {
      this.wanted = false;
      this.controller?.pause();
    } else {
      this.play();
    }
  }

  togglePanel(): void {
    this.panel.update((v) => !v);
    this.hint.set(false);
  }

  private play(): void {
    this.wanted = true;
    if (this.ready) this.controller?.play();
    // Si en unos segundos no suena (bloqueo del navegador o sin conexión con
    // Spotify), mostramos el reproductor para que la persona toque play ahí.
    clearTimeout(this.failTimer);
    this.failTimer = setTimeout(() => {
      if (this.wanted && !this.playing()) {
        this.panel.set(true);
        this.hint.set(true);
      }
    }, 3500);
  }

  private loadSpotify(): void {
    window.onSpotifyIframeApiReady = (api) => {
      api.createController(
        this.embed().nativeElement,
        { uri: `spotify:track:${WEDDING.music.spotifyTrackId}`, width: '100%', height: 80 },
        (controller) => {
          this.controller = controller;
          controller.addListener('ready', () => {
            this.ready = true;
            if (this.wanted && !this.playing()) controller.play();
          });
          controller.addListener('playback_update', ({ data }) => {
            this.playing.set(!data.isPaused);
            if (!data.isPaused) this.hint.set(false);
            // Al terminar (o al acabar la vista previa) vuelve a empezar.
            const ended = data.duration > 0 && data.position >= data.duration - 800;
            if (this.wanted && data.isPaused && ended) controller.restart();
          });
        },
      );
    };

    if (!document.querySelector(`script[src="${API_URL}"]`)) {
      const script = document.createElement('script');
      script.src = API_URL;
      script.async = true;
      document.body.appendChild(script);
    }
  }
}
