FROM node:8.9.1

LABEL maintainer="vtelyatnikov@axmit.com"

WORKDIR /home/node/app

RUN apt-get update && \
  apt-get install zip -y && \
  apt-get clean && \
  zip --version

# Install npm packages
COPY package.json yarn.lock ./
RUN yarn install

# Copy sources
COPY *.json \
      *.config.js \
      .env* \
    ./
COPY src src

# Image settings
EXPOSE 8082
CMD [ "yarn", "start:docker" ]
