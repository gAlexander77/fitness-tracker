export default class Split {
    constructor(
        public sets: number,
        public reps: number,
        public notes: Array<string>, // in case we have more than one note per split 
        public exerciseList: Array<string>,
        public targetAreas?: Array<string>
    ){}
}