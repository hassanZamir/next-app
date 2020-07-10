FROM node:10-alpine

WORKDIR /opt/app

ENV NODE_ENV production

COPY package*.json ./

RUN npm ci 

COPY . /opt/app

COPY .env.test /opt/app/.env

RUN npm install --dev && npm run build

##CMD [ "npm", "start" ]
