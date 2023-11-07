import React, { useState } from 'react';
import Nav from '../../components/Nav';
import Background from '../../components/Background';
import Footer from '../../components/Footer';
import '../../styles/pages/BasalMetabolicRateCalculator/BasalMetabolicRateCalculator.css';
import { heightToCm, calculateBMR,  } from './utils';


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
        <>
            <Nav/>
            <div className='basal-metabolic-rate-calculator-page'>
                <div className='basal-metabolic-rate-calculator-content'>
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
                <Background/>
            </div>
            <Footer/>
        </>            
    );
}

function Calculator(props){
    const [currentGender, setCurrentGender] = useState(5);

    const handleGenderButtonClick = (genderModifier) => {
        setCurrentGender(genderModifier);
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

    const BMRCalculation = () => {
        let height = heightToCm(props.input.feet, props.input.inches);
        let MaleBMR = calculateBMR(height, props.input.weight, props.input.age, currentGender);
        props.setResults({bmr: MaleBMR});
        if(props.results.bmr > 0){
            props.setShowResults(true);
        } else{
            props.setShowResults(false);
        }
        console.log(MaleBMR);
    }



    // const BMRFemaleCalculation = () => {
    //     let height = heightToCm(props.input.feet, props.input.inches);
    //     console.log(height);
    //     let FemaleBMR = calculateFemaleBMR(height, props.input.weight, props.input.age);
    //     props.setResults({bmr: FemaleBMR});
    //     if(props.results.bmr > 0){
    //         props.setShowResults(true);
    //     } else{
    //         props.setShowResults(false);
    //     }
    //     console.log(FemaleBMR);
    // }


return(
    <div className="basal-metabolic-rate-calculator-calculator-component">
        <div className="basal-metabolic-rate-calculator-calculator-inner">
            <div className="basal-metabolic-rate-calculator-calculator-left-container">
                <h1 id="title">Height</h1>
                <div id="input-container">
                <input
                    id="feet"
                    type="number"
                    value={props.input.feet}
                    onChange={BMRValueSetting}
                />
                <p id="tag">Feet</p>
                </div>
                <div id="input-container">
                <input
                    id="inches"
                    type="number"
                    value={props.input.inches}
                    onChange={BMRValueSetting}
                />
                <p id="tag">Inches</p>
                </div>
            </div>
            <div className="basal-metabolic-rate-calculator-calculator-middle-container">
                <h1 id="title">Weight</h1>
                <div id="input-container">
                <input
                    id="weight"
                    type="number"
                    value={props.input.weight}
                    onChange={BMRValueSetting}
                />
                <p id="tag">lbs</p>
                </div>
            </div>
            <div className="basal-metabolic-rate-calculator-calculator-right-container">
                <h1 id="title">Age</h1>
                <div id="input-container">
                <input
                    id="age"
                    type="number"
                    value={props.input.age}
                    onChange={BMRValueSetting}
                />
                <p id="tag">years</p>
            </div>
        </div>
    </div>
    <div className='basal-metabolic-rate-calculator-gender-btns'>
            <button
                id='male'
                className={ `basal-metabolic-rate-calculator-gender-btn ${currentGender === 5 ? 'active' : ''}`}
                onClick={() => handleGenderButtonClick(5)}>
            M        
        </button>
            <button
                id='female'
                className={`basal-metabolic-rate-calculator-gender-btn ${currentGender === -161 ? 'active' : ''}`}
                onClick={() => handleGenderButtonClick(-161)}>
            F
        </button>
    </div>

    <button className="basal-metabolic-rate-calculator-calculator-calculate-btn" onClick={BMRCalculation}>
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
                    <h2>BMR:</h2>
                    <h2>{Math.floor(props.bmr)}</h2>
                    <h2> Calories</h2>
                </div>
                <div id='line'/>
                <div id="display-container">
                    <h1>{props.classification}</h1>
                </div>
            </div>
            {true ? <button class="saveButton">Save results to Journal</button> : ""}
        </div>
    ):'';
}


export default BasalMetabolicRateCalculator;