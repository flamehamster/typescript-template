FROM node:26-slim

WORKDIR /app

CMD ["sh", "-c", "HUSKY=0 npm ci && exec npm run dev"]
