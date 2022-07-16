FROM node:16-alpine as react-build
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "tsconfig.json", "/app/"]
COPY ./ /app/
RUN cd /app && npm install
RUN npm -s run build