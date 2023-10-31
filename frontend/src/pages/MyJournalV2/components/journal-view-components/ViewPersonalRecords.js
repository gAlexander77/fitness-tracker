import React from 'react';
import '../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewPersonalRecords.css';

function ViewPersonalRecord({personalRecordsData, selectedCategory}){
    
    //console.log(personalRecordsData)
    //console.log(selectedCategory)

    return personalRecordsData ? (
        <div className="view-personal-records-component">
            <h1 id="component-title">Recorded Personal Records</h1>
            <DisplayPersonalRecords
                personalRecordsData={personalRecordsData}
            />
        </div>
    ) : null;
}

function DisplayPersonalRecords({personalRecordsData}){
    return (
        <div className="view-personal-records-component-display">
            {personalRecordsData.map((personalRecord, index) => (
                <PersonalRecord 
                    key={index}
                    workout={personalRecord.workout}
                    weight={personalRecord.weight}
                    weightUnit={personalRecord.weightUnit}
                    reps={personalRecord.reps}
                    numOfPersonalRecords={personalRecordsData.length}
                    index={index}
                />
            ))}
        </div>
    );
}

function PersonalRecord({workout, weight, weightUnit, reps, numOfPersonalRecords, index}){

    const className = (index+1 === numOfPersonalRecords) ? 
        "individual-personal-record bottom-and-top-border" 
        : 
        "individual-personal-record";

    return(
        <div className={className}>
            <div className="individual-measurement-containter">
                <p>{workout} at {weight} {weightUnit} for {reps} reps</p>
            </div>
        </div>
    );
}

export default ViewPersonalRecord;