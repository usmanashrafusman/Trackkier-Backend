FROM node:21-alpine3.18

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]