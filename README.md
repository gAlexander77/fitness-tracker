<div>
<div align="center"><img src="frontend/assets/ShapeShiftLogo.png" width="300"/>
</div>

---
## /frontend 
* React.js Web Application
---
## /api
* Express API

## How to Build & Run Docker Container
```sh
# building
chmod +x ./build.sh
./build.sh

# running
docker run -it -p 80:80 --rm shapeshift:latest
```
The server will be running on port 80, visit http://localhost in your browser.