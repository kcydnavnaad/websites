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
# nginx-unprivileged draait als niet-root (uid 101) en luistert op 8080.
# Config rechtstreeks in conf.d: compatibel met readOnlyRootFilesystem.
FROM nginxinc/nginx-unprivileged:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 8080
