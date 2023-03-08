// NPM imports
import { Db } from 'mongodb';
// local imports
import { connectToDatabase } from './db';
import { initApp, initDb, Route } from './setup';
import { log } from './utils';

import splits from './routes/splits';
import users from './routes/users';
import index from './routes/index';

const apiHost = process.env.API_HOST || "127.0.0.1";
const apiPort = parseInt(process.env.API_PORT) || 3001;
const arg = process.argv[process.argv.length - 1];

// API routes main list
const apiRoutes = [
	{ path: "/", 	   router: index },
	{ path: "/users",  router: users },
	{ path: "/splits", router: splits }
];

export const serve = (db: Db, routes: Array<Route>, host: string, port: number) => {
	const app = initApp(routes);
	app.listen(port, host, () => {
		console.log("Shape Shift API v1");
		console.log(`- URL: http://${host}:${port}/api`);
		console.log(`  - API_HOST: [\x1b[33m${host}\x1b[0m]`);
		console.log(`  - API_PORT: [\x1b[33m${port}\x1b[0m]`);
		console.log(`  - API_DB: [\x1b[33m${db.namespace}\x1b[0m]`);
		console.log("> \x1b[32mlistening\x1b[0m...");
		return app;
	});
}

if (require.main == module) {
	connectToDatabase()
		.then((db: Db) => {
			arg == __filename // if we have no extra args coming from NPM...
				? serve(db, apiRoutes, apiHost, apiPort) // serve the API
				: initDb(db, arg); // otherwise, initialize the database
		})
		.catch(log.error);
}
