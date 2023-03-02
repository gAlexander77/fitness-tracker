import { ObjectId } from 'mongodb';

export default class Workout {
    constructor(
        public name: string,
        // TODO:
        // - add meta info
        public id?: ObjectId
    ) {}
}