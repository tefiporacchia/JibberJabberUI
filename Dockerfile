FROM node:16-alpine as react-build
RUN mkdir /app
WORKDIR /app
COPY ["package.json", "tsconfig.json", "/app/"]
COPY ./ /app/
RUN cd /app && npm install
RUN npm -s run build

##
FROM nginx
COPY --from=build-step /build/build /usr/share/nginx/html
COPY ./conf.d/server.conf /etc/nginx/conf.d/server.conf
EXPOSE 80