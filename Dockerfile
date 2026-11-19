FROM node:26-slim AS base

WORKDIR /app

# Dependencies
FROM base AS dependencies

COPY package*.json ./
RUN npm ci --ignore-scripts

# Modules
FROM dependencies AS modules

RUN npm prune --omit=dev --ignore-scripts

# Build
FROM dependencies AS builder

COPY . ./
RUN npm run build

# Runtime
FROM base AS dist

ENV NODE_ENV=production

COPY --chown=node:node package.json ./
COPY --chown=node:node --from=modules /app/node_modules ./node_modules
COPY --chown=node:node --from=builder /app/dist ./dist
COPY --chown=node:node --from=builder /app/migrations ./migrations

USER node

EXPOSE 3000

CMD ["node", "dist/index.js"]
