import { ObjectId } from 'mongodb';

export class Workout {
    constructor(
        public workoutName: string,
        public description: string, 
        public diagram: string,
        public muscle: string,
        public equipment: string,
        public images: Array<string> = [],
        public videos: Array<string> = [],
        public _id?: ObjectId
    ) {}
};

export class WorkoutGroup {
    constructor(
        public groupName: string,
        public workouts: Array<Workout> = [],
    ) {}
};