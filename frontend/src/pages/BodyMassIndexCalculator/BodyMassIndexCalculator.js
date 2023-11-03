import React, { useState } from 'react';
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
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
        <>
        <Nav/>
        <div className="body-mass-index-calculator-page">
            <div className="body-mass-index-calculator-content">
                <h1 id="title">BMI CALCULATOR</h1>
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
            <Background/>
        </div>
        <Footer/>
        </>
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
            // Set 
            // The
            // POST
            // Request
            // Here
        }
        else {
            props.setShowResults(false);
        }            
        console.log(bmi);
    }

    return(
        <div className="body-mass-index-calculator-calculator-component">
            <div className="body-mass-index-calculator-calculator-inner">
                <div className="body-mass-index-calculator-calculator-left-container">
                    <h1 id="title">Height</h1>
                    <div id="input-container">
                        <input 
                            id="feet"
                            type="number"
                            value={props.input.feet}
                            onChange={setValueHandler}
                        />
                        <p id="tag">Feet</p>
                    </div>
                    <div id="input-container">
                        <input
                            id="inches"
                            type="number"
                            value={props.input.inches}
                            onChange={setValueHandler}
                        />
                        <p id="tag">Inches</p>
                    </div>
                </div>
                <div className="body-mass-index-calculator-calculator-right-container">
                    <h1 id="title">Weight</h1>
                    <div id="input-container">
                        <input
                            id="weight"
                            type="number"
                            value={props.input.weight}
                            onChange={setValueHandler}
                        />
                        <p id="tag">lbs</p>
                    </div>
                </div>
            </div>
            <button className="body-mass-index-calculator-calculator-calculate-btn" onClick={calculateHandler}>
                Calculate
            </button>
        </div>
    );
}

function CalculatorResults(props){
    return(props.trigger)?(
        <div className="body-mass-index-calculator-calculator-results-component">
            <div id="inner">
                <div id="display-container">
                    <h1>BMI</h1>
                    <h1>{props.bmi}</h1>
                </div>
                <div id='line'/>
                <div id="display-container">
                    <h1>{props.classification}</h1>
                </div>
            </div>
            {true ? <button>Save results to Journal</button> : ""}
        </div>
    ):'';
}

export default BodyMassIndexCalculator;