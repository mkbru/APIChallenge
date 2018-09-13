FROM node:6.9.2

COPY package*.json ./
RUN npm install

COPY ..
EXPOSE 8080

ENTRYPOINT ["node","server.js"]
