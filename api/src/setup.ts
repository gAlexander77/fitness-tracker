import session from 'express-session';
import express from 'express';
import cors from 'cors';
import { Db } from 'mongodb'

import { createCollections, deleteCollections, addTestWorkouts } from './db';
import { log, httpLog } from './utils';

// map of possible arguments, and their intended functions
const args: Map<string, (db: Db) => Promise<void>> = new Map([
    ["initdb", createCollections], // initializes all the collections we need and their schemas
    ["nukedb", deleteCollections], // removes all collections we need from the database
	["addTestWorkouts", addTestWorkouts]
]);

export interface Route {
	path: string;
	router: express.Router;
}

export const initApp = (routes: Array<Route>) => {
	
	const app = express();
	const api = express.Router();

	routes.forEach(({path, router}) => api.use(path, router));

	app.use(cors({
		origin: "http://localhost:3000", // change this to frontend url
		credentials: true
	}));
	app.use(session({ // set up sessions for user authentication
		secret: "fitness",
		resave: false,
		saveUninitialized: true,
		cookie: {} // in release this should be { secure = true }
	}));
	
	app.use(express.json()); // JSON API
	app.use(httpLog);
	app.use("/api", api);

	return app;
};

export const initDb = (db: Db, arg: string) => {
    
    if (!args.has(arg)) {
        log.error(new Error("argument must be one of these"));
        args.forEach((_, option) => console.log(`  - ${option}`));
        process.exit(0);
    }  
    
    args.get(arg)(db)
        .then(() => log.ok("success"))
        .catch(log.error)
        .finally(() => process.exit(0));
};