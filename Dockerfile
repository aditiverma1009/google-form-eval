# # 1. use existing dokcer image as base image
# FROM alpine

# # download and install dependencies
# RUN apk add --update redis

# # start the startup command
# CMD ["redis-server"]

# 1. use existing dokcer image as base image
FROM node:latest

# RUN apk add --update node
WORKDIR /usr/app
COPY ./ ./
RUN npm install

CMD [ "npm","start" ]


# FROM node:16-alpine

# WORKDIR /usr/app

# COPY ./package.json ./package.json
# RUN npm install

# COPY ./ ./

# CMD ["npm","start"]