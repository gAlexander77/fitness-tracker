import { ObjectId } from 'mongodb';

export default class Workout {
    constructor(
        public workoutName: string,
        public muscle: Array<string>,
        public diagram: string,
        public description: string, 
        public tutorialVideo: string
    ) {}
}