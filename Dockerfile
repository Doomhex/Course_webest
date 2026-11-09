FROM node:22-alpine

WORKDIR /app

# Copy package definition
COPY package*.json ./

# Copy all application files
COPY . .

# Ensure data directory exists for SQLite
RUN mkdir -p data uploads

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server-local.js"]
