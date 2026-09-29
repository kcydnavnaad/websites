# WGED — testsite (wged.webbaas.be)

`index.html` is de volledige site in één bestand (three.js, fonts en beelden inline).
De broncode (Vite-project) staat apart in `Second brain/02 Projecten/WGED/wged-site.zip`.

Deploy: push naar `main` → GHA `wged-build.yml` → `ghcr.io/kcydnavnaad/wged:latest`, daarna
`kubectl --context dell-srv-01 -n wged rollout restart deploy/wged`.
