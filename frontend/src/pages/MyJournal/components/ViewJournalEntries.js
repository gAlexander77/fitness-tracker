import React from 'react';
import '../../../styles/pages/MyJournal/MyJournal.css';

function ViewJournalEntries(){
    return(
        <div className="my-journal-view-journal-entries-component">
            <h1>VIEW JOURNAL ENTRIES</h1>
            <div className="my-journal-view-journal-entries-container">
                <div>Entries</div>
                <div>Selected Entry</div>
            </div>
        </div>
    );
}

export default ViewJournalEntries;