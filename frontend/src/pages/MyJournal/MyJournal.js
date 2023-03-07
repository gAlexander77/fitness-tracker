import React from 'react';
import Nav from '../../components/Nav';
import TodaysEntity from './components/TodaysEntry';
import ViewJournalEntries from './components/ViewJournalEntries';
import '../../styles/pages/MyJournal/MyJournal.css';

function Journal(){
    return(
        <div className="my-journal-page">
            <Nav/>
            <h1 id="page-header">MY JOURNAL</h1>
            <TodaysEntity/>
            <ViewJournalEntries/>
        </div>
    );
}

export default Journal;