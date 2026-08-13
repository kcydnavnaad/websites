FROM nginxinc/nginx-unprivileged:1.27-alpine

COPY --chown=101:101 index.html /usr/share/nginx/html/index.html
COPY --chown=101:101 nginx.conf /etc/nginx/conf.d/default.conf

USER 101

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8080/healthz || exit 1
