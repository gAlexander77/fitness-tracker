// NPM imports
import session from 'express-session';
import express from 'express';
import { Db } from 'mongodb';
// local imports
import { connectToDatabase } from './db';
import users from './routes/users';
import auth from './routes/auth';

const ENV = process.env;
const HOST = ENV.API_HOST || "127.0.0.1";
const PORT = parseInt(ENV.API_PORT) || 3000;
const STATIC_DIR = ENV.API_STATIC_DIR || "./public";

export const DB = ENV.API_DB || "testing";
export const DB_HOST = ENV.API_DB_HOST || "127.0.0.1";
export const DB_PORT = parseInt(ENV.API_DB_PORT) || 27017;
export const DB_USERNAME = ENV.API_DB_USERNAME || "testing";
export const DB_PASSWORD = ENV.API_DB_PASSWORD || "testing";

// first thing's first, connect to the database
// source: db.ts
connectToDatabase(DB, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD) // specify database
	.then((db: Db) => {

		// MAIN: API SERVER
		const app = express(); // grab a handle to the main express object
		const api = express.Router(); // create the API route
		
		[ // we've defined this array of objects here to make the code more
			{ path: "/", router: auth }, // readable, and to make extending the API
			{ path: "/users", router: users }, // more manageable
		].forEach(({path, router}) => api.use(path, router));

		app.use(express.json());
		app.use(session({ // set up sessions for user authentication
			secret: "fitness",
			resave: false,
			saveUninitialized: true,
			cookie: {} // in release this should be { secure = true }
		}));
		
		[ // set up the app routes
			{ path: "/api", router: api },
			{ path: "/public", router: express.static(STATIC_DIR) },
		].forEach(({path, router}) => app.use(path, router))
		
		app.listen(PORT, HOST, () => { // start the server, the callback function is 
			console.log(" --------------------");
			console.log("| Shape Shift API v1 |");
			console.log(" --------------------");
			console.log(`- API: http://${HOST}:${PORT}/api`); // just going to show us the server's running
			console.log("- ENV:");
			console.log(`  - API_HOST: [${HOST}]`);
			console.log(`  - API_PORT: [${PORT}]`);
			console.log(`  - API_STATIC_DIR: [${STATIC_DIR}]`);
			console.log(`  + DB_ENV for ${db.namespace}:`);
			console.log(`    - DB: [${db.databaseName}]`);
			console.log(`    - DB_HOST: [${DB_HOST}]`);
			console.log(`    - DB_PORT: [${DB_PORT}]`);
			console.log(`    - DB_USERNAME: [${DB_USERNAME}]`);
			console.log(`    - DB_PASSWORD: [${DB_PASSWORD}]`);
		});
	}) // if something gets mangled, we'll arive here
	.catch((error: Error) => console.log(error));