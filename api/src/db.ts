// NPM
import { MongoClient, Collection, Db } from 'mongodb';
import fs from 'fs';

const dbHost = process.env.API_DB_HOST || "127.0.0.1";
const dbPort = parseInt(process.env.API_DB_PORT) || 27017;
const dbUser = process.env.API_DB_USERNAME || "testing";
const dbPass = process.env.API_DB_PASSWORD || "testing";
const dbNamespace = process.env.API_DB_NAMESPACE || "testing";
const dbUrl = `mongodb://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${dbNamespace}`;

// collections table, declaring master list of collections in our database
export const collections: {
	users?: Collection;
	workouts?: Collection;
} = {}; // initialize it to empty before populating

// connects to the mongo instance, and attaches to the supplied database
export const connectToDatabase = async () => {
	const client: MongoClient = new MongoClient(dbUrl);
	await client.connect(); // asynchronously connect to mongo
	const db: Db = client.db(dbNamespace); // get a handle to the database

	// populate our collections table with handles to their mongo objects
	collections.users = db.collection("users");
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
		await db.createCollection(collection, { validator: JSON.parse(schema) });
	}

	// define unique indicies (this can probably be moved to schema folder somehow)
	await db.createIndex("users", { username: 1 }, { unique: true });
};

export const addTestWorkouts = async (db: Db) => {
	await collections.workouts.insertMany([
		{
			workoutName: "Push Ups",
			muscle: ["1"],
			diagram: "/public/workouts/pushups/image.png",
			description: "hello world", 
			tutorialVideo: "/public/workouts/pushups/video.mp4",
		},
		{
			workoutName: "Pull Ups",
			muscle: ["1", "2", "3"],
			diagram: "/public/workouts/pushups/image.png",
			description: "goodbye world", 
			tutorialVideo: "/public/workouts/pushups/video.mp4",
		}
	])
}