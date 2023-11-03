import React from 'react';
import '../../../../styles/pages/MyJournalV2/components/journal-view-components/ViewMeasurements.css';

function ViewMeasurements({measurementsData, selectedCategory}) {
    
    //console.log(measurementsData)
    return (
        <div className="view-measurements-component">
            <h1 id="component-title">Recorded Measurements</h1>
            <DisplayMeasurements
                measurementsData={measurementsData}
            />
        </div>
    );
}

function DisplayMeasurements({measurementsData}) {
    return (
        <div className="view-measurements-component-display">
            {measurementsData.map((measurement, index) => (
                <Measurement key={index}
                    type={measurement.type}
                    measurement={measurement.measurement}
                    numOfMeasurements={measurementsData.length}
                    index={index}
                />
            ))}
        </div>
    );
}

function Measurement({type, measurement, numOfMeasurements, index}) {
    
    const className = (index+1 === numOfMeasurements) ?
        "individual-measurement bottom-and-top-border"
        :
        "individual-measurement";
    
    return(
        <div className={className}>
            <div className="individual-measurement-container">
                <p className="type-of-measurement">{type}</p>
                <p className="measurement">{measurement}</p>
            </div>
        </div>
    );
}

export default ViewMeasurements;