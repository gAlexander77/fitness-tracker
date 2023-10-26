import React, { useState } from 'react';
import Nav from '../../components/Nav';
import '../../styles/pages/ProteinIntakeCalculator/ProteinIntakeCalculator.css';

import { heightToInches, calculateProteinIntake} from './utils';

// Todo: make results pop up on click

function ProteinIntakeCalculator() {
    const [showResults, setShowResults] = useState(false);
    const [input, setInput] = useState({
      weight: 0,
      gender: 'male',
      age: 0,
      feet: 0,
      inches: 0,
      activityLevel: 'sedentary',
    });
    const [results, setResults] = useState({
      proteinIntake: 0,
    });
  
    const activityLevels = ['sedentary', 'light', 'moderate', 'active', 'very active'];
  

  
  
    return (
      <div className="protein-intake-calculator-page">
        <Nav />
        <h1>Protein Intake Calculator</h1>
        <Calculator
          input={input}
          setInput={setInput}
          results={results}
          setResults={setResults}
          activityLevels={activityLevels}
          setShowResults={setShowResults}

        />
        <CalculatorResults
          trigger={showResults}
          setTiggers={setShowResults}
          proteinIntake={results.proteinIntake}
        />
      </div>
    );
  }

  function Calculator(props) {
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
          case "gender":
            props.setInput((prev) => ({ ...prev, gender: value }));
            break;
          case "age":
            props.setInput((prev) => ({ ...prev, age: value }));
            break;
          case "activityLevel":
            props.setInput((prev) => ({ ...prev, activityLevel: value }));
            break;
          default:
            break;
        }
      };

      const calculateHandler = () => {
        // let height = heightToInches(props.input.feet, props.input.inches);
        // console.log(height);
        let proteinIntake = 1;

        props.setResults({ proteinIntake: proteinIntake });
        props.setShowResults(true);
    }
      
    return (
        <div className="protein-intake-calculator-calculator-component">
          <div className="protein-intake-calculator-calculator-inner">
            <div className="protein-intake-calculator-calculator-left-container">
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
              <h1 id="title">Age</h1>
              <div id="input-container">
                <input
                  id="age"
                  type="number"
                  value={props.input.age}
                  onChange={setValueHandler}
                />
                <p id="tag">years</p>

              </div>
            </div>
            <div className="protein-intake-calculator-calculator-right-container">
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
              <div className="input-container">
                <h1 id="title">Gender</h1>
                <select
                  id="gender"
                  value={props.input.gender}
                  onChange={setValueHandler}
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="input-container">
                <h1 id="title">Activity Level</h1>
                <select
                  id="activityLevel"
                  value={props.input.activityLevel}
                  onChange={setValueHandler}
                >
                  {props.activityLevels.map((level) => (
                    <option key={level} value={level}>
                      {level}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <button className="protein-intake-calculator-calculator-calculate-btn" onClick={props.calculateHandler}>
            Calculate
          </button>
        </div>
      );
      
  }

function CalculatorResults(props) {
    
    return(props.trigger)?(
        <div className="protein-intake-calculator-calculator-results-component">
        <div id="inner">
            <div id="display-container">
            <h1>Protein Intake</h1>
            <h1>{props.proteinIntake} grams</h1>
            </div>
        </div>
        {true ? <button>Save results to Journal</button> : ""}
        </div>
    ):'';
}
  
  
  export default ProteinIntakeCalculator;
