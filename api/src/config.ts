import { MongoClient, Collection, Db } from 'mongodb';
import express, { Router, json } from 'express';
import session from 'express-session';
import dotenv from 'dotenv';
import cors from 'cors';
import fs from 'fs';

import { requestLog } from './middleware';

import settings from './routes/settings';
import workouts from './routes/workouts';
import journal from './routes/journal';
import split from './routes/split';
import users from './routes/users';
import index from './routes/index';

export const collections: { users?: Collection, workouts?: Collection } = {}; // db tables (collections)

const routes = [ // structured list of api endpoints
	{ path: '/',         route: index    },
	{ path: '/users',    route: users    },
	{ path: '/split',    route: split    },
	{ path: '/journal',  route: journal  },
	{ path: '/workouts', route: workouts },
	{ path: '/settings', route: settings }
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
	url() { return `http://${this.host}:${this.port}/api`; }
};

const middleware = [ // global middleware array
	requestLog, // globally enable request logging
	cors({ origin: "http://localhost:3000", credentials: true }),
	json(),
	session({
		cookie: { httpOnly: false, path: null },
		secret: '0123456789abcdef',
		saveUninitialized: true, 
		resave: false
	})
];

export const deleteDb = async (cursor: Db) => {
	for (let collection in collections)
		await cursor.dropCollection(collection);
};

export const createDb = async (cursor: Db) => {

	for (let collection in collections) {
		const schema = fs.readFileSync(`./schema/${collection}.json`).toString();
		await cursor.createCollection(collection, { validator: JSON.parse(schema) });
	}

	await cursor.createIndex("users", { username: 1 }, { unique: true });

	if (fs.existsSync("./workouts.json")) {
		const workouts = fs.readFileSync("./workouts.json").toString();
		await collections.workouts.insertMany(JSON.parse(workouts));
	}
};

export const refreshDb = async (cursor: Db) => {
	await deleteDb(cursor);
	await createDb(cursor);
};

export const httpServer = async () => {
	const [ app, api ] = [ express(), Router() ];

	const mongoClient = new MongoClient(`mongodb+srv://${db.username}:${db.password}@${db.host}/${db.namespace}`);
	await mongoClient.connect();

	const cursor = mongoClient.db(db.namespace);

	collections.users = cursor.collection('users');
	collections.workouts = cursor.collection('workouts');
	
	middleware.forEach(ext => app.use(ext));
	routes.forEach(({ path, route }) => api.use(path, route));
	app.use('/api', api);

	return { app, db, address, cursor };
};