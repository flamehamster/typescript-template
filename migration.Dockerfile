FROM node:26-slim

WORKDIR /app

COPY --chown=node:node package*.json ./
RUN npm ci --omit=dev --ignore-scripts

COPY --chown=node:node migrations ./migrations

USER node

ENTRYPOINT ["node", "./migrations/run.mjs"]
