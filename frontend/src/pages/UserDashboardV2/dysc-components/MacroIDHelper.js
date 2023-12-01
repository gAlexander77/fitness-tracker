/*
    This function checks for all valid data available. which will be used for data display. If there is no data
    or the data is out of order, this will deal with populating that
    returns the macros for the latest day
*/
function MacroIDHelper(JournalEntries) {
    // var JournalEntries = data.journalEntries;
    var macros = [];
    const macrosToTrack = ['calories', 'protein', 'carbs'];

    if (Array.isArray(JournalEntries) && JournalEntries.length > 0) {
        const lastEntry = JournalEntries[0];
        
        for (let i = 0; i < macrosToTrack.length; i++) {
            const macroType = macrosToTrack[i];
            const matchingMacro = lastEntry.macros.find(macro => macro.type === macroType);

            if (matchingMacro) {
                macros.push(matchingMacro.amount);
            } else {
                macros.push(0); // Default value when the macro is not found
            }
        }
    } else {
        // Handles the case where JournalEntries is not properly structured or empty
        // Set default values for all macros
        for (let i = 0; i < macrosToTrack.length; i++)
            macros.push(0);
    }
    console.log(macros);
    return macros;
}
export default MacroIDHelper;