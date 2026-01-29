export function generateDockerfile(): string {
  return `
# ---------- Build stage ----------
FROM node:23-slim AS builder
WORKDIR /app

COPY package.json package-lock.json ./ 
RUN npm ci

COPY . .
RUN npm run build

FROM node:23-slim AS runner
WORKDIR /app

COPY --from=builder /app/package.json . 
COPY --from=builder /app/package-lock.json .
COPY --from=builder /app/next.config.ts ./ 
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]

`.trim();
}
