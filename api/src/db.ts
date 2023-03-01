// NPM
import { MongoClient, Collection, Db } from 'mongodb';
import fs from 'fs';

const HOST = process.env.API_DB_HOST || "127.0.0.1";
const PORT = parseInt(process.env.API_DB_PORT) || 27017;
const USERNAME = process.env.API_DB_USERNAME || "testing";
const PASSWORD = process.env.API_DB_PASSWORD || "testing";
const NAMESPACE = process.env.API_DB_NAMESPACE || "testing";
const URL = `mongodb://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${NAMESPACE}`;

// collections table, declaring master list of collections in our database
export const collections: {
	users?: Collection;
	journals?: Collection;
	workouts?: Collection;
} = {}; // initialize it to empty before populating

// connects to the mongo instance, and attaches to the supplied database
export const connectToDatabase = async () => {
	const client: MongoClient = new MongoClient(URL);
	await client.connect(); // asynchronously connect to mongo
	const db: Db = client.db(NAMESPACE); // get a handle to the database

	// populate our collections table with handles to their mongo objects
	collections.users = db.collection("users");
	collections.journals = db.collection("journals");
	collections.workouts = db.collection("workouts");

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
