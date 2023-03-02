import { ObjectId } from 'mongodb'; 

export default class Macro {
    constructor(
        public date: number,
        public id?: ObjectId
    ) {}
}