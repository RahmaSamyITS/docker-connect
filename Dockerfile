# -------- DEVELOPMENT STAGE --------
    FROM node:18 AS development

    WORKDIR /app
    
    # Copy package files separately for better caching
    COPY package*.json ./
    
    # Install all dependencies for development
    RUN npm install
    
    # Copy all project files
    COPY . .
    
    # Set development environment
    ENV NODE_ENV=development
    
    # Expose the development port
    EXPOSE 4000
    
    CMD ["node", "server.js"]
    
    # -------- PRODUCTION STAGE --------
    FROM node:18 AS production
    
    WORKDIR /app
    
    # Copy package files from the source
    COPY package.json package-lock.json* ./

    
    # Install only production dependencies
    RUN npm install --only=production
    
    # Copy application source files from development stage
    COPY --from=development /app .  
    
    # Set production environment
    ENV NODE_ENV=production
    
    # Expose the production port
    EXPOSE 4000
    
    CMD ["node", "server.js"]
    