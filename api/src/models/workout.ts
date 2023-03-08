import { ObjectId } from 'mongodb';

export class Workout {
    constructor(
        public workoutName: string,
        public muscle: Array<string>,
        public diagram: string,
        public description: string, 
        public tutorialVideo: string,
        public _id?: ObjectId
    ) {}
}

export class WorkoutGroup {
    constructor(
        public groupName: string,
        public workouts: Array<Workout> = []
    ) {}
}