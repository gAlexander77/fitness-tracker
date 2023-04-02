import React, { useState, useEffect } from 'react';
import '../../../styles/pages/MyJournal/components/ViewCalculatorResults.css';

function ViewCalculatorResults(props) {
    
    const [calculatorsArray, setCalculatorsArray] = useState([]);

    useEffect(() => {
        for (let entry of props.journalData) {
          if (entry.journalEntry === props.selectedEntry) {
            setCalculatorsArray(entry.calculatorResults);
            break;
          }
        }
    }, [props.selectedEntry]);


    console.log(props.journalData)
    console.log(props.selectedEntry)
    console.log(calculatorsArray);

    return(
        <div>
            {calculatorsArray.map((calculator, index)=>{
                return(
                    <IndividualCalculatorResult
                        key={index}
                        calculator={calculator}
                        calculatorTitle={calculator.calculator}
                        calculatorResult={calculator.result}
                    />
                );
            })}
        </div>
    );
}

function IndividualCalculatorResult(props) {
    return(
        <div>
            <h1>{props.calculatorTitle}</h1>
            <p>{props.calculatorResult}</p>
        </div>
    );
}

export default ViewCalculatorResults;