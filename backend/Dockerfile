FROM node:16-alpine

WORKDIR /usr/backend/

COPY package*.json ./


RUN npm install --no-audit

COPY . .

EXPOSE 5000

 CMD  ["npm", "run", "dev"]
