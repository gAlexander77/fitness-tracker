import { ObjectId } from 'mongodb'; 

export default class Macro {
    constructor(
        public date: Date,
        public id?: ObjectId
    ) {}
}