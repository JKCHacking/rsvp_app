# Use the official Node.js image as the base image
FROM node:18-alpine AS base

# Set the working directory in the container
WORKDIR /app

# Install dependencies
FROM base AS dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the project files (excluding node_modules)
FROM dependencies AS dev
COPY . .

# Expose the development port
EXPOSE 3000

# Use chokidar polling for hot reloading (useful for Docker on some systems)
ENV CHOKIDAR_USEPOLLING=true
ENV NODE_ENV=development

# Run the Next.js development server with hot reloading
CMD ["npm", "run", "dev"]
