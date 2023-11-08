import React, { useState } from "react";
import "../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewPersonalRecords.css";
import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/PersonalRecordsEditor.css";

function PersonalRecordEditor({
    personalRecordsData,
    selectedCategory,
    reloadJournal,
}) {
    const [editor, setEditor] = useState(false);

    const toggleEditor = () => {
        setEditor(!editor);
    };

    console.log(personalRecordsData);

    return (
        <div className="view-personal-records-component">
            <h1 id="component-title">Recorded Personal Records</h1>
            <DisplayPersonalRecords personalRecordsData={personalRecordsData} />
            {editor ? (
                <AddPersonalRecordEditor
                    toggleEditor={toggleEditor}
                    reloadJournal={reloadJournal}
                />
            ) : null}
            {editor ? null : (
                <button onClick={toggleEditor}>Add a Personal Record</button>
            )}
        </div>
    );
}

function DisplayPersonalRecords({ personalRecordsData }) {
    return personalRecordsData ? (
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
    ) : null;
}

function PersonalRecord({ workout, weight, weightUnit, reps }) {
    return (
        <div className="individual-personal-record">
            <div className="individual-measurement-containter">
                <p>
                    {workout} at {weight} {weightUnit} for {reps} reps
                </p>
            </div>
        </div>
    );
}

export default PersonalRecordEditor;

function AddPersonalRecordEditor({ toggleEditor, reloadJournal }) {
    const defaultPersonalRecord = {
        workout: "",
        weight: "",
        weightUnit: "",
        reps: "",
    };

    const [personalRecordData, setPersonalRecordData] = useState(
        defaultPersonalRecord
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPersonalRecordData({ ...personalRecordData, [name]: value });
    };

    const saveMeasurement = () => {
        // Assuming you implement the POST request logic here

        // After successful request
        reloadJournal();
        toggleEditor();
        console.log(personalRecordData);
    };

    return (
        <div className="add-personal-records-editor-component">
            <h1>Enter Personal Record</h1>
            <div className="input-container">
                <p>Workout</p>
                <input
                    name="workout"
                    placeholder="ex Bench Press"
                    value={personalRecordData.workout}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <p>Weight</p>
                <input
                    name="weight"
                    placeholder="ex 225"
                    value={personalRecordData.weight}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <p>Unit</p>
                <input
                    name="weightUnit"
                    placeholder="ex lbs"
                    value={personalRecordData.weightUnit}
                    onChange={handleChange}
                />
            </div>
            <div className="input-container">
                <p>Repetitions</p>
                <input
                    name="reps"
                    placeholder="ex 5"
                    value={personalRecordData.reps}
                    onChange={handleChange}
                />
            </div>
            <div className="button-container">
                <button
                    className="save-personal-record-btn"
                    onClick={saveMeasurement}
                >
                    Save Record
                </button>
            </div>
        </div>
    );
}
