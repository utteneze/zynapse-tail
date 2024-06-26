# -- Setup Stage --
FROM node:20-alpine AS base

RUN npm i -g pnpm

# -- Dependency Stage --
FROM base AS dependencies

WORKDIR /app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# -- Build Stage --
FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN pnpm build
RUN pnpm prune --prod

# -- Deploy Stage --
FROM base AS deploy

WORKDIR /app
COPY --from=build /app/package.json ./package.json
COPY --from=build /app/dist/ ./dist/
COPY --from=build /app/node_modules ./node_modules

EXPOSE 3001

CMD [ "node", "./dist/index.js" ]