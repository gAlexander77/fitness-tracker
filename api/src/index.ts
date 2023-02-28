// NPM imports
import { Db } from 'mongodb';
// local imports
import { DB_COLLECTION, connectToDatabase } from './db';
import { initApp, initDb } from './setup';
import { log } from './utils';
import users from './routes/users';
import auth from './routes/auth';

const HOST = process.env.DB_HOST || "localhost";
const PORT = parseInt(process.env.DB_PORT) || 3001;
const ARG1 = process.argv[process.argv.length - 1];

export const serve = (host: string, port: number) => {
	initApp([
		{ path: "/", router: auth },
		{ path: "/users", router: users }
	])
	.listen(port, host, () => {
		console.log("Shape Shift API v1");
		console.log(`- URL: http://${host}:${port}/api`);
		console.log(`  - API_HOST: [${host}]`);
		console.log(`  - API_PORT: [${port}]`);
		console.log(`  - API_DB: [${DB_COLLECTION}]`);
	});
}

if (require.main == module) {
	connectToDatabase(DB_COLLECTION)
		.then((db: Db) => {
			ARG1 == __filename 
				? serve(HOST, PORT)
				: initDb(db, ARG1);
		}) // if something gets mangled, we'll arive here
		.catch(log.error);
}
