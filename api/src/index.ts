// NPM imports
import { Db } from 'mongodb';
// local imports
import { connectToDatabase } from './db';
import { initApp, initDb } from './setup';
import { log } from './utils';

import users from './routes/users';
import auth from './routes/auth';

const HOST = process.env.API_HOST || "127.0.0.1";
const PORT = parseInt(process.env.API_PORT) || 3001;
const ARG1 = process.argv[process.argv.length - 1];

export const serve = (db: Db, host: string, port: number) => {
	initApp([
		{ path: "/", router: auth },
		{ path: "/users", router: users }
	])
	.listen(port, host, () => {
		console.log("Shape Shift API v1");
		console.log(`- URL: http://${host}:${port}/api`);
		console.log(`  - API_HOST: [${host}]`);
		console.log(`  - API_PORT: [${port}]`);
		console.log(`  - API_DB: [${db.namespace}]`);
	});
}

if (require.main == module) {
	connectToDatabase()
		.then((db: Db) => {
			ARG1 == __filename // if we have no extra args coming from NPM...
				? serve(db, HOST, PORT) // serve the API
				: initDb(db, ARG1); // otherwise, initialize the database
		})
		.catch(log.error);
}
