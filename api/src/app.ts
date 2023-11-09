import { httpConfig } from './config';

httpConfig()
	.then(({ app, db, address }) => {
		app.listen(address.port, address.host, async () => {
			console.log('ShapeShift APIv2');
			console.log(` serving on [${address.url()}]`);
			console.log(`  host: ${address.host}`);
			console.log(`  port: ${address.port}`);
			console.log(`  db: ${db.username}@${db.host}/${db.namespace}`);
		});
	});