/*  
    This function takes in the 2d matrix Macros and returns an array of the macro type required for the length of days in Macros 2d array
    Macros[] represents the number of days of data that we have, in our test data we have 3 entries and so the Macros.length = 3 and 
    we can access each days information by choosing the day (i.e. Macros[0] would be the first Jounrnal Entry)

    Macros[][] represents the macro data. if we look at the first journal entry for reference Macros[0], Macros[0][0] represents calories,
    Macros[0][1] represents the Protein, and Macros[0][2] represents the carbs for the first day.

    Unfortunately, the data will not always be filled out. However, this function takes care of that and populates an empty date with 0 for the 
    macro passed in as a parameter. 
*/

function MacroDA(Macros, macroToTrack) {
    var macrosArray = [];

    if (Array.isArray(Macros) && Macros.length > 0) {
        for (let k = 0; k < Macros.length; k++) {
            const macroEntry = Macros[k].find(macro => macro.type === macroToTrack);
            if (macroEntry) {
                macrosArray.push(macroEntry.amount);
            } else {
                macrosArray.push(0);
            }
        }
    } else {
        for (let k = 0; k < Macros.length; k++) {
            macrosArray.push(0);
        }
    }
    return macrosArray;
}

export default MacroDA;