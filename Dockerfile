FROM node:alpine

ENV NODE_ENV=production

WORKDIR /app

COPY ./app /app

EXPOSE 1313

CMD ["node","app.js"]
