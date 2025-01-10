FROM node:20-alpine AS development

WORKDIR /usr/src/app

COPY --chown=node:node package.json yarn.lock ./

RUN yarn install --frozen-lockfile

USER node


FROM node:20-alpine AS build

WORKDIR /usr/src/app
ENV NODE_ENV=production

COPY --chown=node:node package.json yarn.lock ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .
RUN yarn build



RUN yarn install --production --frozen-lockfile && yarn cache clean

USER node


FROM node:20-alpine AS production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

ENV NODE_ENV=production

CMD [ "node", "dist/main.js" ]
