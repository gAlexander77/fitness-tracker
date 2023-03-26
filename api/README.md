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
axios.post('/api/sign-in', {username: ..., password: ...}, {withCredentials: true})
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
2. Open this directory in your editor of choice, open a terminal and run: `npm install`
3. Run the command `npm start initdb` to initialize the database collections and schema.
   **NOTE: this will also fill the workouts collection if there is a `workouts.json` file in the root directory**
    - you can remove everything created in the database by using `npm start nukedb` 
4. Run the command `npm test` to start the unit tests.
5. Run the command `npm start` and wait for the environment variable printout to appear. The server is now running

## API v1
## Index `/api`
- __Index__: 
  - path: `/api/`
  - method: __GET__
  - description: _User's main view_
  - output: object of the currently authenticated user
- __Sign in__: 
  - path: `/api/sign-in`
  - body: `*username: string, *password: string`
  - method: __POST__
  - description: _Authenticate a user and update their session_
- __Sign out__: 
  - path: `/api/sign-out`
  - method: __POST__
  - description: _Drop an authenticated session_
## Users `/api/users`
- __Find all users__:
  - path: `/api/users/`
  - method: __GET__
  - description: _Get all public user info available_
  - output: array of user objects
- __Find one user__:
  - path: `/api/users/<id>`
  - url parameters: `id: string`
  - method: __GET__
  - description: _Get user info based on the ID in the URL_
  - output: `object of the specified user`
- __Create a user__:
  - path: `/api/users/create`
  - body: `*username: string, *password: string`
  - method: __POST__
  - description: _Create a new user_
## Workouts `/api/workouts`
- _TODO_ - __Create a workout__:
  - path: `/api/workouts/create`
  - body: `???`
  - method: __POST__
  - description: _Creates a new workout under the current user_
- __Find all workouts__:
  - path: `/api/workouts/`
  - method: __GET__
  - description: _Get all workouts in the database_
  - output: `array of workout objects`
## Workout Groups and Splits `/api/splits`
- _TODO_ - __Update splits__:
  - path: `/api/splits/`
  - body: `???`
  - method: __POST__
  - description: _Updates the days each group is assigned_
- _TODO_ - __Delete a workout group__:
  - path: `/api/splits/<id>`
  - url parameters: `id: string`
  - method: __DELETE__
  - description: _Deletes the specified workout group_
- _TODO_ - __Remove a workout from a group__:
  - path: `???`
  - body: `???`
  - method: __DELETE__
  - description: _Removes a workout from the specified group_
- __Create a workout group__:
  - path: `/api/splits/create`
  - body: `groupName: string`
  - method: __POST__
  - description: _Creates a new workout group_
- __Add a workout to a group__:
  - path: `/api/splits/<id>`
  - url parameters: `id: string` _(the workout group ID)_
  - body: `workout: string` _(the workout ID)_
  - method: __POST__
  - description: _Adds a workout from the database to the specified group_

