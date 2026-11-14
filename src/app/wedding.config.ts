/**
 * Todos los datos de la boda viven aquí.
 * Cambia estos valores y la página entera se actualiza.
 *
 * Los textos marcados con "POR CONFIRMAR" son de ejemplo: reemplázalos
 * con la información real antes de compartir la página.
 */

export interface WeddingEvent {
  /** Sigla que va antes de "Wedding" en los títulos: "US" o "NIC". */
  code: string;
  /** Nombre completo, por ejemplo "US Wedding" (para lectores de pantalla). */
  label: string;
  place: string;
  /** Fecha y hora de la ceremonia, con el desfase horario del lugar. */
  date: Date;
  /** Zona horaria del lugar, para mostrar la fecha correcta. */
  timeZone: string;
  /** Cómo se escribe la fecha: 'us' = MM/DD/AAAA, 'nic' = DD/MM/AAAA. */
  dateStyle: 'us' | 'nic';
}

export interface ScheduleItem {
  time: string;
  title: string;
  place: string;
  description: string;
  icon: 'rings' | 'glass' | 'dinner' | 'music' | 'moon';
}

export interface Venue {
  label: string;
  name: string;
  address: string;
  time: string;
  mapsUrl: string;
}

export interface GalleryPhoto {
  src: string;
  thumb: string;
  alt: string;
  orientation: 'portrait' | 'landscape';
}

const portrait = new Set([1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 19, 21]);

export const WEDDING = {
  /** Nombres tal como aparecen en la portada. */
  partnerOne: 'Justin',
  partnerTwo: 'Melanie',
  /** Monograma del menú y del pie de página. */
  initials: { one: 'J', two: 'M' },

  /**
   * Las dos bodas, en orden. Cada una tiene su propia cuenta regresiva.
   * La hora (4:00 p. m.) está POR CONFIRMAR en las dos.
   */
  weddings: [
    {
      code: 'US',
      label: 'US Wedding',
      place: 'Texas',
      date: new Date('2027-02-27T16:00:00-06:00'),
      timeZone: 'America/Chicago',
      dateStyle: 'us',
    },
    {
      code: 'NIC',
      label: 'NIC Wedding',
      place: 'Nicaragua',
      date: new Date('2027-11-27T16:00:00-06:00'),
      timeZone: 'America/Managua',
      dateStyle: 'nic',
    },
  ] satisfies WeddingEvent[],

  /** Fecha límite para confirmar asistencia (POR CONFIRMAR). */
  rsvpDeadline: new Date('2027-01-27T23:59:00-06:00'),

  /** Zona horaria para mostrar la fecha límite del RSVP. */
  timeZone: 'America/Managua',

  welcome: [
    'Welcome to our wedding website!',
    'We created this space to share all the details of our big day with you: the schedule, how to get there and everything else you need to know.',
    'We can\'t wait to celebrate with you.',
  ],

  story: {
    title: 'Our Story',
    /**
     * Fotos del carrusel de "Nuestra historia" (números de images/gallery/NN.jpg).
     * `bw: true` la muestra en blanco y negro.
     */
    carousel: [
      { n: 1, bw: false },
      { n: 8, bw: true },
      { n: 16, bw: false },
      { n: 3, bw: false },
      { n: 13, bw: true },
      { n: 21, bw: false },
      { n: 5, bw: false },
      { n: 23, bw: true },
      { n: 10, bw: false },
      { n: 2, bw: true },
      { n: 19, bw: false },
      { n: 11, bw: true },
      { n: 6, bw: false },
      { n: 12, bw: true },
    ],
    paragraphs: [
      // POR CONFIRMAR: escribe aquí cómo se conocieron.
      'It all started with a conversation neither of us wanted to end. Since then we have shared trips, laughter, plans and countless cups of coffee, and we realized the best part of every day was living it together.',
      'One day, among cobblestone streets and colonial walls, came the most important question… and the answer was a joyful yes. Now we want to take the next step surrounded by the people we love most.',
    ],
  },

  venues: [
    {
      label: 'Ceremony',
      name: 'Ceremony venue', // POR CONFIRMAR
      address: 'Address to be announced',
      time: '4:00 PM',
      mapsUrl: 'https://maps.google.com',
    },
    {
      label: 'Reception',
      name: 'Reception venue', // POR CONFIRMAR
      address: 'Address to be announced',
      time: '6:00 PM',
      mapsUrl: 'https://maps.google.com',
    },
  ] satisfies Venue[],

  schedule: [
    {
      time: '3:30 PM',
      title: 'Guest arrival',
      place: 'Ceremony',
      description: 'Please arrive early so you can find your seat without rushing.',
      icon: 'rings',
    },
    {
      time: '4:00 PM',
      title: 'Ceremony',
      place: 'Ceremony',
      description: 'The most special moment: "I do."',
      icon: 'rings',
    },
    {
      time: '5:00 PM',
      title: 'Cocktail hour',
      place: 'Reception',
      description: 'Drinks, bites and photos as the sun goes down.',
      icon: 'glass',
    },
    {
      time: '6:30 PM',
      title: 'Dinner',
      place: 'Reception',
      description: 'Toasts, a few words from our loved ones and dinner together.',
      icon: 'dinner',
    },
    {
      time: '8:00 PM',
      title: 'Let\'s dance!',
      place: 'Reception',
      description: 'Our first dance, then the party goes on as long as you can keep up.',
      icon: 'music',
    },
    {
      time: '12:00 AM',
      title: 'Farewell',
      place: 'Reception',
      description: 'Thank you for sharing this special day with us.',
      icon: 'moon',
    },
  ] satisfies ScheduleItem[],

  dressCode: {
    title: 'Formal',
    description:
      'Gentlemen: suit or formal guayabera. Ladies: long or cocktail dress. Please avoid white, which is reserved for the bride.',
    palette: ['#5c6b4a', '#c8b89a', '#e9e1d3', '#8a6f52', '#2f2f2f'],
  },

  gifts: {
    message:
      'Your presence is the greatest gift. If you would like to give us something, a contribution toward our honeymoon and our new home would be greatly appreciated.',
    // POR CONFIRMAR: datos bancarios o enlace a mesa de regalos.
    options: [
      { title: 'Card box', detail: 'There will be a card box at the reception.' },
      { title: 'Bank transfer', detail: 'Bank details to be announced' },
    ],
  },

  /**
   * Canción de fondo. Suena con el reproductor oficial de Spotify: quien tenga
   * sesión de Spotify abierta en el navegador la escucha completa; los demás
   * escuchan la vista previa de 30 segundos que da Spotify.
   */
  music: {
    spotifyTrackId: '2tH28YyKYOldxhuBHoI79M',
    title: 'Our song',
  },

  rsvp: {
    /**
     * URL que recibe las respuestas del formulario (por ejemplo Formspree o
     * un Google Apps Script). Si se deja vacío, el formulario abre un correo
     * con la respuesta lista para enviar a `email`.
     */
    endpoint: '',
    email: 'correo@ejemplo.com', // POR CONFIRMAR
    /** Teléfono para dudas (formato internacional, sin "+"). POR CONFIRMAR */
    whatsapp: '',
    maxGuests: 4,
  },

  gallery: Array.from({ length: 24 }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      src: `images/gallery/${n}.jpg`,
      thumb: `images/gallery/thumbs/${n}.jpg`,
      alt: `Justin and Melanie engagement session, photo ${i + 1}`,
      orientation: portrait.has(i + 1) ? 'portrait' : 'landscape',
    } satisfies GalleryPhoto;
  }),
} as const;

export type Wedding = typeof WEDDING;
