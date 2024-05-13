# Use an official Node.js LTS (Long Term Support) image as the base
FROM node:lts-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install production dependencies
RUN npm install

# Copy the rest of your application code to the working directory
COPY . .

RUN npm run build

# Expose the port your app runs on (inside the container)
EXPOSE 3000

# Command to run your application
CMD ["npm", "start"]