// NPM
import { ObjectId } from 'mongodb';

// local
import { WorkoutGroup } from './workout';

// defines the fields for a User in the database
export default class User {
	constructor(
		public username: string,
		public password: string,
		public salt: string,
		public workoutGroups: Array<WorkoutGroup> = [],
		public workoutSplit: Array<string> = new Array(7),
		public _id?: ObjectId
	) {}
}