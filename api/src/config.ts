import { MongoClient, Collection } from 'mongodb';
import express, { Router, json } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';

import { authorized, requestLog } from './middleware';

import workouts from './routes/workouts';
import journal from './routes/journal';
import split from './routes/split';
import users from './routes/users';
import index from './routes/index';

export const collections: { users?: Collection, workouts?: Collection } = {}; // db tables (collections)

const routes = [ // structured list of api endpoints and middleware
	{ path: '/',         route: index    },
	{ path: '/users',    route: users    },
	{ path: '/split',    route: split    },
	{ path: '/journal',  route: journal  },
	{ path: '/workouts', route: workouts }
];

dotenv.config(); // pulls in the .env file

const db = {
	host: process.env.API_DB_HOST || '127.0.0.1',
	username: process.env.API_DB_USERNAME || '',
	password: process.env.API_DB_PASSWORD || '',
	namespace: process.env.API_DB_NAMESPACE || ''
};

const address = {
	host: process.env.API_HOST || '127.0.0.1',
	port: parseInt(process.env.API_PORT) || 3001,
	url() {
		return `http://${this.host}:${this.port}/api`; 
	}
};

const middleware = [ // global middleware array
	requestLog, // globally enable request logging
	cors({ origin: 'http://localhost:3000', credentials: true }),
	json(),
	session({
		cookie: { httpOnly: false, path: null },
		secret: '0123456789abcdef',
		saveUninitialized: true,
		resave: false
	})
];

const connect = async () => {
	const client: MongoClient = new MongoClient(`mongodb+srv://${db.username}:${db.password}@${db.host}/${db.namespace}`);
	await client.connect();
	
	const cursor = client.db(db.namespace);

	collections.users = cursor.collection('users');
	collections.workouts = cursor.collection('workouts');
};

export const httpConfig = async () => {
	const [app, api] = [ express(), Router() ];
	await connect(); // initialize the collections object

	routes.forEach(({ path, route }) => api.use(path, route));
	middleware.forEach(ext => app.use(ext));
	app.use('/api', api);

	return { app, db, address };
};

// export const deleteCollections = async (db: Db) => {
// 	for (let collection in collectionNames)
// 		await db.dropCollection(collection);
// };

// export const createCollections = async (db: Db) => {

// 	for (let collection in collectionNames) {
// 		const schema = fs.readFileSync(`./schema/${collection}.json`).toString();
// 		await db.createCollection(collection, { validator: JSON.parse(schema) });
// 	}

// 	await db.createIndex("users", { username: 1 }, { unique: true });

// 	if (fs.existsSync("./workouts.json")) {
// 		const workouts = fs.readFileSync("./workouts.json").toString();
// 		await collections.workouts.insertMany(JSON.parse(workouts));
// 	}
// };