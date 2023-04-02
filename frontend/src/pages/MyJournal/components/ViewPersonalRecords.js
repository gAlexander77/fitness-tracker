import React, { useState, useEffect } from 'react';
import '../../../styles/pages/MyJournal/components/ViewPersonalRecords.css';

function ViewPersonalRecords(props) {
    
    const [personalRecordsArray, setPersonalRecordsArray] = useState([]);

    useEffect(() => {
        for (let entry of props.journalData) {
          if (entry.journalEntry === props.selectedEntry) {
            setPersonalRecordsArray(entry.personalRecords);
            break;
          }
        }
    }, [props.selectedEntry]);


    console.log(props.journalData)
    console.log(props.selectedEntry)
    console.log(personalRecordsArray);

    return(
        <div>
            {personalRecordsArray.map((record, index)=>{
                return(
                    <IndividualPersonalRecord
                        key={index}
                        record={record}
                    />
                );
            })}
        </div>
    );
}

function IndividualPersonalRecord(props) {
    return(
        <div>
            <h1>{props.record.workout} {props.record.weight} {props.record.weightUnit} for {props.record.reps} reps</h1>
        </div>
    );
}

export default ViewPersonalRecords;