// NPM imports
import session from 'express-session';
import express from 'express';
import { Db } from 'mongodb';
// local imports
import { connectToDatabase } from './db';
import users from './routes/users';
import auth from './routes/auth';

const HOST = process.env.SS_API_HOST || "127.0.0.1";
const PORT = parseInt(process.env.SS_API_PORT) || 3000;

// first thing's first, connect to the database
// source: db.ts
connectToDatabase(process.env.SS_API_DB || "testing") // specify database
	.then((db: Db) => {

		// MAIN: API SERVER
		const app = express(); // grab a handle to the main express object
		const api = [ // we've defined this array of objects here to make the code more
			{ path: "/auth", router: auth }, // readable, and to make extending the API
			{ path: "/users", router: users }, // more manageable
			{ path: "/public", router: express.static("./public") }
		];
		
		app.use(express.json()); // this is a JSON API
		app.use(session({ // set up sessions for user authentication
			secret: "fitness",
			resave: false,
			saveUninitialized: true,
			cookie: {} // in release this should be { secure = true }
		}));

		// setup the routes we defined above
		api.forEach(({path, router}) => app.use(path, router));
		app.listen(PORT, HOST, () => { // start the server, the callback function is 
			console.log("--------------------");
			console.log(" Shape Shift API v1 ");
			console.log("--------------------");
			console.log(`- URL: http://${HOST}:${PORT}`); // just going to show us the server's running
			console.log("- ENV:");
			console.log(`  - SS_API_HOST: ${HOST}`);
			console.log(`  - SS_API_PORT: ${PORT}`);
			console.log(`  - SS_API_DB: ${db.databaseName}`);
		});
	}) // if something gets mangled, we'll arive here
	.catch((error: Error) => console.log(error));