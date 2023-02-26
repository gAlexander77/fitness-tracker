// NPM imports
import session from 'express-session';
import express from 'express';
import cors from 'cors';
import { Db } from 'mongodb';
// local imports
import { connectToDatabase } from './db';
import users from './routes/users';
import auth from './routes/auth';

const ENV = process.env;
const HOST = ENV.API_HOST || "localhost";
const PORT = parseInt(ENV.API_PORT) || 3001;
const STATIC_DIR = ENV.API_STATIC_DIR || "./public";

export const DB = ENV.API_DB || "testing";
export const DB_HOST = ENV.API_DB_HOST || "localhost";
export const DB_PORT = parseInt(ENV.API_DB_PORT) || 27017;
export const DB_USERNAME = ENV.API_DB_USERNAME || "testing";
export const DB_PASSWORD = ENV.API_DB_PASSWORD || "testing";

connectToDatabase(DB, DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD) // specify database
	.then((db: Db) => {

		// MAIN: API SERVER
		const app = express(); // grab a handle to the main express object
		const api = express.Router(); // create the API route
		
		// apply routes to api
		[{ path: "/", router: auth },
		 { path: "/users", router: users }
		].forEach(({path, router}) => api.use(path, router));
		
		app.use(express.json());
		app.use(cors({
			origin: "http://localhost:3000",
			credentials: true
		}));
		app.use(session({ // set up sessions for user authentication
			secret: "fitness",
			resave: false,
			saveUninitialized: true,
			cookie: {} // in release this should be { secure = true }
		}));
		
		// apply routes to app
		[{ path: "/api", router: api },
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
			console.log(`  + DB ENV for ${db.namespace}:`);
			console.log(`    - API_DB: [${db.databaseName}]`);
			console.log(`    - API_DB_HOST: [${DB_HOST}]`);
			console.log(`    - API_DB_PORT: [${DB_PORT}]`);
			console.log(`    - API_DB_USERNAME: [${DB_USERNAME}]`);
			console.log(`    - API_DB_PASSWORD: [${DB_PASSWORD}]`);
		});
	}) // if something gets mangled, we'll arive here
	.catch((error: Error) => console.log(error));
