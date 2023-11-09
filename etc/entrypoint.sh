nohup npm run start --prefix /home/api > api.log &
nginx
tail -qf ./api.log /var/log/nginx/access.log