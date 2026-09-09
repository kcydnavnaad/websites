/**
 * Mosselfestijn — één plek om het jaarlijkse event te configureren.
 *
 * Elk jaar aan te passen: `year`, `dates`, `start`, `end` en `registrationUrl`.
 * Banner, menu-item en de redirect op /mosselfestijn lezen allemaal uit dit bestand
 * en verdwijnen automatisch na `end`.
 */
export const mosselfestijn = {
  year: 2026,
  title: 'Mosselfestijn 2026',
  /** Leesbare datumregel voor banner en menu. */
  dates: 'Zaterdag 24 & zondag 25 oktober 2026',
  /** Vanaf wanneer de banner en het menu-item tonen. */
  start: new Date('2026-09-09T00:00:00+02:00'),
  /** Tot en met deze datum blijft alles zichtbaar (einde van het event). */
  end: new Date('2026-10-25T23:59:59+02:00'),
  /** Wanneer de online inschrijvingen openen (enkel informatief in de banner). */
  registrationOpens: new Date('2026-09-23T08:00:00+02:00'),
  /**
   * Odoo-eventpagina. Voeg `/register` toe om direct op de slotkeuze te landen.
   * Kan overschreven worden met de env var MOSSELFESTIJN_URL (handig zonder rebuild).
   */
  registrationUrl:
    import.meta.env.MOSSELFESTIJN_URL ??
    'https://kpeersv.odoo.com/event/mosselfestijn-2026-7/register',
  location: 'Kantine K. Peer SV — Deusterstraat 74, 3990 Peer',
} as const;

export const isMosselfestijnActive = (now: Date = new Date()): boolean =>
  now >= mosselfestijn.start && now <= mosselfestijn.end;

export const isRegistrationOpen = (now: Date = new Date()): boolean =>
  now >= mosselfestijn.registrationOpens && now <= mosselfestijn.end;

const fmt = new Intl.DateTimeFormat('nl-BE', {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Europe/Brussels',
});

export const registrationOpensLabel = (): string => fmt.format(mosselfestijn.registrationOpens);
