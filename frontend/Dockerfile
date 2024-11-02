# Stage 1: Build
FROM node:21-alpine AS build
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Copy Tailwind config
COPY tailwind.config.js ./

# Install dependencies
RUN npm ci

# Copy source files
COPY . .

# Build Tailwind CSS
RUN npm run build

# Stage 2: Serve with Nginx
FROM nginx:1.25.3-alpine
WORKDIR /usr/share/nginx/html

# Copy built assets from build stage
COPY --from=build /app/css/styles.css ./css/
COPY --from=build /app/index.html .
# Copy Nginx configuration if needed
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

