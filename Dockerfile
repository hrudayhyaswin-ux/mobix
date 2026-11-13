FROM node:20-slim

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build || true

ENV PORT=7860
ENV NODE_ENV=production
EXPOSE 7860

CMD ["npx", "tsx", "server/index.ts"]
