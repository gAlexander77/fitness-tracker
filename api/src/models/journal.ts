export class Macro {
    constructor(
        public type: string, 
        public amount: string,
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
        public macros: Array<Macro> = [],
        public notes: Array<string> = [],
        public split: Array<string> = new Array(7).fill('rest'),
        public date: string = new Date().toDateString()
    ) {}
};