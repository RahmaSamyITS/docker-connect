# Development Stage
FROM node:18 AS development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]

EXPOSE 4000

# Production Stage
FROM node:18 AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production

COPY . .

CMD ["node", "server.js"]

EXPOSE 3000
