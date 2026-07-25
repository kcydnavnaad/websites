import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

interface ProeftrainingPayload {
  voornaamKind?: string;
  achternaamKind?: string;
  geboortedatum?: string;
  naamOuder?: string;
  email?: string;
  telefoon?: string;
  privacyAkkoord?: unknown;
  website_url?: string;
}

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const isTruthy = (value: unknown): boolean =>
  value === true ||
  value === 'true' ||
  value === 'on' ||
  value === 'ja' ||
  value === '1' ||
  value === 1;

export const POST: APIRoute = async ({ request }) => {
  let data: ProeftrainingPayload;
  try {
    data = (await request.json()) as ProeftrainingPayload;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Ongeldig verzoek' }),
      { status: 400 },
    );
  }

  const {
    voornaamKind,
    achternaamKind,
    geboortedatum,
    naamOuder,
    email,
    telefoon,
    privacyAkkoord,
    website_url,
  } = data;

  if (website_url) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  if (
    !voornaamKind ||
    !achternaamKind ||
    !geboortedatum ||
    !naamOuder ||
    !email ||
    !telefoon
  ) {
    return new Response(
      JSON.stringify({ error: 'Verplichte velden ontbreken' }),
      { status: 400 },
    );
  }

  if (!isTruthy(privacyAkkoord)) {
    return new Response(
      JSON.stringify({ error: 'Akkoord met het privacybeleid is verplicht.' }),
      { status: 400 },
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return new Response(
      JSON.stringify({ error: 'Ongeldig email adres' }),
      { status: 400 },
    );
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT ?? '2525', 10),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const jeugdRecipient = process.env.MAIL_JEUGD ?? process.env.MAIL_TO;

  const volledigeNaamKind = `${voornaamKind} ${achternaamKind}`.trim();

  const safeVoornaamKind = escapeHtml(voornaamKind);
  const safeAchternaamKind = escapeHtml(achternaamKind);
  const safeVolledigeNaamKind = escapeHtml(volledigeNaamKind);
  const safeGeboortedatum = escapeHtml(geboortedatum);
  const safeNaamOuder = escapeHtml(naamOuder);
  const safeEmail = escapeHtml(email);
  const safeTelefoon = escapeHtml(telefoon);

  const from = {
    name: 'K. Peer SV website',
    address: process.env.MAIL_FROM ?? '',
  };

  try {
    await transporter.sendMail({
      from,
      to: jeugdRecipient,
      replyTo: email,
      subject: `[PROEFTRAINING] Nieuwe proeftraining-aanvraag - ${volledigeNaamKind}`,
      text: `Nieuwe proeftraining-aanvraag via de K. Peer SV website.

Voornaam kind: ${voornaamKind}
Achternaam kind: ${achternaamKind}
Geboortedatum: ${geboortedatum}
Naam ouder/voogd: ${naamOuder}
E-mail: ${email}
Telefoon: ${telefoon}
Privacybeleid geaccepteerd: ja`,
      html: `<h2>Nieuwe proeftraining-aanvraag — via K. Peer SV website</h2>
<p><strong>Voornaam kind:</strong> ${safeVoornaamKind}</p>
<p><strong>Achternaam kind:</strong> ${safeAchternaamKind}</p>
<p><strong>Geboortedatum:</strong> ${safeGeboortedatum}</p>
<p><strong>Naam ouder/voogd:</strong> ${safeNaamOuder}</p>
<p><strong>E-mail:</strong> ${safeEmail}</p>
<p><strong>Telefoon:</strong> ${safeTelefoon}</p>
<p><strong>Privacybeleid geaccepteerd:</strong> ja</p>`,
    });
  } catch (error) {
    console.error('Proeftraining form error:', error);
    return new Response(
      JSON.stringify({ error: 'Er ging iets mis. Probeer het opnieuw.' }),
      { status: 500 },
    );
  }

  try {
    await transporter.sendMail({
      from,
      to: email,
      replyTo: process.env.MAIL_JEUGD,
      subject: 'Bevestiging proeftraining - K. Peer SV',
      text: `Beste ${naamOuder},

Bedankt om ${volledigeNaamKind} in te schrijven voor een proeftraining bij K. Peer SV! We hebben je aanvraag om eens mee te trainen goed ontvangen via onze website.

Ingevulde gegevens:
- Naam kind: ${volledigeNaamKind}
- Geboortedatum: ${geboortedatum}

Praktisch:
- Startdatum: de trainingen starten in de eerste week van augustus.
- Locatie: Sportcentrum de Deuster, Deusterstraat 74C, 3990 Peer.

Kom gerust een keer meetrainen, geen lidmaatschap vereist. We kijken ernaar uit je kind op de training te zien!

Sportieve groeten,
K. Peer SV

— Deze bevestiging werd automatisch verstuurd via de K. Peer SV website.`,
      html: `<p>Beste ${safeNaamOuder},</p>
<p>Bedankt om <strong>${safeVolledigeNaamKind}</strong> in te schrijven voor een proeftraining bij K. Peer SV! We hebben je aanvraag om eens mee te trainen goed ontvangen via onze website.</p>
<h3>Ingevulde gegevens</h3>
<ul>
  <li><strong>Naam kind:</strong> ${safeVolledigeNaamKind}</li>
  <li><strong>Geboortedatum:</strong> ${safeGeboortedatum}</li>
</ul>
<h3>Praktisch</h3>
<ul>
  <li><strong>Startdatum:</strong> de trainingen starten in de eerste week van augustus.</li>
  <li><strong>Locatie:</strong> Sportcentrum de Deuster, Deusterstraat 74C, 3990 Peer.</li>
</ul>
<p>Kom gerust een keer meetrainen, geen lidmaatschap vereist. We kijken ernaar uit je kind op de training te zien!</p>
<p>Sportieve groeten,<br>K. Peer SV</p>
<p style="color:#666;font-size:12px;margin-top:24px;">— Deze bevestiging werd automatisch verstuurd via de K. Peer SV website.</p>`,
    });
  } catch (error) {
    console.error('Bevestigingsmail proeftraining naar ouder faalde:', error);
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
