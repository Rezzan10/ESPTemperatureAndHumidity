FROM nginx:latest
COPY /docker/nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY /ui/dist/ /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]