import { ObjectId } from 'mongodb'; 

export default class Macro {
    constructor(
        public date: Date,
        public calories?: number,
        public protien?: number,
        public carbs?: number,
        public fats?: number,
        public id?: ObjectId
    ) {}
}