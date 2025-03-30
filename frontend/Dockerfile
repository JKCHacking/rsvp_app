FROM node:22-bullseye

WORKDIR /app

COPY package*.json ./
# Install all dependencies (including dev dependencies)
RUN npm install

COPY . .

EXPOSE 3000

ENV CHOKIDAR_USEPOLLING=true
ENV NODE_ENV=development
ENV TAILWIND_MODE=watch

# Start the development server
CMD ["npm", "run", "dev"]