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
- __Create a user__:
  - path: `/api/users/create`
  - body: `*username: string, *password: string`
  - method: __POST__
  - description: _Create a new user_
## Workouts `/api/workouts`
- __Find all workouts__:
  - path: `/api/workouts/`
  - method: __GET__
  - description: _Get all workouts in the database_
  - output: `array of workout objects`
## Workout Groups and Splits `/api/splits`