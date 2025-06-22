FROM node:23 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable
RUN corepack use pnpm@latest-10

WORKDIR /app

COPY . ./

FROM base AS prod-dependencies
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM base
COPY --from=prod-dependencies /app/node_modules /app/node_modules
COPY --from=build /app/dist /app/dist

EXPOSE 5491

CMD [ "pnpm", "prod" ]