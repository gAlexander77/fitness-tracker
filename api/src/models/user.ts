// NPM
import { ObjectId } from 'mongodb';
import Macro from './macro';

class workoutGroups {
	constructor(
		
	) {}
}

// defines the fields for a User in the database
export default class User {
	constructor(
		public username: string,
		public password: string,
		public salt: string,
		public workoutGroups: Array<object>,
		public id?: ObjectId
	) {}
}