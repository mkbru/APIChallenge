FROM node:8.4.0
EXPOSE 8080
COPY server.js .
CMD node server.js
