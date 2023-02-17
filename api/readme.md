# Shape Shift API v1
An HTTP service responsible for handling the backend functionality of _Shape Shift_

#### Authors:
- Jon Parker Brooks
- ...
#### Tech Stack:
- TypeScript
- Express (JS)
- NodeJS
- MongoDB

## Description
This API is implemented in __TypeScript__ using the __Express__ and __MongoDB__ libraries. It is compiled down to regular __JavaScript__ using `tsc`, Then run using the __NodeJS__ runtime.

The _Shape Shift_ API conforms to the CRUD standard of API writing, meaning relevent endpoints will follow this general structure: `/api/<database entities>/[create | <id>]`

For example, an endpoint for something to do with a user would look like this: `/api/users/...`

This, however, wont explicitly apply to all endpoints. For example, the authentication endpoint doesn't have a counterpart entity in the database, so interacting with it will follow slightly different standards.

To get started, follow the guide below.

## Guide
__Note for frontend__: The backend uses sessions and stores cookies. If authentication doesn't seem to be working, make sure you are supplying the `Set-Cookie` Header back to the client, in a library like __Axios__, you can use [this](https://stackoverflow.com/a/43178070) method.

### Setup
Ensure you have __MongoDB__ installed locally or have a remote instance set up, make sure __Mongo__ is running and take note of the port it's on. You should of course have __NodeJS__ and __NPM__ installed on your system as well.
1. If not already configured, set up a __Mongo__ user "_testing_" with password "_testing_" for a database called "_testing_"

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
- __Authentication__: `/api/auth`
  - __Index__: `/api/auth/`
    - method: GET
    - description: Authentication index, simple status view
    - parameters: `none`
    - output: current session ID and "logged in" status
  - __Sign In__: `/api/auth/sign-in`
    - method: POST
    - description: Authenticate a user and update their session
    - parameters: `*email: string, *password: string`
    - output: 200 response on successful authentication, 400 on exception, 404 on email not found
  - __Sign Out__: `/api/auth/sign-out`
    - method: POST
    - description: Drop an authenticated session
    - parameters: `none`
    - output: 200 on successful sign out, 500 + error message on error

## Features
coming soon...