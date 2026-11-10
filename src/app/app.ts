import { Component } from '@angular/core';
import { Navbar } from './sections/navbar/navbar';
import { Hero } from './sections/hero/hero';
import { Countdown } from './sections/countdown/countdown';
import { Welcome } from './sections/welcome/welcome';
import { SaveTheDate } from './sections/save-the-date/save-the-date';
import { Story } from './sections/story/story';
import { Schedule } from './sections/schedule/schedule';
import { Venues } from './sections/venues/venues';
import { Gallery } from './sections/gallery/gallery';
import { Gifts } from './sections/gifts/gifts';
import { Rsvp } from './sections/rsvp/rsvp';
import { Footer } from './sections/footer/footer';

@Component({
  selector: 'app-root',
  imports: [
    Navbar,
    Hero,
    Countdown,
    Welcome,
    SaveTheDate,
    Story,
    Schedule,
    Venues,
    Gallery,
    Gifts,
    Rsvp,
    Footer,
  ],
  templateUrl: './app.html',
})
export class App {}
