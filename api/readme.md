# Shape Shift API v1
The HTTP service responsible for handling the backend functionality of _Shape Shift_

#### Contributors:
- Jon Parker Brooks
- ...

## Description
This API is implemented in __TypeScript__ using the __Express__ and __MongoDB__ libraries. It is compiled down to regular __JavaScript__ using `tsc`, Then run using the __NodeJS__ runtime.

## Authentication
__Note for frontend__: The backend uses sessions and stores cookies. If authentication doesn't seem to be working, make sure you are supplying the `Set-Cookie` Header back to the client, in a library like __Axios__, you can use [this](https://stackoverflow.com/a/43178070) method.  

using Axios:
```
axios.post('/api/auth/sign-in', {withCredentials: true})
```

## Setup
*Ensure you have __MongoDB__, __NodeJS__ and __NPM__ installed.  
Make sure __MongoDB__ is running and take note of the port it's on. by default it should be `27017`.
1. If not already configured, set up a __MongoDB__ user "_testing_" with password "_testing_" for a database called "_testing_"

    using mongosh:
    ```
    > use testing
    > db.createUser({user: "testing", pwd: "testing", roles: ["readWrite"]})
    ```
    note: If you can't do this, just find the file `./src/db.ts`, and change the value of variable __DB_URL__ to `mongodb://localhost:27017` 
2. Open this directory in your editor of choice, open a terminal and run: `npm install`
3. Run the command `npm run build` to compile the project
4. Run the command `npm run initdb` to initialize the database collections and schema
5. Run the command `npm start` and wait for the message `listening on localhost:3000` to appear. The server is now running

## API v1
'*' = required
- __Authentication__: `/api`
  - __Index__: `/api/`
    - method: __GET__
    - description: _Authentication index, simple status view_
    - parameters: `none`
    - output: current session ID and "logged in" status
  - __Sign In__: `/api/sign-in`
    - method: __POST__
    - description: _Authenticate a user and update their session_
    - parameters: `*username: string, *password: string`
    - output: `200` response on successful authentication, `400` on exception, `404` on email not found
  - __Sign Out__: `/api/sign-out`
    - method: __POST__
    - description: _Drop an authenticated session_
    - parameters: `none`
    - output: `200` on successful sign out, `500` + error message on error
- __Users__: `/api/users`
  - __Create User__: `/api/users/create`
    - method: __POST__
    - description: _Create a new user_
    - parameters: `*username: string, *password: string, email: string, firstName: string, lastName: string, birthday: int`
    - output: newly created user's ID
  - __Select User__: `/api/users/<id>`
    - method: __GET__
    - description: _Get user info based on the ID in the URL_
    - parameters: `none`
    - output: JSON object of the user requested
  - __Delete User__: `/api/users/<id>`
    - method: __DELETE__
    - description: _Remove a user based on the ID in the URL_
    - parameters: `none`
    - output: `200` on successful deletion, `500` on failure

## Features
coming soon...