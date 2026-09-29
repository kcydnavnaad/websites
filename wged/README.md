# WGED — website

Statische Vite-site met een three.js-scène (flenssteun die zichzelf tekent en
op scroll van schets naar productiestuk gaat). NL/EN, geen backend.

```bash
npm install
npm run dev       # lokaal
npm run build     # -> dist/
```

## Deploy (kcydnavnaad)
- Monorepo `kcydnavnaad/websites`, map `wged/`; bestaande workflow `.github/workflows/wged-build.yml` bouwt met context `./wged` naar `ghcr.io/kcydnavnaad/wged:latest`.
- Manifests in `kcydnavnaad/k3s-homelab/apps/wged/` (ArgoCD). Service port 80 -> targetPort 8080, LoadBalancer 10.20.0.116, Cloudflare Tunnel ongewijzigd.
- Na een push: `kubectl -n wged rollout restart deploy/wged` (de tag blijft `latest`).
- nginx.conf staat rechtstreeks in conf.d (geen envsubst), dus compatibel met readOnlyRootFilesystem. `/healthz` geeft 200 voor de probes.

## Nog te doen voor livegang
- Echte projectbeelden/renders van Wim
- Privacyverklaring + btw-nummer in de footer
- `public/img/og.jpg` vervangen door een definitief deelbeeld
