FROM node:16-bullseye-slim

ENV PUPPETEER_SKIP_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium
ENV CHROME_PATH=/usr/bin/chromium
ENV DEBIAN_FRONTEND=noninteractive

WORKDIR /usr/app
COPY package*.json .

RUN apt update -qq \
        && apt install -qq -y --no-install-recommends \
        curl \
        git \
        gnupg \
        libgconf-2-4 \
        libxss1 \
        libxtst6 \
        python \
        g++ \
        build-essential \
        chromium \
        chromium-sandbox \
        dumb-init \
        fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst \
        && rm -rf /var/lib/apt/lists/* \
        && rm -rf /src/*.deb

RUN npm install \
        && npm install typescript -g

COPY . .

EXPOSE 5501

ENTRYPOINT [ "npm", "run", "dev" ]
