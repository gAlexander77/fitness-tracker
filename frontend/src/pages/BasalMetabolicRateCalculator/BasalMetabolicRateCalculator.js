import React, { useState } from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/BasalMetabolicRateCalculator/BasalMetabolicRateCalculator.css';
import { heightToInches, calculateMaleBMR, calculateFemaleBMR } from './utils';

// Removed MaterialUI styling so new styling is needed 

function BasalMetabolicRateCalculator(){

    const [showResults, setShowResults] = useState(false);

    const [input, setInput] = useState({
        weight: 0,
        feet: 0,
        inches: 0,
        age: 0
    });

    const [results, setResults] = useState({
        bmr:0
    });

    return(
        <div className="basal-metabolic-rate-calculator-page">
            <Nav/>
            <h1>BMR Calculator</h1>
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
                bmr={results.bmr}
            />
        </div>
    );
}

function Calculator(props){

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
      };

    const BMRValueSetting = (event) => {
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
            case "age":
                props.setInput((prev) => ({ ...prev, age: value }));
                break;
            default:
              break;
          }
    }

    const BMRMaleCalculation = () => {
        let height = heightToInches(props.input.feet, props.input.inches);
        console.log(height);
        let MaleBMR = calculateMaleBMR(height, props.input.weight, props.input.age);
        props.setResults({bmr: MaleBMR});
        if(props.results.bmr > 0){
            props.setShowResults(true);
        } else{
            props.setShowResults(false);
        }
        console.log(MaleBMR);
    }

    const BMRFemaleCalculation = () => {
        let height = heightToInches(props.input.feet, props.input.inches);
        console.log(height);
        let FemaleBMR = calculateFemaleBMR(height, props.input.weight, props.input.age);
        props.setResults({bmr: FemaleBMR});
        if(props.results.bmr > 0){
            props.setShowResults(true);
        } else{
            props.setShowResults(false);
        }
        console.log(FemaleBMR);
    }


    // might need one for males and another for females ^ 

    return(
        <div className="basal-metabolic-rate-calculator-calculator-component">
        </div>
    );
}
function CalculatorResults(props){
    return(props.trigger)?(
        <div className="basal-metabolic-rate-calculator-calculator-results-component">
            <div id="inner">
                <div id="display-container">
                    <h2>BMR:</h2>
                    <h2>{props.bmr}</h2>
                    <h2> Calories</h2>
                </div>
            </div>
        </div>
    ):'';
}


export default BasalMetabolicRateCalculator;