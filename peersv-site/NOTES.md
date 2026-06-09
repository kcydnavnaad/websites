# peersv-site — handmatige nastappen

Checklist voor wat ArgoCD / de GitHub Action niet automatisch doen.

## 1. SMTP2GO sender verifiëren

- [ ] Log in op het SMTP2GO dashboard.
- [ ] Maak (of hergebruik) een **SMTP-user** en noteer username + password.
- [ ] Voeg het `MAIL_FROM`-domein (bv. `peersv.be`) toe als **Sender Domain** en
      doorloop de DNS-verificatie (SPF + DKIM records).
      Mailen *naar* `info@<domein>` mag altijd; mailen *vanaf* een
      niet-geverifieerd domein wordt door SMTP2GO geweigerd.

## 2. Kubernetes secret aanmaken

Token mag niet in Git terechtkomen. Vervang `<user>`, `<pass>`, `<domein>`:

```bash
kubectl create secret generic peersv-site-smtp -n peersv-site \
  --from-literal=SMTP_HOST=mail.smtp2go.com \
  --from-literal=SMTP_PORT=2525 \
  --from-literal=SMTP_USER=<user> \
  --from-literal=SMTP_PASS=<pass> \
  --from-literal=MAIL_TO=info@<domein> \
  --from-literal=MAIL_FROM=noreply@<domein>
```

> Het `peersv-site` namespace wordt door ArgoCD aangemaakt (`CreateNamespace=true`).
> Als het secret vóór de eerste sync nodig is: `kubectl create namespace peersv-site`
> draaien.

## 3. Cloudflare Tunnel public hostname

Cloudflare Zero Trust -> **Networks** -> **Tunnels** -> bestaande tunnel ->
**Public Hostnames** -> **Add a public hostname**:

- Subdomain: `peersv` (of `www`, of de root van het domein)
- Domain: `<peersv-domein>`
- Service: `HTTP` -> `192.168.1.161:80`

> TLS wordt afgehandeld door Cloudflare. Geen Ingress, geen cert-manager.

## 4. Verifieer na ArgoCD-sync

```bash
kubectl get svc -n peersv-site
```

Verwacht: `EXTERNAL-IP` = `192.168.1.161`.

Bij `<pending>`: pak een ander vrij IP uit de MetalLB-range, bv.
`192.168.1.152`, en pas `apps/peersv-site/service.yaml` aan
(`metallb.io/loadBalancerIPs`) plus de Cloudflare-tunnel-config.

## 5. Inhoud invullen

Zoek op `TODO:` in `websites/peersv-site/`. Belangrijkste items:

- [ ] `public/logo.png` — vervangen door echt clublogo
- [ ] `public/veld.jpg` — achtergrondfoto Hero (en `hidden` weghalen in `Hero.astro`)
- [ ] `src/components/Over.astro` — oprichtingsjaar, thuishaven, ledenaantal, intro
- [ ] `src/components/Teams.astro` — ploegen voor het lopende seizoen
- [ ] `src/components/Contact.astro` — adres, e-mail, telefoon, externe URL
      voor wedstrijden & uitslagen (Voetbal Vlaanderen of vergelijkbaar)
- [ ] `src/layouts/Layout.astro` — `canonical`, `ogImage`, en de
      `SportsClub` structured-data velden
- [ ] `src/components/Footer.astro` — social URLs (of items verwijderen die niet bestaan)
