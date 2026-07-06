import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

interface InschrijvingPayload {
  naamKind?: string;
  geboortejaar?: string;
  categorie?: string;
  naamOuder?: string;
  email?: string;
  telefoon?: string;
  website_url?: string;
}

const escapeHtml = (input: string): string =>
  input
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export const POST: APIRoute = async ({ request }) => {
  let data: InschrijvingPayload;
  try {
    data = (await request.json()) as InschrijvingPayload;
  } catch {
    return new Response(
      JSON.stringify({ error: 'Ongeldig verzoek' }),
      { status: 400 },
    );
  }

  const {
    naamKind,
    geboortejaar,
    categorie,
    naamOuder,
    email,
    telefoon,
    website_url,
  } = data;

  if (website_url) {
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  }

  if (
    !naamKind ||
    !geboortejaar ||
    !categorie ||
    !naamOuder ||
    !email ||
    !telefoon
  ) {
    return new Response(
      JSON.stringify({ error: 'Verplichte velden ontbreken' }),
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

  const safeNaamKind = escapeHtml(naamKind);
  const safeGeboortejaar = escapeHtml(geboortejaar);
  const safeCategorie = escapeHtml(categorie);
  const safeNaamOuder = escapeHtml(naamOuder);
  const safeEmail = escapeHtml(email);
  const safeTelefoon = escapeHtml(telefoon);

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: jeugdRecipient,
      replyTo: email,
      subject: `Nieuwe inschrijving jeugd - ${naamKind}`,
      text: `Naam kind: ${naamKind}\nGeboortejaar: ${geboortejaar}\nLeeftijdscategorie: ${categorie}\nNaam ouder/voogd: ${naamOuder}\nEmail: ${email}\nTelefoon: ${telefoon}`,
      html: `<h2>Nieuwe inschrijving jeugd — K. Peer SV</h2>
<p><strong>Naam kind:</strong> ${safeNaamKind}</p>
<p><strong>Geboortejaar:</strong> ${safeGeboortejaar}</p>
<p><strong>Leeftijdscategorie:</strong> ${safeCategorie}</p>
<p><strong>Naam ouder/voogd:</strong> ${safeNaamOuder}</p>
<p><strong>Email:</strong> ${safeEmail}</p>
<p><strong>Telefoon:</strong> ${safeTelefoon}</p>`,
    });
  } catch (error) {
    console.error('Inschrijving form error:', error);
    return new Response(
      JSON.stringify({ error: 'Er ging iets mis. Probeer het opnieuw.' }),
      { status: 500 },
    );
  }

  try {
    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: email,
      replyTo: jeugdRecipient,
      subject: 'Bevestiging inschrijving - K. Peer SV',
      text: `Beste ${naamOuder},

Bedankt om je kind in te schrijven bij K. Peer SV! We hebben de inschrijving van ${naamKind} goed ontvangen.

Ingevulde gegevens:
- Naam kind: ${naamKind}
- Geboortejaar: ${geboortejaar}
- Leeftijdscategorie: ${categorie}

Praktisch:
- Startdatum: de trainingen starten in de eerste week van augustus.
- Locatie: Sportcentrum de Deuster, Deusterstraat 74C, 3990 Peer.

We kijken ernaar uit je kind op de training te zien!

Sportieve groeten,
K. Peer SV`,
      html: `<p>Beste ${safeNaamOuder},</p>
<p>Bedankt om je kind in te schrijven bij K. Peer SV! We hebben de inschrijving van <strong>${safeNaamKind}</strong> goed ontvangen.</p>
<h3>Ingevulde gegevens</h3>
<ul>
  <li><strong>Naam kind:</strong> ${safeNaamKind}</li>
  <li><strong>Geboortejaar:</strong> ${safeGeboortejaar}</li>
  <li><strong>Leeftijdscategorie:</strong> ${safeCategorie}</li>
</ul>
<h3>Praktisch</h3>
<ul>
  <li><strong>Startdatum:</strong> de trainingen starten in de eerste week van augustus.</li>
  <li><strong>Locatie:</strong> Sportcentrum de Deuster, Deusterstraat 74C, 3990 Peer.</li>
</ul>
<p>We kijken ernaar uit je kind op de training te zien!</p>
<p>Sportieve groeten,<br>K. Peer SV</p>`,
    });
  } catch (error) {
    console.error('Bevestigingsmail naar ouder faalde:', error);
  }

  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
