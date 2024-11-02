# Build stage
FROM node:lts-alpine AS build

# Set author name
LABEL authors="Michele Speroni"

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm ci

# Copy the rest of your application code, including .env file
COPY . .

# Build the TypeScript project
RUN npm run build

# Production stage
FROM node:lts-alpine AS production

WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install only production dependencies
RUN npm ci --only=production

# Copy built assets from the build stage
COPY --from=build /app/dist ./dist

# Copy .env file from build stage
COPY --from=build /app/.env ./.env

# Expose the port your app runs on (this is for documentation, it doesn't actually open the port)
EXPOSE 3000

# Command to run your application
ENTRYPOINT ["node", "dist/index.js"]