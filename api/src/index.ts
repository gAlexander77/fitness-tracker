// NPM imports
import session from 'express-session';
import express from 'express';
import { Db } from 'mongodb';

// local imports
import { connectToDatabase } from './db';
import users from './routes/users';
import auth from './routes/auth';

// first thing's first, connect to the database
// source: db.ts
connectToDatabase("testing") // specify database
	.then((_db: Db) => {
		// MAIN: API SERVER
		const app = express(); // grab a handle to the main express object
		const api = [ // we've defined this array of objects here to make the code more
			{ name: "/auth", route: auth }, // readable, and to make extending the API
			{ name: "/users", route: users }, // more manageable
		];

		app.use(express.static("./public")); // serve static files for the frontend like "workouts.json"
		app.use(express.json()); // this is a JSON API
		app.use(session({ // set up sessions for user authentication
			secret: "fitness",
			resave: false,
			saveUninitialized: true,
			cookie: {} // in release this should be { secure = true }
		}));

		// setup the routes we defined above
		api.forEach(({name, route}) => app.use(name, route));
		app.listen(3000, "127.0.0.1", () => { // start the server, the callback function is 
			console.log("listening on localhost:3000"); // just going to show us the server's running
		});
	}) // if something gets mangled, we'll arive here
	.catch((error: Error) => console.log(error));