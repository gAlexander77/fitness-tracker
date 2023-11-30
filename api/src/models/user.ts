import { ObjectId } from 'mongodb';

import { WorkoutGroup } from './workout';
import { JournalEntry } from './journal';

class Settings {
	constructor(
		public timezone: string
	) {}
}

export default class User {
	constructor(
		public username: string,
		public password: string,
		public salt: string,
		public settings: Settings = new Settings('cst'),
		public journalEntries: Array<JournalEntry> = [],
		public workoutGroups: Array<WorkoutGroup> = [ { groupName: "Rest", workouts: [] } ],
		public workoutSplit: Array<string> = new Array(7).fill('Rest'),
		public _id?: ObjectId
	) {}
};