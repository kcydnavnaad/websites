import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

interface ContactPayload {
  naam?: string;
  email?: string;
  telefoon?: string;
  bedrijf?: string;
  dienst?: string;
  bericht?: string;
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
  try {
    const data = (await request.json()) as ContactPayload;
    const { naam, email, telefoon, bedrijf, dienst, bericht, website_url } = data;

    // Honeypot - if filled, silently return success (bot)
    if (website_url) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    }

    if (!naam || !email || !bericht) {
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

    const safeNaam = escapeHtml(naam);
    const safeEmail = escapeHtml(email);
    const safeTelefoon = telefoon ? escapeHtml(telefoon) : '-';
    const safeBedrijf = bedrijf ? escapeHtml(bedrijf) : '-';
    const safeDienst = dienst ? escapeHtml(dienst) : '-';
    const safeBericht = escapeHtml(bericht).replace(/\n/g, '<br>');

    await transporter.sendMail({
      from: { name: 'VDK-Consulting website', address: process.env.MAIL_FROM ?? '' },
      to: process.env.MAIL_TO,
      replyTo: email,
      subject: `Nieuw bericht via VDK-Consulting website van ${naam}`,
      text: `Nieuw bericht via de VDK-Consulting website.\n\nNaam: ${naam}\nEmail: ${email}\nTelefoon: ${telefoon || '-'}\nBedrijf: ${bedrijf || '-'}\nInteresse: ${dienst || '-'}\n\nBericht:\n${bericht}`,
      html: `<h2>Nieuw bericht via VDK-Consulting website</h2>
<p><strong>Naam:</strong> ${safeNaam}</p>
<p><strong>Email:</strong> ${safeEmail}</p>
<p><strong>Telefoon:</strong> ${safeTelefoon}</p>
<p><strong>Bedrijf:</strong> ${safeBedrijf}</p>
<p><strong>Interesse:</strong> ${safeDienst}</p>
<p><strong>Bericht:</strong></p>
<p>${safeBericht}</p>`,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'Er ging iets mis. Probeer het opnieuw.' }),
      { status: 500 },
    );
  }
};
