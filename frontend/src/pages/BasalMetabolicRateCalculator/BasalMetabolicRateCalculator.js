import React, { useState } from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/BasalMetabolicRateCalculator/BasalMetabolicRateCalculator.css';
import { Tabs, Tab, Typography, AppBar } from "@material-ui/core";
import 'react-tabs/style/react-tabs.css';

import { heightToInches, calculateMaleBMR, calculateFemaleBMR } from './utils';

function TabPanel(props) {
    const { children, value, index } = props;
  
    return (
      <div hidden={value !== index}>
        {value === index && <Typography>{children}</Typography>}
      </div>
    );
  }
  

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
        let FemaleBMR = calculateMaleBMR(height, props.input.weight, props.input.age);
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
                <div className='basal-metabolic-rate-calculator-calculator-menu'>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Male" />
                        <Tab label="female" />
                    </Tabs>
                </div>



                <div className="basal-metabolic-rate-calculator-calculator-inner">
                    <TabPanel value={value} index={0}>
                        <div className="basal-metabolic-rate-calculator-calculator-left-container">
                            <h1 id="title">Weight</h1>
                            <div id="input-container">
                                <input
                                    id="weight"
                                    type="number"
                                    value={props.input.weight}
                                    onChange={BMRValueSetting} />
                                <p id="tag">Lbs</p>
                            </div>
                        </div>
                        <div className="basal-metabolic-rate-calculator-calculator-middle-container">
                            <h1 id="title">Height</h1>
                            <div id="input-container">
                                <input
                                    id="feet"
                                    type="number"
                                    value={props.input.feet}
                                    onChange={BMRValueSetting} />
                                <p id="tag">Feet</p>
                            </div>
                            <div id="input-container">
                                <input
                                    id="inches"
                                    type="number"
                                    value={props.input.inches}
                                    onChange={BMRValueSetting} />
                                <p id="tag">Inches</p>
                            </div>
                        </div>
                        <div className="basal-metabolic-rate-calculator-calculator-right-container">
                            <h1 id="title">Age</h1>
                            <div id="input-container">
                                <input
                                    id="age"
                                    type="number"
                                    value={props.input.age}
                                    onChange={BMRValueSetting} />
                                <p id="tag">Years</p>
                            </div>
                        </div>
                    </TabPanel>
                </div>

                <button className="basal-metabolic-rate-calculator-calculator-calculate-btn" onClick={BMRMaleCalculation}>
                    Calculate
                </button>
            </div>
    );
}
function CalculatorResults(props){
    return(props.trigger)?(
        <div className="basal-metabolic-rate-calculator-calculator-results-component">
            <div id="inner">
                <div id="display-container">
                    <h2>BMR</h2>
                    <h2>{props.bmr}</h2>
                </div>
            </div>
            {true ? <button>Save results to Journal</button> : ""}
        </div>
    ):'';
}


export default BasalMetabolicRateCalculator;