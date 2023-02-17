// NPM
import { ObjectId } from 'mongodb';

// defines the fields for a User in the database
export class User {
	constructor(
		public email: string,
		public firstName: string,
		public lastName: string,
		public birthday: number,
		public password: string,
		public salt: string,
		public id?: ObjectId
	) {}
}