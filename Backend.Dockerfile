FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build -- api --prod

CMD ["node", "dist/apps/api/main.js"]
