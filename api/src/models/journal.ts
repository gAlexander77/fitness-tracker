export class Note {
    constructor(
        public title: string,
        public note: string
    ) {}
};

export class Macro {
    constructor(
        public type: string, 
        public amount: string,
        public unit: string,
    ) {}
};

export class Measurements {
    constructor(
        public type: string,
        public measurement: string
    ) {}
};

export class PersonalRecord {
    constructor(
        public workout: string, 
        public weight: string, 
        public weightUnit: string, 
        public reps: string
    ) {}
};

export class CalculatorResult {
    constructor(
        public calculator: string, 
        public result: string
    ) {}
};

export class JournalEntry {
    constructor(
        public measurements: Array<Measurements> = [],
        public personalRecords: Array<PersonalRecord> = [],
        public calculatorResult: Array<CalculatorResult> = [],
        public macros: Array<Macro> = [ new Macro("calories", "0", "KCal") ],
        public notes: Array<Note> = [],
        public split: string = 'rest',
        public date: string = new Date().toLocaleDateString('en-us').replaceAll('/', '-')
    ) {}
};