import React from 'react';
import Nav from '../../components/Nav';
import TodaysEntity from './components/TodaysEntry';
import ViewJournalEntries from './components/ViewJournalEntries';
import '../../styles/pages/MyJournal/MyJournal.css';

import journalRequestData from './testData/testData';

function Journal(){
    return(
        <div className="my-journal-page">
            <Nav/>
            <h1 id="page-header">MY JOURNAL</h1>
            <TodaysEntity data={journalRequestData}/>
            <ViewJournalEntries data={journalRequestData}/>
        </div>
    );
}

export default Journal;