import React from 'react';
import '../../../styles/pages/MyJournal/MyJournal.css';

function TodaysEntity(){
    return(
        <div className="my-journal-todays-entry-component">
            <h1>TODAY'S ENTRY</h1>
            <div className="my-journal-todays-entry-container">
                <div className="my-journal-todays-entry-container-inner">
                    <div>Menu Options</div>
                    <div>Selected Option</div>
                </div>
            </div>
        </div>
    );
}

export default TodaysEntity;