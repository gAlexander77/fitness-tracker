<div>
<div align="center"><img src="frontend/assets/ShapeShiftLogo.png" width="300"/>
</div>

---
## /frontend 
* React.js Web Application
---
## /api
* Express API

## How to Run Development Locally
```sh
# install the JS deps
npm install --prefix ./api
npm install --prefix ./frontend
# to run the API server, place the .env file from our discord in the ./api folder.
# to find it use CTRL+f in the general chat and search for ".env"
cp ~/Downloads/env ./api/.env # discord usually downloads to the ~/Downloads folder
npm run start --prefix ./api # start the API
# now open a second terminal session to run the frontend webpack server. the .env file
# under ./frontend should have the entry 'REACT_APP_API_URL="http://localhost:3001/api"'
npm run start --prefix ./frontend
```

## How to Build & Run Docker Container
```sh
# building
chmod +x ./build.sh
./build.sh

# running
docker run -it -p 80:80 --rm shapeshift:latest
```
The server will be running on port 80, visit http://localhost in your browser.