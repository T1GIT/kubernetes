
FROM node:20-alpine AS development

WORKDIR /usr/src/app
COPY --chown=node:node package.json yarn.lock ./
RUN yarn install --frozen-lockfile


FROM node:20-alpine AS build

WORKDIR /usr/src/app
ENV NODE_ENV=production
COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules
COPY --chown=node:node . .
RUN yarn build
RUN yarn install --production --frozen-lockfile && yarn cache clean


FROM node:20-alpine AS production

ENV NODE_ENV=production
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist
USER node
CMD [ "node", "dist/main.js" ]


