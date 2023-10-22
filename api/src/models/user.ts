import { ObjectId } from 'mongodb';

import { Workout, WorkoutGroup } from './workout';
import { Journal } from './journal';

export default class User {
	constructor(
		public username: string,
		public password: string,
		public salt: string,
		public workoutGroups: Array<WorkoutGroup> = [],
		public workoutSplit: Array<string> = new Array(7).fill("rest"),
		public customWorkouts: Array<Workout> = [],
		public journalEntries: Array<Journal> = [],
		public _id?: ObjectId
	) {}
}
