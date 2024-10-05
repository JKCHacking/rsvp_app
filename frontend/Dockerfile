# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the project files to the container
COPY . .

# Expose the port that the Next.js server will run on
EXPOSE 3000

# Run the Next.js development server with hot reloading
CMD ["npm", "run", "dev"]