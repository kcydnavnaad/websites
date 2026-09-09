import type { APIRoute } from 'astro';
import { mosselfestijn, isMosselfestijnActive } from '../lib/mosselfestijn';

/**
 * Vaste, korte link: kpeersv.be/mosselfestijn
 * Te gebruiken op affiches, Facebook en in mails. Stuurt door naar de Odoo-inschrijving.
 * Na het event valt de link terug op de homepage in plaats van een dode Odoo-pagina.
 */
export const GET: APIRoute = () => {
  const target = isMosselfestijnActive() ? mosselfestijn.registrationUrl : '/#home';
  return new Response(null, {
    status: 302,
    headers: {
      Location: target,
      'Cache-Control': 'no-store',
    },
  });
};
