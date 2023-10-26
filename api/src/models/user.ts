import { ObjectId } from 'mongodb';

import { WorkoutGroup } from './workout';
import { JournalEntry } from './journal';

export default class User {
	constructor(
		public username: string,
		public password: string,
		public salt: string,
		public journalEntries: Array<JournalEntry> = [],
		public workoutGroups: Array<WorkoutGroup> = [],
		public workoutSplit: Array<string> = new Array(7).fill('rest'),
		public _id?: ObjectId
	) {}
};