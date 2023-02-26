// NPM
import { MongoClient, Collection, Db } from 'mongodb';
import fs from 'fs';

interface Collections {
	users?: Collection;
	splits?: Collection;
	macros?: Collection;
}

// collections table, declaring master list of collections in our database
export const collections: Collections = {}; // initialize it to empty before populating

// connects to the mongo instance, and attaches to the supplied database
export const connectToDatabase = async (dbName: string, host: string, port: number, username: string, password: string) => {
	const client: MongoClient = new MongoClient(`mongodb://${username}:${password}@${host}:${port}/${dbName}`);
	
	await client.connect(); // asynchronously connect to mongo
	const db: Db = client.db(dbName); // get a handle to the database

	// populate our collections table with handles to their mongo objects
	collections.users = db.collection("users");
	collections.splits = db.collection("splits");
	collections.macros = db.collection("macros");

	return db; // return a handle to the database in case we need it (we do)
};

// goes through and drops all the collections declared in the master list
export const deleteCollections = async (db: Db) => {
	for (let collection in collections)
		await db.dropCollection(collection);
};

// loads the schemas from the ./schema folder and initializes collections based off of them
export const createCollections = async (db: Db) => {

	for (let collection in collections) {
		const schema = fs.readFileSync(`./schema/${collection}.json`).toString();
		await db.createCollection(collection, { validator: JSON.parse(schema) })
	}

	// define unique indicies (this can probably be moved to schema folder somehow)
	db.createIndex("users", { username: 1, email: 1 }, { unique: true });
};
