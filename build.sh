#!/usr/bin/env bash

npm=$(which npm | head -n 1)
docker=$(which docker | head -n 1)

export REACT_APP_API_URL='/api' && $npm run build --prefix ./frontend
$docker build -t shapeshift .