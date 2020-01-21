FROM nginx:alpine

RUN apk add --no-cache bash
COPY build /usr/share/nginx/html
COPY deployment/nginx-app.conf /etc/nginx/conf.d/default.conf
