FROM node:16-alpine as react-build
RUN mkdir /app
WORKDIR /app
COPY package.json package-lock.json ./
RUN cd /app && npm install
COPY . .
RUN npm -s run build

##
FROM nginx
COPY --from=react-build /app/build /usr/share/nginx/html:ro
COPY conf.d/server.conf /etc/nginx/conf.d/default.conf
EXPOSE 80