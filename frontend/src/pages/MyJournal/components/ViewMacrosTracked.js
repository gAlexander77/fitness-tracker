import React, { useState, useEffect } from 'react';
import '../../../styles/pages/MyJournal/components/ViewMacrosTracked.css';

function ViewMacrosTracked(props) {
    
    const [macrosArray, setMacrosArray] = useState([]);

    useEffect(() => {
        for (let entry of props.journalData) {
          if (entry.journalEntry === props.selectedEntry) {
            setMacrosArray(entry.macros);
            break;
          }
        }
    }, [props.selectedEntry]);


    console.log(props.journalData)
    console.log(props.selectedEntry)
    console.log(macrosArray);

    return(
        <div>
            {macrosArray.map((macro, index)=>{
                return(
                    <IndividualMacroTracked
                        key={index}
                        macro={macro}
                    />
                );
            })}
        </div>
    );
}

function IndividualMacroTracked(props) {
    return(
        <div>
            <h1>{props.macro.type} {props.macro.amount}</h1>
        </div>
    );
}

export default ViewMacrosTracked;