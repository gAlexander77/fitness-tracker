import { ObjectId } from 'mongodb';

export default class Split {
    constructor(
        public sets: number,
        public reps: number,
        public notes: Array<string>, // in case we have more than one note per split 
        public exercise_List: Array<string>,
        public target_Areas?: Array<string>

    ){}
}