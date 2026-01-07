FROM node:20-alpine
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --silent

COPY server.js ./
EXPOSE 3000
CMD ["npm", "start"]
