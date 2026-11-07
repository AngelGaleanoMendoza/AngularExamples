import { WEDDING } from '../wedding.config';

const LOCALE = 'es-NI';
/** Las fechas se muestran en la hora local de la boda, sin importar dónde esté el invitado. */
const timeZone = WEDDING.timeZone;

/** "17 de abril de 2027" */
export function longDate(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, { day: 'numeric', month: 'long', year: 'numeric', timeZone }).format(date);
}

/** "sábado, 17 de abril de 2027" */
export function fullDate(date: Date): string {
  return new Intl.DateTimeFormat(LOCALE, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone,
  }).format(date);
}

/** "17 · 04 · 2027" */
export function dottedDate(date: Date): string {
  const parts = new Intl.DateTimeFormat('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone }).formatToParts(date);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  return `${get('day')} · ${get('month')} · ${get('year')}`;
}
