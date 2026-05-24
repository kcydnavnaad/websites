# trouw-menu

Statische menukaart voor de bruiloft van Rhyana & Daan, bereikbaar via QR-code op elke tafel.

- Live: <https://menu.webbaas.be>
- Image: `ghcr.io/kcydnavnaad/trouw-menu:<versie>` (semver, geen `:latest` in productie)
- Cluster: k3s homelab, namespace `trouw-menu`, MetalLB IP `192.168.1.159`
- Cloudflare Tunnel public hostname `menu.webbaas.be` → `http://192.168.1.159:80`

## Lokaal testen

```bash
cd webbaas/trouw-menu
python3 -m http.server 8080
# open http://localhost:8080
```

Print-stylesheet meegeleverd, dus `Cmd+P` levert direct een nette afdruk.

## Wijzigen en uitrollen

1. Bewerk `index.html` of `styles.css`.
2. Commit + push naar `main`. De GitHub Action `trouw-menu · build & push` triggert op wijzigingen onder `webbaas/trouw-menu/**` en publiceert naar `ghcr.io/kcydnavnaad/trouw-menu`.
3. Voor een nieuwe versie: tag de commit als `trouw-menu-vX.Y.Z` (bv. `git tag trouw-menu-v1.1.0 && git push origin trouw-menu-v1.1.0`). De Action duwt dan `:X.Y.Z` plus `:latest`.
4. Bump de image in `k3s-homelab/apps/trouw-menu/application.yaml` naar de nieuwe versie en push. ArgoCD doet de rest (`automated.selfHeal: true`).

## Eerste keer: setup in het cluster

```bash
# Namespace
kubectl create namespace trouw-menu

# ghcr pull secret (gebruikt dezelfde naam als alle andere apps)
kubectl create secret docker-registry ghcr-pull-secret \
  --namespace trouw-menu \
  --docker-server=ghcr.io \
  --docker-username=kcydnavnaad \
  --docker-password='<PAT_met_read:packages>' \
  --docker-email=daan.vandyck@dynapps.be

# ArgoCD application aanvoegen
kubectl apply -f apps/trouw-menu/application.yaml
```

Daarna pakt ArgoCD de Deployment en Service automatisch op.

## Cloudflare Tunnel

Public hostname in de tunnel-config:

```
menu.webbaas.be   →   http://192.168.1.159:80
```

Geen Ingress in het cluster nodig: de tunnel praat rechtstreeks tegen de LoadBalancer-IP.
