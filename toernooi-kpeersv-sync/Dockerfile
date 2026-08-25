FROM node:22-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY server.js ./

USER 1000

EXPOSE 8080

CMD ["node", "server.js"]
