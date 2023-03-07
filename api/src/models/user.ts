// NPM
import { ObjectId } from 'mongodb';
import Macro from './macro';

// defines the fields for a User in the database
export default class User {
	constructor(
		public username: string,
		public password: string,
		public salt: string,
		public id?: ObjectId
	) {}
}