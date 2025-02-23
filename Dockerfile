# Base stage for common setup
FROM node:18 AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
ENV NODE_ENV=development
EXPOSE 4000
CMD ["node", "server.js"]

# Production stage
FROM base AS production
RUN npm install --only=production
COPY . .
ENV NODE_ENV=production
EXPOSE 4000
CMD ["node", "server.js"]