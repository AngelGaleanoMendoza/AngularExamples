import { WEDDING, WeddingEvent } from '../wedding.config';

const LOCALE = 'en-US';

/** "April 17, 2027", en la hora local de la boda, sin importar dónde esté el invitado. */
export function longDate(date: Date, timeZone = WEDDING.timeZone): string {
  return new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long', year: 'numeric', timeZone }).format(date);
}

/** "02/27/2027" para la boda de EE. UU. y "27/11/2027" para la de Nicaragua. */
export function weddingDate(wedding: WeddingEvent): string {
  const locale = wedding.dateStyle === 'us' ? 'en-US' : 'en-GB';
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: wedding.timeZone,
  }).format(wedding.date);
}

/** Las bodas con su fecha ya escrita, para mostrarlas en la plantilla. */
export const WEDDING_DATES = WEDDING.weddings.map((w) => ({ ...w, dateText: weddingDate(w) }));
