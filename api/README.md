# Shape Shift API v1
The HTTP service responsible for handling the backend functionality of _Shape Shift_

#### Contributors:
- Parker
- Diego 
- Jeremy

## Setup
You must have NodeJS and NPM installed on your system. Optionally you may install
and run your own mongo instance or use a free Atlas account (check out https://www.mongodb.com/free-cloud-database)
1. 

## API v1 Endpoints
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
- __Update splits__:
  - path: `/api/splits/`
  - body: `weeklySplit: array<string>`
  - method: __POST__
  - description: _Updates the days each group is assigned_
- __Remove a workout from a group__:
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