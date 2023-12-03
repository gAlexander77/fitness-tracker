#!/usr/bin/env bash

npm=$(which npm | head -n 1)
docker=$(which docker | head -n 1)

$npm install --prefix ./api
$npm install --prefix ./frontend

export REACT_APP_API_URL='/api' && $npm run build --prefix ./frontend
$docker build -t shapeshift .