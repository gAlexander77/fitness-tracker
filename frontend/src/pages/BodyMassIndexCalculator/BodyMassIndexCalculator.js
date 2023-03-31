import React, { useState } from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/BodyMassIndexCalculator/BodyMassIndexCalculator.css';

import { heightToInches, calculateBMI, calculateClassification } from './utils';

function BodyMassIndexCalculator(){

    const [showResults, setShowResults] = useState(false);
    const [input, setInput] = useState({
        feet: 0,
        inches: 0,
        weight: 0
    });
    const [results, setResults] = useState({
        bmi: 0,
        classification: "",
    });
    
    return(
        <div className="body-mass-index-calculator-page">
            <Nav/>
            <h1>BMI Calculator</h1>
            <Calculator
                input={input}
                setInput={setInput} 
                setResults={setResults}
                results={results}
                setShowResults={setShowResults}
            />
            <CalculatorResults
                trigger={showResults}
                setTiggers={setShowResults}
                bmi={results.bmi}
                classification={results.classification}
            />
        </div>
    );
}

function Calculator(props){
    
    const setValueHandler = (event) => {
        const { id, value } = event.target;
        switch (id) {
          case "feet":
            props.setInput((prev) => ({ ...prev, feet: value }));
            break;
          case "inches":
            props.setInput((prev) => ({ ...prev, inches: value }));
            break;
          case "weight":
            props.setInput((prev) => ({ ...prev, weight: value }));
            break;
          default:
            break;
        }
    };


    const calculateHandler = () => {
        let height = heightToInches(props.input.feet, props.input.inches);
        console.log(height);
        let bmi = calculateBMI(height, props.input.weight);
        let classification = calculateClassification(bmi);
        props.setResults({ bmi: bmi, classification: classification });
        if(props.results.bmi > 0 && props.results.classification !== "") {
            props.setShowResults(true);
        }
        else {
            props.setShowResults(false);
        }            
        console.log(bmi);
    }

    return(
        <div>
            <div>
                <div>
                    <h1>Height</h1>
                    <div>
                        <input 
                            id="feet"
                            type="number"
                            value={props.input.feet}
                            onChange={setValueHandler}
                        />
                        <p>Feet</p>
                    </div>
                    <div>
                        <input
                            id="inches"
                            type="number"
                            value={props.input.inches}
                            onChange={setValueHandler}
                        />
                        <p>Inches</p>
                    </div>
                </div>
                <div>
                    <h1>Weight</h1>
                    <div>
                        <input
                            id="weight"
                            type="number"
                            value={props.input.weight}
                            onChange={setValueHandler}
                        />
                        <p>lbs</p>
                    </div>
                </div>
            </div>
            <button onClick={calculateHandler}>
                Calculate
            </button>
        </div>
    );
}

function CalculatorResults(props){
    return(
        <div>
            <div>
                <div>
                    <h1>BMI</h1>
                    <h1>{props.bmi}</h1>
                </div>
                <div></div>
                <div>
                    <h1>{props.classification}</h1>
                </div>
            </div>
            {props.hasAccount ? <button>Save results to Journal</button> : ""}
        </div>
    );
}

export default BodyMassIndexCalculator;