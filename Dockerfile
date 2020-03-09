FROM node:alpine
EXPOSE 3000
EXPOSE 4444


WORKDIR /home/node
COPY . /home/node

