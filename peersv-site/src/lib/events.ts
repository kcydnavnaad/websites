/**
 * Club-events — één plek om alle evenementen te configureren.
 *
 * Een nieuw event toevoegen = één object aan `events` toevoegen. De banner op de
 * homepage, het menu-item in de header en de korte link /<slug> lezen allemaal
 * hieruit en verschijnen/verdwijnen automatisch op basis van `start` en `end`.
 * Geen component-wijzigingen nodig.
 *
 * Events uit het verleden mogen in de lijst blijven staan: ze tonen nergens meer,
 * maar hun korte link blijft werken (en stuurt door naar de homepage) voor wie nog
 * een oude affiche of Facebook-post tegenkomt.
 */
export interface ClubEvent {
  /** URL-pad van de korte link, bv. 'wijndegustatie' -> /wijndegustatie */
  slug: string;
  /** Volledige titel, gebruikt als kop in de banner */
  title: string;
  /** Korte titel voor het menu-item in de header */
  shortTitle: string;
  /** Klein label boven de titel, bv. 'Eetfestijn' */
  kicker: string;
  /** Leesbare datumregel, bv. 'Vrijdag 13 november 2026' */
  dates: string;
  /** Vanaf wanneer banner en menu-item tonen */
  start: Date;
  /** Tot en met wanneer alles zichtbaar blijft (einde van het event) */
  end: Date;
  /** Wanneer de online inschrijvingen openen (informatief in de banner) */
  registrationOpens: Date;
  /** Doel van de korte link /<slug> */
  registrationUrl: string;
  location: string;
  /** Paragraaftekst in de banner */
  description: string;
}

export const events: ClubEvent[] = [
  {
    slug: 'wijndegustatie',
    title: 'Wijndegustatie met Wijngedacht',
    shortTitle: 'Wijndegustatie',
    kicker: 'Peer SV vrijdagt',
    dates: 'Vrijdag 13 november 2026',
    start: new Date('2026-10-27T00:00:00+01:00'),
    end: new Date('2026-11-13T23:59:59+01:00'),
    registrationOpens: new Date('2026-10-01T00:00:00+01:00'),
    registrationUrl:
      'https://kpeersv.odoo.com/event/peer-sv-vrijdagt-wijndegustatie-met-wijngedacht-10/register',
    location: 'Kantine K. Peer SV — Deusterstraat 74, 3990 Peer',
    description:
      'Een avond fijn tafelen met proefwijnen van Wijngedacht. Degustatie, aangepaste hapjes en een glas in goede sfeer in onze kantine.',
  },
  {
    // Voorbij — staat hier enkel zodat de oude link kpeersv.be/mosselfestijn
    // (affiches, Facebook) netjes op de homepage uitkomt in plaats van op een 404.
    slug: 'mosselfestijn',
    title: 'Mosselfestijn 2026',
    shortTitle: 'Mosselfestijn',
    kicker: 'Eetfestijn',
    dates: 'Zaterdag 24 & zondag 25 oktober 2026',
    start: new Date('2026-09-09T00:00:00+02:00'),
    end: new Date('2026-10-25T23:59:59+02:00'),
    registrationOpens: new Date('2026-09-28T08:00:00+02:00'),
    registrationUrl:
      'https://kpeersv.vdk-consulting.be/event/mosselfestijn-2026-7/register',
    location: 'Kantine K. Peer SV — Deusterstraat 74, 3990 Peer',
    description:
      'Mosselen, friet, videe, stoofvlees of een koude schotel in onze kantine, met spelers, trainers, supporters, familie en vrienden. Kies je dag en uur, stel je menu samen en betaal meteen online.',
  },
];

/** Het event dat nu loopt. Bij overlap wint het event dat eerst in de lijst staat. */
export const getActiveEvent = (now: Date = new Date()): ClubEvent | null =>
  events.find((e) => now >= e.start && now <= e.end) ?? null;

/** Zoek een event op slug, ook als het al voorbij is. */
export const getEventBySlug = (slug: string): ClubEvent | null =>
  events.find((e) => e.slug === slug) ?? null;

export const isRegistrationOpen = (
  event: ClubEvent,
  now: Date = new Date(),
): boolean => now >= event.registrationOpens && now <= event.end;

const fmt = new Intl.DateTimeFormat('nl-BE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Brussels',
});

export const registrationOpensLabel = (event: ClubEvent): string =>
  fmt.format(event.registrationOpens);
