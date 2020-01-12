FROM node:12.14

COPY . /app

WORKDIR /app

RUN cd /app
RUN npm run compile

CMD ["node" ,"./dist/index.js"]
