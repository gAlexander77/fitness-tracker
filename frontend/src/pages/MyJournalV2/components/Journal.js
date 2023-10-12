import React from 'react';
import data from '../../../test-data/journalRequest.json'

export default function Journal() {
    const journalData = data.journalEntries
    console.log(journalData)
    
    const currentDate = new Date();
    const formattedDate = formatDateToMDYYYY(currentDate);
    console.log(formattedDate)

    return (
        <div className="view-journal-entries-dashboard">
            <SelectJournalEntry
                currentDate = {formattedDate}
            />
            Current Date: {formattedDate}
        </div>
    );
}

// Renders the list of journal entries
function SelectJournalEntry(props) {
    const currentDate = new Date();
    const formattedDate = formatDateToMDYYYY(currentDate);
    
    let date = props.currentDate
    
    return (
        <div className="select-journal-entry-container">
            <DayButton
                date={date}
            />
        </div>
    );
}

function DayButton(props) {
        console.log(props.date)
        return(
            <button>{props.date}</button>
        );
    }

function formatDateToMDYYYY(dateInput) {
    const date = new Date(dateInput);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    
    return `${month}-${day}-${year}`;
}