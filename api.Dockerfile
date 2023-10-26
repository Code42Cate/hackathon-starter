FROM node:20.5.1-alpine AS base

FROM base AS builder
RUN apk add --no-cache libc6-compat
RUN apk update
# Set working directory
WORKDIR /app
RUN npm install -g turbo
COPY . .
RUN turbo prune --scope=api --docker

# Add lockfile and package.json's of isolated subworkspace
FROM base AS installer
RUN apk add --no-cache libc6-compat
RUN apk update
WORKDIR /app


# First install the dependencies (as they change less often)
COPY --from=builder /app/out/json/ .
COPY --from=builder /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN corepack enable && corepack prepare pnpm@8.6.2 --activate

RUN pnpm --version
RUN pnpm install --frozen-lockfile

# Build the project
COPY --from=builder /app/out/full/ .
CMD pnpm dlx turbo run build --filter=api

FROM base AS runner
WORKDIR /app

# Don't run production as root
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 hono
USER hono

COPY --from=installer /app/apps/api/package.json .

# Automatically leverage output traces to reduce image size
COPY --from=installer --chown=hono:nodejs /app/apps/api/.next/standalone ./
COPY --from=installer --chown=hono:nodejs /app/apps/api/.next/static ./apps/api/.next/static
COPY --from=installer --chown=hono:nodejs /app/apps/api/public ./apps/api/public

CMD node apps/api/server.js