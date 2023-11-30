import { httpServer, createDb, deleteDb, refreshDb } from './config';

httpServer()
	.then(({ app, address, db, cursor }) => {

		const option = process.argv.pop();
		const options: { [index:string]: Array<any> } = { 
			create: [ createDb, 'initializing', 'initialized' ],
			delete: [ deleteDb, 'dropping', 'dropped' ],
			refresh: [ refreshDb, 'refreshing', 'reloaded' ]
		};
		
		if (option in options) {
			const [dbCallback, starting, complete] = options[option];
			console.log(`> ${starting} ${db.namespace} database`);
			dbCallback(cursor)
				.then(() => console.log(`> ${complete} ${db.namespace}`))
				.catch((error: Error) => console.log(error))
				.finally(() => process.exit(0));
		} else {
			app.listen(address.port, address.host, async () => {
				console.log('ShapeShift APIv2');
				console.log(` serving on [${address.url()}]`);
				console.log(`  host: ${address.host}`);
				console.log(`  port: ${address.port}`);
				console.log(`  db: ${db.username}@${db.host}/${db.namespace}`);
			});
		}
	});