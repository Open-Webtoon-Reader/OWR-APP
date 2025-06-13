FROM node:22-slim AS base

WORKDIR /app

# Build
FROM base AS build

COPY package.json pnpm-lock.yaml ./
RUN corepack enable && pnpm install

COPY . .

RUN pnpm run build

# Run
FROM base

ENV NODE_ENV=production

COPY --from=build /app/.output /app/.output

CMD ["node", ".output/server/index.mjs"]
