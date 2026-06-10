# K. Peer SV one-pager

Minimalistische one-page website voor voetbalclub K. Peer SV. Bevat een contactformulier
dat via SMTP2GO verstuurt.

## Stack

- Astro 4 (SSR, `output: 'server'`)
- `@astrojs/node` adapter (standalone)
- Tailwind CSS via `@astrojs/tailwind`
- TypeScript (strict)
- nodemailer voor SMTP2GO
- Node.js 20

## Quick start

```bash
npm install
cp .env.example .env
# vul .env aan met je SMTP2GO credentials
npm run dev
```

Site draait op http://localhost:4321.

### Productie-build lokaal testen

```bash
npm run build
node ./dist/server/entry.mjs
```

## Environment variables

Alle SMTP variabelen worden door `nodemailer` gebruikt vanuit het contact-endpoint (`src/pages/api/contact.ts`).

| Variabele   | Voorbeeld                | Beschrijving                                   |
| ----------- | ------------------------ | ---------------------------------------------- |
| `SMTP_HOST` | `mail.smtp2go.com`       | SMTP2GO hostname                               |
| `SMTP_PORT` | `2525`                   | SMTP poort (587 of 2525 voor SMTP2GO)          |
| `SMTP_USER` | `xxxxxxxxxxxx`           | SMTP2GO username                               |
| `SMTP_PASS` | `xxxxxxxxxxxx`           | SMTP2GO password                               |
| `MAIL_TO`   | `info@peersv.be`         | Ontvanger van berichten                        |
| `MAIL_FROM` | `noreply@peersv.be`      | Geverifieerd afzenderadres in SMTP2GO          |

## Docker

```bash
docker build -t peersv-site .
docker run -p 4321:4321 --env-file .env peersv-site
```

De healthcheck pollt `http://localhost:4321/` elke 30 seconden.

## Deployment

1. Push de image naar GHCR:

   ```bash
   docker tag peersv-site ghcr.io/kcydnavnaad/peersv-site:latest
   docker push ghcr.io/kcydnavnaad/peersv-site:latest
   ```

2. ArgoCD pikt de wijziging op via de [k3s-homelab](https://github.com/kcydnavnaad/k3s-homelab) repo. De manifests staan in `apps/peersv-site/` en worden automatisch gesynchroniseerd naar het `peersv-site` namespace.

3. Maak de SMTP-secret eenmalig aan in het cluster (deze staat **niet** in Git):

   ```bash
   kubectl create secret generic peersv-site-smtp -n peersv-site \
     --from-literal=SMTP_HOST=mail.smtp2go.com \
     --from-literal=SMTP_PORT=2525 \
     --from-literal=SMTP_USER=xxx \
     --from-literal=SMTP_PASS=xxx \
     --from-literal=MAIL_TO=info@peersv.be \
     --from-literal=MAIL_FROM=noreply@peersv.be
   ```

   Bestaat het namespace nog niet, dan zorgt `CreateNamespace=true` in de ArgoCD `Application` daar voor. Wil je de secret vooraf aanmaken: `kubectl create namespace peersv-site`.

## Structuur

```
src/
├── pages/
│   ├── index.astro          # One-pager
│   └── api/contact.ts       # SSR endpoint dat naar SMTP2GO stuurt
├── components/              # Astro components per sectie (Header, Hero, Over, Teams, Contact, Footer)
├── layouts/Layout.astro     # HTML shell + SEO + structured data
└── styles/global.css        # Tailwind base + component classes
```

## Placeholders / TODOs

Zoek op `TODO:` in de codebase. De voornaamste in te vullen items:

- `public/logo.png` — vervangen door echt clublogo
- `public/veld.jpg` — achtergrondfoto van het veld voor de Hero
- `src/components/Over.astro` — oprichtingsjaar, thuishaven, ledenaantal, introtekst
- `src/components/Teams.astro` — ploegenlijst per seizoen (~1x per jaar bijwerken)
- `src/components/Contact.astro` — adres, e-mail, telefoon, externe URL voor wedstrijden
- `src/layouts/Layout.astro` — canonical, og-image, structured-data velden
