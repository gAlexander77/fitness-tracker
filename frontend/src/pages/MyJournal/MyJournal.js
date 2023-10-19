import React from 'react';
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import TodaysEntity from './components/TodaysEntry';
import ViewJournalEntries from './components/ViewJournalEntries';
import '../../styles/pages/MyJournal/MyJournal.css';

import journalRequestData from '../../test-data/journalRequest.json';

function Journal(){
    return(
        <>
            <Nav/>
            <div className="my-journal-page">
                <div className="my-journal-content">
                    <h1 id="page-header">MY JOURNAL</h1>
                    <TodaysEntity data={journalRequestData}/>
                    <ViewJournalEntries data={journalRequestData}/>
                </div>
                <Background/>
            </div>
            <Footer/>
        </>
        
    );
}

export default Journal;