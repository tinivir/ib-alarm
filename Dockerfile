FROM node:10.16

RUN mkdir -p /app/
RUN mkdir -p /app/front
RUN mkdir -p /app/server
COPY front/package.json /app/front/package.json
COPY front/yarn.lock /app/front/yarn.lock
COPY server/package.json /app/server/package.json
COPY server/yarn.lock /app/server/yarn.lock

WORKDIR /app
RUN yarn --cwd ./front
RUN yarn --cwd ./server

COPY front /app/front
COPY server /app/server
COPY package.json /app/package.json

RUN yarn front

EXPOSE 1235
CMD yarn server

