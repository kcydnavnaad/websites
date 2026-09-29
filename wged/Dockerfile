# syntax=docker/dockerfile:1
# Opgebouwd volgens Second brain/klant-hosting/genereer.py (npm-variant)

# --- build ---
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
# (geen build-time variabelen: statische site)
RUN npm run build

# --- runtime ---
# nginx-unprivileged draait als niet-root en luistert op 8080.
# containerPort in Nimbus dus op 8080 zetten (chart staat standaard op 3000).
FROM nginxinc/nginx-unprivileged:alpine AS runtime
COPY nginx.conf /etc/nginx/templates/default.conf.template
COPY --from=build /app/dist /usr/share/nginx/html
# Standaard leeg: zonder deze variabele laat envsubst ${DEV_BANNER_HTML} staan
# en weigert nginx te starten (onbekende variabele). De helm-chart overschrijft hem op dev.
ENV DEV_BANNER_HTML=""
EXPOSE 8080
