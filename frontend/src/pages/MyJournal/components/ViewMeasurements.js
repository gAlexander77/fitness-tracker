import React, { useState, useEffect } from 'react';
import '../../../styles/pages/MyJournal/components/ViewMeasurements.css';

function ViewMeasurements(props) {
    
    const [measurementsArray, setMeasurementsArray] = useState([]);

    useEffect(() => {
        for (let entry of props.journalData) {
          if (entry.journalEntry === props.selectedEntry) {
            setMeasurementsArray(entry.measurements);
            break;
          }
        }
    }, [props.selectedEntry]);


    console.log(props.journalData)
    console.log(props.selectedEntry)
    console.log(measurementsArray);

    return(
        <div className="view-measurements-component">
            {measurementsArray.map((measurement, index)=>{
                return(
                    <IndividualMeasurement
                        key={index}
                        type={measurement.type}
                        measurement={measurement.measurement}
                    />
                );
            })}
        </div>
    );
}

function IndividualMeasurement(props) {
    console.log(props.measurement)
    return(
        <div className="view-measurements-individual">
            <p>{props.type}: {props.measurement}</p>
        </div>
    );
}

export default ViewMeasurements;