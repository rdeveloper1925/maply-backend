# syntax=docker/dockerfile:1.7-labs

ARG NODE_VERSION=20-alpine

FROM node:${NODE_VERSION} AS base
WORKDIR /app
RUN corepack enable

# Install dependencies (with dev deps for building)
FROM base AS deps
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

# Build the app
FROM deps AS build
ENV NODE_ENV=development
COPY tsconfig.json ./
COPY src ./src
# Compile TS and rewrite path aliases using local deps
RUN pnpm exec tsc && pnpm exec tsc-alias -p tsconfig.json

# Production image
FROM node:${NODE_VERSION} AS prod
WORKDIR /app
ENV NODE_ENV=production
RUN corepack enable
COPY package.json pnpm-lock.yaml* ./
RUN --mount=type=cache,id=pnpm-store,target=/root/.local/share/pnpm/store \
    pnpm install --prod --frozen-lockfile --ignore-scripts
COPY --from=build /app/dist ./dist
COPY src/server.ts ./src/server.ts

# App listens on 8080 internally
ENV PORT=8080
EXPOSE 8080

CMD ["node", "dist/server.js"]


