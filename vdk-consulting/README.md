# VDK-Consulting deploy — stap voor stap

Alles wat je nodig hebt om vdk-consulting live te krijgen in K3s, patroon identiek aan peersv-site.

## Wat zit er in dit zip

```
vdk-consulting/                    → in ~/VDK/websites/
├── src/
│   ├── layouts/Layout.astro
│   ├── pages/
│   │   ├── index.astro
│   │   ├── diensten.astro
│   │   ├── over.astro
│   │   ├── contact.astro
│   │   └── api/contact.ts        ← SMTP2GO endpoint
│   ...
├── public/favicon.svg
├── Dockerfile
├── astro.config.mjs
├── package.json
├── .dockerignore
├── .env.example
└── .gitignore

gh-workflow/
└── vdk-consulting-build.yml       → in ~/VDK/websites/.github/workflows/

k3s-manifests/vdk-consulting/     → in ~/VDK/k3s-homelab/apps/vdk-consulting/
├── application.yaml
├── deployment.yaml
└── service.yaml
```

## Deploy stappen

### 1. Kopieer code naar websites repo

```bash
# Vanuit ~/VDK/
cp -r ~/Downloads/vdk-consulting-deploy/vdk-consulting websites/vdk-consulting
cp ~/Downloads/vdk-consulting-deploy/gh-workflow/vdk-consulting-build.yml \
   websites/.github/workflows/

cd websites
git add vdk-consulting .github/workflows/vdk-consulting-build.yml
git commit -m "feat: add vdk-consulting site (Astro SSR)"
git push
```

Na push start GitHub Actions automatisch de build. Duurt ~2 min. Check via:
```
https://github.com/kcydnavnaad/websites/actions
```

### 2. Test lokaal (optioneel, maar aanbevolen)

```bash
cd ~/VDK/websites/vdk-consulting
cp .env.example .env
# Vul SMTP2GO creds in .env
npm install
npm run dev
# Ga naar http://localhost:4321
```

### 3. K8s SMTP secret aanmaken

```bash
# Maak namespace
kubectl create namespace vdk-consulting

# Maak SMTP secret (waarden uit peersv-site-smtp of nieuwe SMTP2GO gebruiker)
kubectl create secret generic vdk-consulting-smtp \
  --from-literal=SMTP_HOST=mail.smtp2go.com \
  --from-literal=SMTP_PORT=2525 \
  --from-literal=SMTP_USER=<jouw smtp2go user> \
  --from-literal=SMTP_PASS=<jouw smtp2go pass> \
  --from-literal=MAIL_TO=info@vdk-consulting.be \
  --from-literal=MAIL_FROM=noreply@vdk-consulting.be \
  -n vdk-consulting
```

### 4. K8s manifests naar k3s-homelab repo

```bash
mkdir -p ~/VDK/k3s-homelab/apps/vdk-consulting
cp ~/Downloads/vdk-consulting-deploy/k3s-manifests/vdk-consulting/*.yaml \
   ~/VDK/k3s-homelab/apps/vdk-consulting/

cd ~/VDK/k3s-homelab
git add apps/vdk-consulting
git commit -m "feat: add vdk-consulting app"
git push
```

### 5. ArgoCD Application deployen

```bash
kubectl apply -f ~/VDK/k3s-homelab/apps/vdk-consulting/application.yaml

# Verify
sleep 20
kubectl get application -n argocd vdk-consulting
kubectl get pods -n vdk-consulting
kubectl get svc -n vdk-consulting
```

### 6. DNS via OctoDNS

Voeg zone file voor `vdk-consulting.be` toe aan `~/VDK/dns/zones/`:

```yaml
# ~/VDK/dns/zones/vdk-consulting.be.yaml
---
'':
  type: A
  values:
    - 192.0.2.1  # placeholder - Cloudflare Tunnel handelt af
www:
  type: CNAME
  value: vdk-consulting.be.
```

En update `~/VDK/dns/config/config.yaml` om deze zone mee te nemen.

**Belangrijk**: `vdk-consulting.be` moet eerst als domein toegevoegd worden in Cloudflare (Add Site → free plan → ns records overzetten bij Combell).

### 7. Cloudflare Tunnel route

In Cloudflare Zero Trust dashboard:
- Networks → Tunnels → `webbaas-NAS-tunnel` → Public Hostnames
- Add public hostname:
  - Subdomain: (leeg)
  - Domain: vdk-consulting.be
  - Service: HTTP://192.168.1.164:80
- Herhaal voor `www.vdk-consulting.be` → zelfde service

### 8. Test

```bash
# Wacht tot DNS propagates (kan tot 5 min)
curl -I https://vdk-consulting.be
# Verwacht: HTTP/2 200

# Test contact form
curl -X POST https://vdk-consulting.be/api/contact \
  -H 'Content-Type: application/json' \
  -d '{"naam":"Test","email":"jou@webbaas.be","bericht":"Test"}'
# Verwacht: {"success":true}
```

Check je inbox op info@vdk-consulting.be.

## Design tokens

CSS variables in `src/layouts/Layout.astro`:

```css
--bg: #0B1220;       /* Nachtblauw */
--surface: #131C2E;  /* Kaarten */
--text: #F5F5F0;     /* Off-white */
--muted: #A0AEC0;
--accent: #E4B04A;   /* Goud */
```

Fonts: Fraunces (display), Inter (body), JetBrains Mono (utility).
