# WGED-site als één zelfstandig HTML-bestand (JS, CSS, fonts en beelden inline).
# Geen npm-build nodig: wat je lokaal in de preview ziet, staat online.
FROM nginxinc/nginx-unprivileged:alpine
COPY --chmod=644 nginx.conf /etc/nginx/conf.d/default.conf
COPY --chmod=644 index.html /usr/share/nginx/html/index.html
EXPOSE 8080
