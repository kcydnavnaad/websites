import type { APIRoute } from 'astro';
import { getEventBySlug } from '../lib/events';

/**
 * Vaste, korte links per event: kpeersv.be/<slug>, bv. /wijndegustatie.
 * Te gebruiken op affiches, Facebook en in mails. Stuurt door naar de inschrijving.
 *
 * Na het event valt de link terug op de homepage in plaats van op een dode
 * inschrijfpagina. Slugs die in geen enkel event voorkomen geven een 404, zodat
 * deze route geen willekeurige typfouten opslokt.
 *
 * Let op: statische routes (/kalender, /lid-worden, ...) hebben in Astro voorrang
 * op deze dynamische route, dus die blijven gewoon werken.
 */
export const GET: APIRoute = ({ params }) => {
  const event = params.slug ? getEventBySlug(params.slug) : null;

  if (!event) {
    return new Response('Niet gevonden', { status: 404 });
  }

  const now = new Date();
  const isActive = now >= event.start && now <= event.end;
  const target = isActive ? event.registrationUrl : '/#home';

  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'no-store',
    },
  });
};
