FROM node:24-alpine

ENV COREPACK_HOME=/tmp/corepack
WORKDIR /workspace

RUN corepack enable
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./
COPY apps ./apps
COPY packages ./packages
COPY tsconfig.base.json eslint.config.mjs .prettierrc.json ./

RUN pnpm install --frozen-lockfile
RUN pnpm --filter @assetforge/config build
EXPOSE 3000 4000
