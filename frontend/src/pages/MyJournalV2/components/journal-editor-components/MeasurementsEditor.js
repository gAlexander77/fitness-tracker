import React, { useState } from "react";
import "../../../../styles/pages/MyJournalV2/components/journal-editor-components/MeasurementsEditor.css";

function MeasurementsEditor({ measurementsData, reloadJournal }) {
    return (
        <div className="measurements-editor-component">
            <h1 id="component-title">Recorded Measurements</h1>
            <DisplayMeasurements
                measurementsData={measurementsData}
                reloadJournal={reloadJournal}
            />
        </div>
    );
}

function DisplayMeasurements({ measurementsData, reloadJournal }) {
    const [editor, setEditor] = useState(false);

    const toggleEditor = () => {
        setEditor(!editor);
    };

    return measurementsData === null || measurementsData.length === 0 ? (
        <div className="measurements-editor-component-display">
            {editor ? null : (
                <h1 className="no-measurements-have-been-recorded">
                    No measurements have been recorded
                </h1>
            )}
            {editor ? (
                <AddMeasurement
                    toggleEditor={toggleEditor}
                    reloadJournal={reloadJournal}
                />
            ) : (
                <button onClick={toggleEditor}>Add Measurement</button>
            )}
        </div>
    ) : (
        <div className="measurements-editor-component-display">
            {measurementsData.map((measurement, index) => (
                <Measurement
                    key={index}
                    type={measurement?.type}
                    measurement={measurement?.measurement}
                    numOfMeasurements={measurementsData.length}
                    index={index}
                />
            ))}
            {editor ? (
                <AddMeasurement
                    toggleEditor={toggleEditor}
                    reloadJournal={reloadJournal}
                />
            ) : (
                <button onClick={toggleEditor}>Add Measurement</button>
            )}
        </div>
    );
}

function Measurement({ type, measurement, numOfMeasurements, index }) {
    return (
        <div className="individual-measurement">
            <div className="individual-measurement-container">
                <p className="type-of-measurement">{type}</p>
                <p className="measurement">{measurement}</p>
            </div>
        </div>
    );
}

function AddMeasurement({ toggleEditor, reloadJournal }) {
    const defaultMeasurement = {
        type: "",
        measurement: "",
    };

    const [measurementData, setMeasurementData] = useState(defaultMeasurement);

    const changeType = (e) => {
        setMeasurementData({ ...measurementData, type: e.target.value });
    };

    const changeMeasurement = (e) => {
        setMeasurementData({ ...measurementData, measurement: e.target.value });
    };

    const saveMeasurement = () => {
        // POST REQUEST

        // After successful request
        reloadJournal();
        toggleEditor();
    };

    return (
        <div className="add-measurment-in-measurments-editor">
            <div className="input-container">
                <p>Type</p>
                <input
                    placeholder="Body Weight"
                    value={measurementData.type}
                    onChange={changeType}
                />
            </div>
            <div className="input-container">
                <p>Measurement</p>
                <input
                    placeholder="150 lbs"
                    value={measurementData.measurement}
                    onChange={changeMeasurement}
                />
            </div>
            <button onClick={saveMeasurement}>Save Measurement</button>
        </div>
    );
}

export default MeasurementsEditor;
