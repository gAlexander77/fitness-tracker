FROM alpine
EXPOSE 80

RUN apk add nginx npm

ADD --chown=nginx ./api ./home/api
ADD --chown=nginx ./frontend/build /var/www/html
ADD --chown=nginx ./etc/nginx.conf /etc/nginx/http.d/default.conf
ADD --chown=nginx ./etc/entrypoint.sh .

WORKDIR /home/api
RUN npm install

WORKDIR /
CMD ["sh", "entrypoint.sh"]