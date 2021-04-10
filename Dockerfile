FROM node:15-alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ./app /app

EXPOSE 1313

CMD ["node","server/server.js"]