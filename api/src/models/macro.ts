import { ObjectId } from "mongodb";

export default class Macros{
    constructor(
        public protein: number,
        public calories: number, 
        public carbs: number,
        public fats: number
    ){}
}