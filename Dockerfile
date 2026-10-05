FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 2019

CMD ["npm", "run", "preview", "--", "--port", "2019", "--host", "0.0.0.0"]
