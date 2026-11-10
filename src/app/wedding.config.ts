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
    '¡Bienvenidos a nuestra página de boda!',
    'Creamos este espacio para compartir con ustedes todos los detalles de nuestro gran día: el itinerario, cómo llegar, dónde hospedarse y todo lo que necesitan saber.',
    'No vemos la hora de celebrar con ustedes.',
  ],

  story: {
    title: 'Nuestra historia',
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
      'Todo empezó con una conversación que ninguno de los dos quería terminar. Desde entonces hemos compartido viajes, risas, planes y mil cafés, y entendimos que lo mejor de cada día era vivirlo juntos.',
      'Un día, entre calles empedradas y paredes coloniales, llegó la pregunta más importante… y la respuesta fue un sí lleno de emoción. Ahora queremos dar el siguiente paso rodeados de las personas que más queremos.',
    ],
  },

  venues: [
    {
      label: 'Ceremonia',
      name: 'Lugar de la ceremonia', // POR CONFIRMAR
      address: 'Dirección por confirmar',
      time: '4:00 p. m.',
      mapsUrl: 'https://maps.google.com',
    },
    {
      label: 'Recepción',
      name: 'Lugar de la recepción', // POR CONFIRMAR
      address: 'Dirección por confirmar',
      time: '6:00 p. m.',
      mapsUrl: 'https://maps.google.com',
    },
  ] satisfies Venue[],

  schedule: [
    {
      time: '3:30 p. m.',
      title: 'Llegada de invitados',
      place: 'Ceremonia',
      description: 'Les pedimos llegar con tiempo para acomodarse con calma.',
      icon: 'rings',
    },
    {
      time: '4:00 p. m.',
      title: 'Ceremonia',
      place: 'Ceremonia',
      description: 'El momento más especial: el "sí, acepto".',
      icon: 'rings',
    },
    {
      time: '5:00 p. m.',
      title: 'Cóctel de bienvenida',
      place: 'Recepción',
      description: 'Bebidas, bocadillos y fotos mientras cae el atardecer.',
      icon: 'glass',
    },
    {
      time: '6:30 p. m.',
      title: 'Cena',
      place: 'Recepción',
      description: 'Brindis, palabras de los padrinos y una cena para compartir.',
      icon: 'dinner',
    },
    {
      time: '8:00 p. m.',
      title: '¡A bailar!',
      place: 'Recepción',
      description: 'Primer baile de los novios y fiesta hasta que el cuerpo aguante.',
      icon: 'music',
    },
    {
      time: '12:00 a. m.',
      title: 'Despedida',
      place: 'Recepción',
      description: 'Gracias por acompañarnos en este día tan especial.',
      icon: 'moon',
    },
  ] satisfies ScheduleItem[],

  dressCode: {
    title: 'Formal',
    description:
      'Caballeros: traje o guayabera formal. Damas: vestido largo o de cóctel. Les sugerimos evitar el color blanco, reservado para la novia.',
    palette: ['#5c6b4a', '#c8b89a', '#e9e1d3', '#8a6f52', '#2f2f2f'],
  },

  gifts: {
    message:
      'Su presencia es nuestro mejor regalo. Si desean tener un detalle con nosotros, agradeceremos su aporte para nuestra luna de miel y nuestro nuevo hogar.',
    // POR CONFIRMAR: datos bancarios o enlace a mesa de regalos.
    options: [
      { title: 'Lluvia de sobres', detail: 'Habrá un buzón especial durante la recepción.' },
      { title: 'Transferencia', detail: 'Datos bancarios por confirmar' },
    ],
  },

  /**
   * Canción de fondo. Suena con el reproductor oficial de Spotify: quien tenga
   * sesión de Spotify abierta en el navegador la escucha completa; los demás
   * escuchan la vista previa de 30 segundos que da Spotify.
   */
  music: {
    spotifyTrackId: '2tH28YyKYOldxhuBHoI79M',
    title: 'Nuestra canción',
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
      alt: `Sesión de fotos de Anderson y Mongalo, foto ${i + 1}`,
      orientation: portrait.has(i + 1) ? 'portrait' : 'landscape',
    } satisfies GalleryPhoto;
  }),
} as const;

export type Wedding = typeof WEDDING;
