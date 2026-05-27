# WebBaas landingspagina

Marketing site voor WebBaas, een Belgisch webbureau dat professionele websites bouwt vanaf €500 binnen 30 dagen. One-pager met intake-formulier dat via SMTP2GO verstuurt.

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
| `MAIL_TO`   | `info@webbaas.be`        | Ontvanger van intake-aanvragen                 |
| `MAIL_FROM` | `noreply@webbaas.be`     | Geverifieerd afzenderadres in SMTP2GO          |

## Docker

```bash
docker build -t webbaas .
docker run -p 4321:4321 --env-file .env webbaas
```

De healthcheck pollt `http://localhost:4321/` elke 30 seconden.

## Deployment

1. Push de image naar GHCR:

   ```bash
   docker tag webbaas ghcr.io/kcydnavnaad/webbaas:latest
   docker push ghcr.io/kcydnavnaad/webbaas:latest
   ```

2. ArgoCD pikt de wijziging op via de [k3s-homelab](https://github.com/kcydnavnaad/k3s-homelab) repo. De manifests staan in `apps/web-baas/` en worden automatisch gesynchroniseerd naar het `web-baas` namespace.

3. Maak de SMTP-secret eenmalig aan in het cluster (deze staat **niet** in Git):

   ```bash
   kubectl create secret generic web-baas-smtp -n web-baas \
     --from-literal=SMTP_HOST=mail.smtp2go.com \
     --from-literal=SMTP_PORT=2525 \
     --from-literal=SMTP_USER=xxx \
     --from-literal=SMTP_PASS=xxx \
     --from-literal=MAIL_TO=info@webbaas.be \
     --from-literal=MAIL_FROM=noreply@webbaas.be
   ```

   Bestaat het namespace nog niet, dan zorgt `CreateNamespace=true` in de ArgoCD `Application` daar voor. Wil je de secret vooraf aanmaken: `kubectl create namespace web-baas`.

## Structuur

```
src/
├── pages/
│   ├── index.astro          # One-pager
│   └── api/contact.ts       # SSR endpoint dat naar SMTP2GO stuurt
├── components/              # Astro components per sectie
├── layouts/Layout.astro     # HTML shell + SEO + structured data
└── styles/global.css        # Tailwind base + component classes
```
