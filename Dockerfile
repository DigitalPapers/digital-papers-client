FROM node:18-alpine As development

WORKDIR /usr/src/app

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .

RUN npm run build

FROM nginx as production

COPY --from=development /usr/src/app/dist /usr/share/nginx/html
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf

EXPOSE 9010